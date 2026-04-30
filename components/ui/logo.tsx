import React from 'react';

export function Logo({ className = "text-tcg-green drop-shadow-[0_0_8px_#39FF14]" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* C */}
      <path 
        d="M 42 46 H 30 A 24 24 0 0 0 30 94 H 42" 
        stroke="currentColor" 
        strokeWidth="11" 
        strokeLinecap="square" 
        fill="none" 
      />
      
      {/* G (with the crossbar) */}
      <path 
        d="M 58 46 H 70 A 24 24 0 0 1 70 94 H 58 V 74 H 75" 
        stroke="currentColor" 
        strokeWidth="11" 
        strokeLinecap="square" 
        strokeLinejoin="miter" 
        fill="none" 
      />
      
      {/* The Central Cross '+' */}
      <rect x="42" y="66" width="16" height="8" fill="currentColor" />
      <rect x="46" y="62" width="8" height="16" fill="currentColor" />
      
      {/* Downward shaft extension */}
      <rect x="46" y="82" width="8" height="16" fill="currentColor" />
      
      {/* Upward shaft */}
      <rect x="46" y="32" width="8" height="26" fill="currentColor" />
      
      {/* Arrowhead */}
      <polygon points="50,10 32,32 68,32" fill="currentColor" />
      
      {/* Candlesticks on the Left (over the C) */}
      {/* Stick 1 (Leftmost) */}
      <rect x="18" y="38" width="6" height="12" fill="currentColor" />
      <rect x="20" y="33" width="2" height="22" fill="currentColor" />
      {/* Stick 2 (Middle Left) */}
      <rect x="30" y="30" width="6" height="16" fill="currentColor" />
      <rect x="32" y="24" width="2" height="28" fill="currentColor" />
      
      {/* Candlesticks on the Right (over the G) */}
      {/* Stick 3 (Middle Right) */}
      <rect x="64" y="38" width="6" height="10" fill="currentColor" />
      <rect x="66" y="34" width="2" height="18" fill="currentColor" />
      {/* Stick 4 (Rightmost) */}
      <rect x="76" y="26" width="6" height="20" fill="currentColor" />
      <rect x="78" y="20" width="2" height="32" fill="currentColor" />
    </svg>
  );
}
