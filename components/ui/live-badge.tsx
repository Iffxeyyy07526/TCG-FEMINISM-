import React from 'react';
import Link from 'next/link';

export function LiveBadge({ text = "LIVE", className = "" }: { text?: string, className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 bg-tcg-green/10 border border-tcg-green/40 text-tcg-green text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full w-fit ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tcg-green opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-tcg-green shadow-[0_0_8px_#39FF14]"></span>
      </span>
      {text}
    </div>
  );
}
