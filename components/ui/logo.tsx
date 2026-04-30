'use client';

import React from 'react';

import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'green' | 'white';
  mode?: 'icon' | 'full';
  src?: string;
}

export function Logo({ className = "w-10 h-10", variant = 'green', mode = 'icon', src }: LogoProps) {
  const isGreen = variant === 'green';
  const color = isGreen ? '#39FF14' : '#FFFFFF';
  
  // If src is provided, render an image
  if (src) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Image 
          src={src} 
          alt="The Capital Guru" 
          width={mode === 'full' ? 200 : 40} 
          height={40} 
          className="object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Adjusted aspect ratio for full logo vs icon
  const boxWidth = mode === 'full' ? 300 : 32;
  const boxHeight = 32;

  return (
    <div className={`relative flex items-center justify-center ${className} ${mode === 'full' ? 'w-auto' : ''}`}>
      <svg 
        viewBox={`0 0 ${boxWidth} ${boxHeight}`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
      >
        {/* Icon Part */}
        <g className="logo-icon">
          {/* Chart Bars (Candlesticks) */}
          <rect x="2" y="14" width="2" height="6" fill={color} opacity="0.8" />
          <rect x="6" y="10" width="2" height="12" fill={color} opacity="0.9" />
          <rect x="24" y="11" width="2" height="10" fill={color} opacity="0.9" />
          <rect x="28" y="7" width="2" height="15" fill={color} opacity="0.8" />
          
          {/* The Styled C */}
          <path d="M12 16H8V26H14V22H12" stroke={color} strokeWidth="2.5" strokeLinejoin="miter" />
          
          {/* The Styled G */}
          <path d="M20 16H24V26H18V16H20M24 21H21" stroke={color} strokeWidth="2.5" strokeLinejoin="miter" />
          
          {/* Center Vertical Bar & Plus */}
          <rect x="15" y="4" width="2" height="26" fill={color} />
          <rect x="13" y="18" width="6" height="2" fill={color} />
          
          {/* Upward Arrow */}
          <path d="M16 0L22 8H10L16 0Z" fill={color} />
        </g>

        {/* Text Part for Full Mode */}
        {mode === 'full' && (
          <text 
            x="45" 
            y="23" 
            fill={color} 
            fontFamily="Inter, system-ui, sans-serif" 
            fontWeight="700" 
            fontSize="18" 
            letterSpacing="0.05em"
            className="font-display font-bold uppercase"
          >
            THE CAPITAL GURU
          </text>
        )}
      </svg>
    </div>
  );
}
