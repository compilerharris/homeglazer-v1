import React from 'react';
import Link from 'next/link';

/** Shared CTA style matching FAQ section - pink bg, white text, shadow, pill shape */
export const SECTION_CTA_CLASSES =
  'inline-flex items-center justify-center rounded-lg bg-[#ED276E] px-6 py-3 text-white font-semibold shadow-md hover:bg-[#b81d5a] transition';

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
  // Default styling for most buttons
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-[39px] font-medium transition-all duration-300";
  
  // Only apply pink-to-blue styling if explicitly requested through className
  const classes = className.includes('bg-[#ED276E]') 
    ? `${baseClasses} ${className}`
    : `${baseClasses} bg-[rgba(219,231,236,1)] text-black hover:bg-[rgba(219,231,236,0.8)] ${className}`;
  
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
