import React from 'react';
import { ArrowUpRight, ArrowDownRight, Target, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as motion from 'motion/react-client';

export interface SignalData {
  type: 'BUY' | 'SELL';
  ticker: string;
  price: string;
  target: string;
  sl: string;
  gain?: string;
  rrRatio?: string;
  timestamp?: string;
  status?: 'ACTIVE' | 'HIT' | 'SL';
}

export function SignalCard({ data, className = "" }: { data: SignalData, className?: string }) {
  const isBuy = data.type === 'BUY';
  const isHit = data.status === 'HIT';
  
  return (
    <div className={cn(
      "group relative glass rounded-[2rem] p-8 transition-all duration-700 hover:scale-[1.02] overflow-hidden",
      isBuy ? "hover:border-tcg-green/30 shadow-2xl shadow-tcg-green/5" : "hover:border-red-500/30 shadow-2xl shadow-red-500/5",
      className
    )}>
      {/* Decorative inner glow */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(57,255,20,0.08),transparent_60%)]",
        !isBuy && "bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.08),transparent_60%)]"
      )} />

      {/* Header Info */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "text-[9px] font-black uppercase tracking-[0.25em] px-2 py-0.5 rounded-sm",
              isBuy ? "bg-tcg-green text-black" : "bg-red-500 text-white"
            )}>
              {data.type}
            </span>
            {data.rrRatio && (
              <span className="text-[10px] text-white/30 uppercase tracking-[0.1em] font-black border border-white/5 px-2 py-0.5 rounded-sm">
                RR {data.rrRatio}
              </span>
            )}
          </div>
          <h3 className="text-3xl font-display font-black text-white group-hover:text-tcg-green transition-colors tracking-tight">
            {data.ticker}
          </h3>
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500",
          isBuy ? "bg-tcg-green/5 border-tcg-green/20 text-tcg-green group-hover:bg-tcg-green group-hover:text-black" : "bg-red-500/5 border-red-500/20 text-red-500 group-hover:bg-red-500 group-hover:text-white"
        )}>
          {isBuy ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8 relative z-10">
        <div className="space-y-1">
          <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-black">Entry Zone</p>
          <p className="text-lg font-mono font-black text-white">₹{data.price}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-black flex items-center gap-1">
            <Target size={12} className="text-tcg-green" /> Target
          </p>
          <p className="text-lg font-mono font-black text-tcg-green">₹{data.target}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-black flex items-center gap-1">
            <Shield size={12} className="text-red-500" /> Hard SL
          </p>
          <p className="text-lg font-mono font-black text-red-500">₹{data.sl}</p>
        </div>
      </div>

      {/* Footer Analysis */}
      <div className="flex items-center justify-between pt-5 border-t border-white/10 relative z-10">
        <div className="flex items-center gap-2">
          <Zap size={14} className="animate-pulse text-tcg-green" />
          <span className="text-[10px] text-white/50 font-black uppercase tracking-widest">Institutional Alpha Flow</span>
        </div>
        {data.gain && (
          <motion.div 
            animate={isHit ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className={cn(
              "text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest shadow-lg",
              isHit ? "bg-tcg-green text-black shadow-tcg-green/20" : "text-tcg-green bg-tcg-green/10"
            )}
          >
            {data.gain}
          </motion.div>
        )}
      </div>
    </div>
  );
}
