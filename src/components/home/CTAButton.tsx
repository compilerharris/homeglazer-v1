
import React from 'react';
import Link from 'next/link';

interface CTAButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  isHeroButton?: boolean;
  externalLink?: string;
  style?: React.CSSProperties;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  children, 
  to, 
  onClick, 
  className = '',
  isHeroButton = false,
  externalLink,
  style
}) => {
  // Use the user-specified color scheme if it's the hero button
  // Otherwise use the default pink to blue hover scheme
  const baseClasses = isHeroButton 
    ? "bg-[rgba(219,231,236,1)] text-black hover:bg-[rgba(219,231,236,0.8)]" 
    : "bg-[rgba(237,39,110,1)] text-white hover:bg-[rgba(59,130,246,1)]";

  const classes = `${baseClasses} inline-flex items-center justify-center px-6 py-3 rounded-[39px] font-medium transition-all duration-300 ${className}`;
  
  // Handle external links
  if (externalLink) {
    return (
      <a href={externalLink} target="_blank" rel="noopener noreferrer" className={classes} style={style}>
        {children}
      </a>
    );
  }
  
  // Handle internal routing
  if (to) {
    return (
      <Link href={to} className={classes} style={style}>
        {children}
      </Link>
    );
  }
  
  // Default button
  return (
    <button 
      type="button" 
      className={classes}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default CTAButton;
