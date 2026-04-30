import { SignalCard } from '@/components/ui/signal-card';

export default function SignalsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-wide">Live Signals</h1>
          <p className="font-body text-sm text-white/50">All active and historical trading setups.</p>
        </div>
        <div className="flex gap-2 bg-[#0F0F0F] rounded-xl p-1.5 border border-white/10 shadow-2xl backdrop-blur-xl">
          <button className="px-5 py-2 text-xs font-bold rounded-lg bg-tcg-green/20 text-tcg-green border border-tcg-green/20">Active</button>
          <button className="px-5 py-2 text-xs font-bold rounded-lg text-white/50 hover:bg-white/5 transition-colors">Closed</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SignalCard data={{ type: 'BUY', ticker: 'RELIANCE', price: '2450.00', target: '2520.00', sl: '2410.00', gain: '+2.86% \u2191' }} />
        <SignalCard data={{ type: 'SELL', ticker: 'HDFCBANK', price: '1680.00', target: '1630.00', sl: '1700.00', gain: '+0% \u2191' }} />
        <SignalCard data={{ type: 'BUY', ticker: 'TATAMOTORS', price: '890.00', target: '920.00', sl: '875.00', gain: '+3.4% \u2191' }} />
        <SignalCard data={{ type: 'SELL', ticker: 'INFY', price: '1450.00', target: '1410.00', sl: '1475.00' }} />
      </div>
    </div>
  );
}
