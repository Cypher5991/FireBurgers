import React from 'react';

export default function BrandLogo({ 
  variant = 'light', // 'light' (green text on crème) | 'dark' (crème text on green/dark) | 'auto'
  size = 'md',        // 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  className = '',
  showSubtitle = true,
}) {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#F5EFE3' : '#1B4D3E';
  const subColor = isDark ? '#B89A4F' : '#9A7B2D';

  const sizeClasses = {
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-10 sm:h-12 w-auto',
    lg: 'h-14 sm:h-16 w-auto',
    xl: 'h-18 sm:h-20 w-auto',
    icon: 'h-9 w-9',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 360 150" 
        role="img" 
        aria-label="UMAMI — Japanese Fire-Grilled Burgers"
        className={`${selectedSize} transition-transform duration-300 hover:scale-105`}
      >
        {/* Flame Orange Squiggle (Signature Motif) */}
        <path 
          d="M120 44 C133 24, 154 24, 167 44 S201 64, 214 44 S248 24, 261 44" 
          transform="translate(-30,0)" 
          stroke="#E25822" 
          strokeWidth="7.5" 
          strokeLinecap="round" 
          fill="none"
        />
        {/* Wordmark */}
        <text 
          x="180" 
          y="104" 
          fontFamily="'Georgia', 'Spectral', 'Times New Roman', serif" 
          fontSize="74" 
          fontWeight="700" 
          letterSpacing="-2" 
          fill={textColor} 
          textAnchor="middle"
        >
          umami
        </text>
        {/* Subtitle */}
        {showSubtitle && (
          <text 
            x="180" 
            y="134" 
            fontFamily="'Montserrat', 'Helvetica', 'Arial', sans-serif" 
            fontSize="14" 
            fontWeight="700"
            letterSpacing="5" 
            fill={subColor} 
            textAnchor="middle"
          >
            THE FIRE PATISSERIE
          </text>
        )}
      </svg>
    </div>
  );
}
