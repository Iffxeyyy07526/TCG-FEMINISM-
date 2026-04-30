import React from 'react';

export function Marquee({ text }: { text: string }) {
  return (
    <div className="h-12 border-t border-white/10 bg-[#0F0F0F] flex items-center overflow-hidden relative z-20">
      {/* Gradient edges for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] items-center">
        <span className="text-[11px] font-bold tracking-widest text-[#39FF14] flex items-center px-8 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] mr-2"></span>
          78% WIN RATE
        </span>
        <span className="text-[11px] font-bold tracking-widest text-white/30 flex items-center px-8 uppercase">
          INSTITUTIONAL GRADE SIGNALS
        </span>
        <span className="text-[11px] font-bold tracking-widest text-[#39FF14] flex items-center px-8 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] mr-2"></span>
          150+ ACTIVE MEMBERS
        </span>
        <span className="text-[11px] font-bold tracking-widest text-white/30 flex items-center px-8 uppercase">
          350+ SIGNALS YTD
        </span>
        <span className="text-[11px] font-bold tracking-widest text-[#39FF14] flex items-center px-8 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] mr-2"></span>
          DATA-DRIVEN INSIGHTS
        </span>
      </div>
    </div>
  );
}
