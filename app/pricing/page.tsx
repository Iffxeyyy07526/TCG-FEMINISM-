import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-tcg-black text-tcg-white">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-tcg-green/10 blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="font-display text-6xl md:text-[80px] leading-[0.9] text-white uppercase mb-4">
            Choose Your Edge
          </h1>
          <p className="font-body text-lg text-white/60 max-w-2xl mx-auto mb-16">
            Transparent pricing. Instant access. Step up to institutional-grade signals today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="card-premium p-8 flex flex-col text-left relative">
              <h3 className="font-display text-3xl mb-2">Starter</h3>
              <div className="mb-6">
                <span className="font-display text-5xl text-tcg-green">₹2,499</span>
                <span className="font-body text-white/50 text-sm"> / mo</span>
              </div>
              <div className="font-mono text-xs text-tcg-green mb-8">₹83.3 / day</div>

              <ul className="space-y-4 font-body text-sm text-white/80 flex-1 mb-8">
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Real-time signals</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Intraday calls</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Entry, target & SL</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Telegram access</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-tcg-green shrink-0 mt-1.5 ml-1"></span> Basic market commentary</li>
                <li className="flex items-start gap-3 opacity-30"><X size={18} className="text-white shrink-0 mt-0.5" /> Positional swing calls</li>
                <li className="flex items-start gap-3 opacity-30"><X size={18} className="text-white shrink-0 mt-0.5" /> Option chain signals</li>
              </ul>
              
              <Link href="/register?plan=starter" className="btn-ghost w-full">Select Starter</Link>
            </div>

            {/* Pro */}
            <div className="card-premium border-2 border-tcg-green relative p-8 flex flex-col text-left transform md:-translate-y-4 shadow-[0_0_40px_rgba(57,255,20,0.15)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-tcg-green text-black font-body font-bold text-[10px] tracking-widest uppercase px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="font-display text-3xl mb-2 flex items-center gap-2">Pro <span className="text-amber-400 text-xl">⭐</span></h3>
              <div className="mb-6">
                <span className="font-display text-5xl text-tcg-green">₹11,999</span>
                <span className="font-body text-white/50 text-sm"> / 6mo</span>
              </div>
              <div className="font-mono text-xs text-tcg-green mb-8">₹66.66 / day</div>

              <ul className="space-y-4 font-body text-sm text-white/80 flex-1 mb-8">
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Real-time signals</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Intraday calls</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Entry, target & SL</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Telegram access</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-tcg-green shrink-0 mt-1.5 ml-1"></span> Weekly Outlook</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Positional swing calls</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Option chain signals</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Risk-reward analysis</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Priority support</li>
              </ul>
              
              <Link href="/register?plan=pro" className="btn-primary w-full">Get Instant Access &rarr;</Link>
            </div>

            {/* Elite */}
            <div className="card-premium p-8 flex flex-col text-left relative">
              <h3 className="font-display text-3xl mb-2">Elite</h3>
              <div className="mb-6">
                <span className="font-display text-5xl text-tcg-green">₹19,999</span>
                <span className="font-body text-white/50 text-sm"> / 12mo</span>
              </div>
              <div className="font-mono text-xs text-tcg-green mb-8">₹55.55 / day</div>

              <ul className="space-y-4 font-body text-sm text-white/80 flex-1 mb-8">
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Everything in Pro</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Daily market commentary</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> 1-on-1 mentorship session</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Portfolio review</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Advanced options strategies</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Early access signals</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> Elite private community</li>
              </ul>
              
              <Link href="/register?plan=elite" className="btn-ghost w-full">Select Elite</Link>
            </div>
          </div>
          
          <div className="mt-16 bg-[#1A1A1A] p-6 rounded-xl border border-white/5 max-w-3xl mx-auto flex items-center justify-center gap-3">
             <span className="text-2xl">🛡️</span>
             <p className="font-body text-sm text-white/80 text-left">
               <strong className="text-white block mb-1">The Capital Guru Guarantee</strong>
               24/7 priority support and instant Telegram access right after secure payment. Cancel automatic renewals anytime.
             </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
