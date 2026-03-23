import Link from 'next/link';

interface TagProps {
  children: string;
  href?: string;
  variant?: 'default' | 'accent' | 'outline';
  className?: string;
}

export function Tag({ children, href, variant = 'default', className = '' }: TagProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200';
  
  const variants = {
    default: 'bg-[#F0EEEB] text-[#5C5852] hover:bg-[#E5E2DE]',
    accent: 'bg-[#E8DED4] text-[#4A4A4A] hover:bg-[#D4C5B9]',
    outline: 'border border-[#D4D0CA] text-[#7A7670] hover:border-[#C9A89A] hover:text-[#C9A89A]',
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return <span className={classes}>{children}</span>;
}
