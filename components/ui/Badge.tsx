interface BadgeProps {
  children: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full';
  
  const variants = {
    default: 'bg-[#F0EEEB] text-[#5C5852]',
    success: 'bg-[#B8C4A3] text-[#2C2C2C]',
    warning: 'bg-[#E8DED4] text-[#4A4A4A]',
    info: 'bg-[#9BA4AD] text-white',
  };
  
  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
