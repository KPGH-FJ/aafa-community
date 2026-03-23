import { ReactNode } from 'react';
import Link from 'next/link';

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  hover?: boolean;
}

export function Card({ children, href, className = '', hover = true }: CardProps) {
  const baseStyles = 'bg-white rounded-2xl overflow-hidden';
  const hoverStyles = hover ? 'card-hover cursor-pointer' : '';
  const classes = `${baseStyles} ${hoverStyles} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return <div className={classes}>{children}</div>;
}

export function CardImage({ 
  src, 
  alt,
  aspectRatio = 'video',
  className = '',
}: { 
  src: string; 
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
  className?: string;
}) {
  const aspectStyles = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
  };
  
  return (
    <div className={`relative ${aspectStyles[aspectRatio]} overflow-hidden bg-[#F0EEEB] ${className}`}>
      {/* 占位图，实际项目中替换为Next.js Image组件 */}
      <div className="absolute inset-0 flex items-center justify-center text-[#A8A49D]">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold text-[#2C2C2C] leading-snug mb-2 ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm text-[#7A7670] line-clamp-2 ${className}`}>{children}</p>;
}

export function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-5 pb-5 pt-0 flex items-center justify-between ${className}`}>{children}</div>;
}
