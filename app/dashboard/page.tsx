import { SignalCard } from '@/components/ui/signal-card';
import { AnimatedCounter } from '@/components/ui/animated-counter';

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Header / Market Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-wide">Welcome, Rahul</h1>
          <p className="font-body text-sm text-white/50">Your active signals and performance overview.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3 backdrop-blur-xl">
            <div className="w-2 h-2 rounded-full bg-tcg-green animate-ping shadow-[0_0_8px_#39FF14]"></div>
            <div>
              <div className="font-body text-[10px] uppercase tracking-widest text-white/50">Market Status</div>
              <div className="font-body text-xs font-bold text-tcg-green">MARKET OPEN</div>
            </div>
          </div>
          <button className="bg-[#2AABEE] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#229ED9] transition-colors flex items-center gap-2 uppercase tracking-widest hover:shadow-[0_0_15px_rgba(42,171,238,0.4)]">
            <span>📱</span> Open Telegram
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* P&L Summary */}
        <div className="md:col-span-2 bg-[#0F0F0F] rounded-2xl border border-white/5 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tcg-green/5 blur-[50px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="font-body text-xs uppercase tracking-widest text-white/50 mb-2">Points Captured (YTD)</div>
          <div className="font-display text-5xl text-tcg-green mb-4">
            <AnimatedCounter to={3240} duration={2} format="plus" />
          </div>
          <p className="font-body text-sm text-white/70">
            Total index & equity points captured across all live signals.
          </p>
        </div>

        {/* Win Rate Tracker */}
        <div className="bg-[#0F0F0F] rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center relative relative">
          <div className="font-body text-xs uppercase tracking-widest text-white/50 mb-6 w-full text-left">Win Rate</div>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#39FF14" strokeWidth="8" strokeDasharray="283" strokeDashoffset="62" className="drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl">78%</span>
            </div>
          </div>
        </div>

        {/* Recent Signals */}
        <div className="md:col-span-2 bg-[#0F0F0F] rounded-2xl border border-white/5 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="font-body text-xs uppercase tracking-widest text-white/50">Recent Signals</div>
            <div className="font-body text-xs text-tcg-green cursor-pointer hover:underline">View All</div>
          </div>
          <div className="space-y-4">
            <SignalCard data={{ type: 'BUY', ticker: 'ITC', price: '450', target: '465', sl: '442', gain: '+0% \u2191' }} />
            <SignalCard data={{ type: 'SELL', ticker: 'TCS', price: '3850', target: '3780', sl: '3900', gain: '+1.8% \u2191' }} />
            <SignalCard data={{ type: 'BUY', ticker: 'HDFCBANK', price: '1680', target: '1720', sl: '1650', gain: '+2.97% \u2191' }} />
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-[#0F0F0F] rounded-2xl border border-white/5 p-6">
          <div className="font-body text-xs uppercase tracking-widest text-white/50 mb-6">Upcoming</div>
          
          <div className="space-y-6">
            <div className="relative pl-6 border-l border-white/10">
              <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-tcg-green"></div>
              <div className="font-body font-semibold text-sm mb-1">Pre-Market Analysis</div>
              <div className="font-body text-xs text-tcg-green font-mono">Tomorrow, 9:00 AM</div>
            </div>
            
            <div className="relative pl-6 border-l border-white/10">
              <div className="absolute left-[-4px] top-1 w-1.5 h-1.5 rounded-full bg-white/30"></div>
              <div className="font-body font-semibold text-sm mb-1 text-white/70">Gap-Up Setup</div>
              <div className="font-body text-xs text-white/40 font-mono">Pending</div>
            </div>
          </div>

          <div className="mt-12 bg-tcg-green/5 border border-tcg-green/20 rounded-lg p-4">
            <div className="font-body text-xs uppercase tracking-widest text-tcg-green mb-2">Pro Tip</div>
            <p className="font-body text-[11px] text-white/60">Strictly follow the SL provided. Do not average down on losing trades.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
