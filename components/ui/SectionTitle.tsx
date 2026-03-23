interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitle({ title, subtitle, align = 'left', className = '' }: SectionTitleProps) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
  };
  
  return (
    <div className={`mb-12 ${alignStyles[align]} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2C2C] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#7A7670] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
