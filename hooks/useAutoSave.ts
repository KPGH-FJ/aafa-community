'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface AutoSaveOptions {
  key: string;
  interval?: number; // 自动保存间隔，默认 30000ms (30秒)
}

export function useAutoSave<T>(
  currentData: T,
  options: AutoSaveOptions
) {
  const { key, interval = 30000 } = options;
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 从 localStorage 恢复草稿
  const restoreDraft = useCallback((): T | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data && parsed.timestamp) {
          const savedTime = new Date(parsed.timestamp);
          const now = new Date();
          const hoursDiff = (now.getTime() - savedTime.getTime()) / (1000 * 60 * 60);
          
          // 只恢复 24 小时内的草稿
          if (hoursDiff < 24) {
            setLastSaved(savedTime);
            setHasRestoredDraft(true);
            return parsed.data as T;
          }
        }
      }
    } catch (error) {
      console.error('恢复草稿失败:', error);
    }
    return null;
  }, [key]);

  // 保存到 localStorage
  const saveDraft = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const dataToSave = {
        data: currentData,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(key, JSON.stringify(dataToSave));
      setLastSaved(new Date());
      setIsDirty(false);
    } catch (error) {
      console.error('保存草稿失败:', error);
    }
  }, [currentData, key]);

  // 清除草稿
  const clearDraft = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(key);
      setLastSaved(null);
      setIsDirty(false);
    } catch (error) {
      console.error('清除草稿失败:', error);
    }
  }, [key]);

  // 手动保存（Ctrl+S）
  const handleManualSave = useCallback(() => {
    saveDraft();
  }, [saveDraft]);

  // 监听数据变化，标记为脏数据
  useEffect(() => {
    setIsDirty(true);
  }, [currentData]);

  // 自动保存定时器
  useEffect(() => {
    // 清除之前的定时器
    if (saveTimerRef.current) {
      clearInterval(saveTimerRef.current);
    }

    // 设置新的定时器
    saveTimerRef.current = setInterval(() => {
      if (isDirty) {
        saveDraft();
      }
    }, interval);

    return () => {
      if (saveTimerRef.current) {
        clearInterval(saveTimerRef.current);
      }
    };
  }, [isDirty, interval, saveDraft]);

  // 监听 Ctrl+S 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleManualSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleManualSave]);

  // 页面卸载前保存
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isDirty) {
        saveDraft();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, saveDraft]);

  return {
    lastSaved,
    isDirty,
    hasRestoredDraft,
    restoreDraft,
    saveDraft,
    clearDraft,
    handleManualSave,
    setHasRestoredDraft,
  };
}
