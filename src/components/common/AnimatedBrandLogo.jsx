import React from 'react';
import BrandLogo from './BrandLogo';

export default function AnimatedBrandLogo({ 
  size = 'md', 
  className = '', 
  variant = 'light'
}) {
  return (
    <BrandLogo size={size} className={className} variant={variant} />
  );
}
