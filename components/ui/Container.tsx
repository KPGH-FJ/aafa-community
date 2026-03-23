import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'small' | 'large';
}

export function Container({ children, className = '', size = 'default' }: ContainerProps) {
  const sizes = {
    small: 'max-w-3xl',
    default: 'max-w-6xl',
    large: 'max-w-7xl',
  };
  
  return (
    <div className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
