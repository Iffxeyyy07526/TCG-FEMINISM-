import React from 'react';
import Link from 'next/link';

export function LiveBadge({ text = "LIVE", className = "" }: { text?: string, className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 bg-tcg-green/5 border border-tcg-green/20 text-tcg-green text-[10px] font-black tracking-[0.25em] uppercase px-4 py-2 rounded-full w-fit shadow-[0_0_20px_rgba(57,255,20,0.05)] transition-all hover:bg-tcg-green/10 hover:border-tcg-green/40 cursor-default ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tcg-green opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tcg-green shadow-[0_0_12px_#39FF14]"></span>
      </span>
      {text}
    </div>
  );
}
