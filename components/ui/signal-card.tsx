import React from 'react';

export interface SignalData {
  type: 'BUY' | 'SELL';
  ticker: string;
  price: string;
  target: string;
  sl: string;
  gain?: string;
  timestamp?: string;
}

export function SignalCard({ data, className = "" }: { data: SignalData, className?: string }) {
  const isBuy = data.type === 'BUY';
  return (
    <div className={`bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 shadow-2xl font-mono relative overflow-hidden backdrop-blur-xl ${className}`}>
      {/* Subtle shimmer effect setup using CSS or framer motion, but keeping it simple CSS here */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-1 ${isBuy ? 'text-tcg-green' : 'text-red-500'}`}>
            Active Signal
          </span>
          <span className="text-white text-2xl font-bold">{data.ticker}</span>
        </div>
        <div className={`text-black text-[10px] font-black px-2 py-1 rounded ${isBuy ? 'bg-tcg-green' : 'bg-red-500'}`}>
          {data.type}
        </div>
      </div>
      
      <div className="space-y-4 font-mono mb-6">
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-white/40 text-xs">ENTRY PRICE</span>
          <span className="text-white text-sm">₹{data.price}</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-white/40 text-xs">TARGET HIT</span>
          <span className="text-tcg-green text-sm font-bold">₹{data.target}</span>
        </div>
        <div className="flex justify-between pb-2">
          <span className="text-white/40 text-xs">STOP LOSS</span>
          <span className="text-red-500 text-sm">₹{data.sl}</span>
        </div>
      </div>

      {data.gain && (
        <div className="bg-tcg-green/5 rounded-xl p-4 border border-tcg-green/20 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Potential P&L</span>
            <span className="text-lg font-black text-tcg-green">{data.gain}</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-tcg-green flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-tcg-green/20 flex items-center justify-center text-tcg-green text-xs font-bold">✓</div>
          </div>
        </div>
      )}
    </div>
  );
}
