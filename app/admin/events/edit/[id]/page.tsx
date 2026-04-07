'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: number | null;
  price: number;
  tags: string[];
  status: string;
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Event | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchEvent(token);
  }, [eventId, router]);

  const fetchEvent = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        const event = data.data;
        // 格式化日期为 YYYY-MM-DD
        const date = new Date(event.date);
        const formattedDate = date.toISOString().split('T')[0];
        
        setFormData({
          ...event,
          date: formattedDate,
        });
      } else {
        setError('获取活动信息失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  // 预览功能
  const handlePreview = () => {
    if (!formData) return;
    // 保存到 localStorage
    localStorage.setItem(`event-draft-${eventId}`, JSON.stringify(formData));
    // 打开预览页面
    window.open(`/admin/preview?type=event&id=${eventId}&draft=true`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    setSaving(true);
    setError('');

    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/events/${eventId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          maxAttendees: formData.maxAttendees || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('活动保存成功');
        router.push('/admin/events');
      } else {
        setError(data.error || '更新失败');
        toast.error('保存失败: ' + (data.error || '未知错误'));
      }
    } catch (err) {
      setError('网络错误，请重试');
      toast.error('保存失败: 网络错误');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-[#7A7670]">加载中...</div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-[#7A7670]">活动不存在</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <header className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/events" className="text-[#2C2C2C] hover:text-[#C9A89A]">
                ← 返回
              </Link>
              <h1 className="text-xl font-serif font-bold text-[#2C2C2C]">
                编辑活动
              </h1>
            </div>
            {/* 预览按钮 */}
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePreview}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              预览
            </Button>
          </div>
        </Container>
      </header>

      <Container className="py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#E5E2DE] p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#5C5852] mb-2">
              活动名称 *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-[#E5E2DE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A89A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5C5852] mb-2">
              活动描述 *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-[#E5E2DE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A89A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5C5852] mb-2">
                日期 *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-[#E5E2DE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A89A]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C5852] mb-2">
                时间 *
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border border-[#E5E2DE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A89A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5C5852] mb-2">
              地点 *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-[#E5E2DE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A89A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5C5852] mb-2">
                人数上限
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxAttendees || ''}
                onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full px-4 py-2 border border-[#E5E2DE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A89A]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C5852] mb-2">
                价格 (¥) *
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-[#E5E2DE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A89A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5C5852] mb-2">
              状态
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-[#E5E2DE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A89A]"
            >
              <option value="UPCOMING">即将开始</option>
              <option value="ONGOING">进行中</option>
              <option value="PAST">已结束</option>
              <option value="CANCELLED">已取消</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? '保存中...' : '保存修改'}
            </Button>
            <Button type="button" variant="outline" onClick={handlePreview}>
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              预览
            </Button>
            <Link href="/admin/events">
              <Button variant="outline" type="button">
                取消
              </Button>
            </Link>
          </div>
        </form>
      </Container>
    </div>
  );
}
