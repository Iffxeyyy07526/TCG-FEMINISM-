import React from 'react';

export function Marquee({ text }: { text?: string }) {
  return (
    <div className="h-14 border-y border-white/5 bg-[#050505] flex items-center overflow-hidden relative z-20">
      {/* Gradient edges for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] items-center">
        {[1, 2, 3].map((set) => (
          <React.Fragment key={set}>
            <span className="text-[11px] font-black tracking-[0.2em] text-tcg-green flex items-center px-10 uppercase">
              <span className="w-2 h-2 rounded-full bg-tcg-green mr-3 shadow-[0_0_10px_#39FF14]"></span>
              87% ACCURACY
            </span>
            <span className="text-[11px] font-black tracking-[0.2em] text-white/20 flex items-center px-10 uppercase">
              INSTITUTIONAL FLOOR SIGNALS
            </span>
            <span className="text-[11px] font-black tracking-[0.2em] text-tcg-green flex items-center px-10 uppercase">
              <span className="w-2 h-2 rounded-full bg-tcg-green mr-3 shadow-[0_0_10px_#39FF14]"></span>
              +2,400 ELITE TRADERS
            </span>
            <span className="text-[11px] font-black tracking-[0.2em] text-white/20 flex items-center px-10 uppercase whitespace-nowrap">
              REAL-TIME TELEGRAM EDGE
            </span>
            <span className="text-[11px] font-black tracking-[0.2em] text-tcg-green flex items-center px-10 uppercase">
              <span className="w-2 h-2 rounded-full bg-tcg-green mr-3 shadow-[0_0_10px_#39FF14]"></span>
              1:3.4 AVG REWARD
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
