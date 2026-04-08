'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

/**
 * 基础骨架屏
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 rounded',
        className
      )}
    />
  );
}

/**
 * 文章卡片骨架屏
 */
export function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#E5E2DE] overflow-hidden">
      {/* 封面图占位 */}
      <Skeleton className="aspect-[16/9] w-full rounded-none" />
      
      {/* 内容区域 */}
      <div className="p-6 space-y-4">
        {/* 分类标签 */}
        <Skeleton className="h-5 w-20" />
        
        {/* 标题 */}
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        
        {/* 摘要 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* 作者信息 */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2DE]">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 文章卡片骨架屏列表
 */
export function ArticleCardSkeletonList({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * 活动卡片骨架屏
 */
export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#E5E2DE] overflow-hidden">
      {/* 封面图 */}
      <Skeleton className="aspect-[16/9] w-full rounded-none" />
      
      {/* 内容 */}
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        
        {/* 时间地点 */}
        <div className="space-y-2 pt-4 border-t border-[#E5E2DE]">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        
        {/* 按钮 */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

/**
 * 活动卡片骨架屏列表
 */
export function EventCardSkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * 文章详情页骨架屏
 */
export function ArticleDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* 标题 */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-3/4" />
      </div>
      
      {/* 作者信息 */}
      <div className="flex items-center gap-4 py-6 border-y border-[#E5E2DE]">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      
      {/* 封面图 */}
      <Skeleton className="aspect-[16/9] w-full rounded-xl" />
      
      {/* 内容 */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

/**
 * 表格骨架屏
 */
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E2DE] overflow-hidden">
      {/* 表头 */}
      <div className="bg-[#F0EEEB] grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-12 m-2" />
        ))}
      </div>
      
      {/* 行 */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="border-t border-[#E5E2DE] grid"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-10 m-2" />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * 统计卡片骨架屏
 */
export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#E5E2DE] p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
}

/**
 * 文本骨架屏
 */
export function TextSkeleton({ 
  lines = 3,
  className 
}: { 
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
