import { AnimatedCounter } from '@/components/ui/animated-counter';

export default function PortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="font-display text-4xl uppercase tracking-wide">Portfolio Analysis</h1>
        <p className="font-body text-sm text-white/50">Track your performance mimicking TCG signals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium p-6 flex flex-col justify-between">
          <span className="font-body text-xs uppercase tracking-widest text-white/50">Total Capital Deployed</span>
          <span className="font-display text-4xl mt-4">₹5,00,000</span>
        </div>
        <div className="card-premium p-6 flex flex-col justify-between border-tcg-green/30" style={{ boxShadow: '0 0 30px rgba(57,255,20,0.05)' }}>
          <span className="font-body text-xs uppercase tracking-widest text-white/50">Realized P&L</span>
          <span className="font-display text-4xl text-tcg-green mt-4">+₹1,42,500</span>
        </div>
        <div className="card-premium p-6 flex flex-col justify-between">
          <span className="font-body text-xs uppercase tracking-widest text-white/50">Overall ROI</span>
          <span className="font-display text-4xl text-tcg-green mt-4">28.5%</span>
        </div>
      </div>

      <div className="card-premium p-6 flex flex-col items-center justify-center min-h-[300px] border-dashed border-white/20">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl mb-4">📊</div>
        <h3 className="font-body text-lg font-bold text-white mb-2">Advanced Charts</h3>
        <p className="text-white/40 font-body text-sm max-w-sm text-center">Interactive tracking of your equity curve will be available in the upcoming platform update.</p>
      </div>
    </div>
  );
}
