import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { LiveBadge } from '@/components/ui/live-badge';
import { SignalCard } from '@/components/ui/signal-card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Marquee } from '@/components/ui/marquee';
import Link from 'next/link';
import Script from 'next/script';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://thecapitalguru.net/#organization',
        name: 'The Capital Guru',
        url: 'https://thecapitalguru.net',
        logo: 'https://thecapitalguru.net/logo.png',
        sameAs: [
          'https://t.me/TheCapitalGuruSupport',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://thecapitalguru.net/#website',
        url: 'https://thecapitalguru.net',
        name: 'The Capital Guru',
        publisher: {
          '@id': 'https://thecapitalguru.net/#organization',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-tcg-black text-tcg-white overflow-hidden selection:bg-tcg-green/30 selection:text-tcg-green">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Background FX */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-tcg-black" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-tcg-green opacity-[0.08] blur-[120px]" />
          <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-tcg-green opacity-[0.05] blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content (60%) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <LiveBadge text="LIVE · Equity & F&O · Desk Active" className="mb-6" />
              
              <h1 className="font-display text-5xl sm:text-6xl lg:text-[80px] xl:text-[90px] font-black leading-[0.95] tracking-tighter uppercase mb-6 animate-in slide-in-from-top-8 fade-in duration-1000">
                Institutional-Grade<br/>
                <span className="text-tcg-green">Signals</span> For Stock Market
              </h1>
              
              <p className="text-lg text-white/60 max-w-lg mb-10 leading-relaxed font-medium animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-200">
                Research-backed entries, targets, and stop-losses — delivered on Telegram when the setup is live. Built for traders who want clarity, not noise.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 sm:gap-12 mb-10 border-y border-white/10 py-6 w-full animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300">
                <div className="flex flex-col">
                  <div className="text-3xl font-bold text-tcg-green shadow-tcg-green/50" style={{ textShadow: '0 0 15px rgba(57,255,20,0.3)' }}>
                    <AnimatedCounter to={78} duration={1.5} format="percent" />
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">Win Rate</div>
                </div>
                <div className="w-[1px] h-10 bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col">
                  <div className="text-3xl font-bold">
                    <AnimatedCounter to={350} duration={1.5} format="plus" />
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">Signals YTD</div>
                </div>
                <div className="w-[1px] h-10 bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col">
                  <div className="text-3xl font-bold">
                    <AnimatedCounter to={150} duration={1.5} format="plus" />
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">Active Members</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-500">
                <Link href="/register" className="btn-primary w-full sm:w-auto">
                  Get Instant Access &rarr;
                </Link>
                <Link href="/pricing" className="btn-ghost w-full sm:w-auto">
                  Compare Plans
                </Link>
              </div>

              {/* Trust Row */}
              <div className="flex flex-wrap items-center gap-4 text-[11px] font-body text-white/40 uppercase tracking-widest font-semibold animate-in fade-in duration-1000 delay-700">
                <span><span className="mr-1">🔒</span> 256-bit SSL</span>
                <span className="hidden sm:inline">•</span>
                <span><span className="mr-1">✓</span> 150+ Members</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-tcg-green"><span className="mr-1">⚡</span> Real-Time Signals</span>
              </div>
            </div>

            {/* Hero Right Visual (40%) */}
            <div className="lg:col-span-5 relative h-[500px] w-full hidden md:flex items-center justify-center select-none animate-in fade-in zoom-in-95 duration-1000 delay-500">
              <div className="absolute inset-0 bg-tcg-green/5 blur-[80px] rounded-full" />
              
              {/* Background Card 2 */}
              <div className="absolute w-full max-w-xs bg-[#0F0F0F] border border-white/5 rounded-2xl p-6 shadow-2xl z-0 transform -translate-x-8 translate-y-12 opacity-30 blur-[2px]" />
              
              {/* Background Card 1 */}
              <div className="absolute w-full max-w-xs bg-[#0F0F0F] border border-white/5 rounded-2xl p-6 shadow-2xl z-0 transform translate-x-12 -translate-y-8 opacity-40 blur-[1px]" />

              {/* Main Card (Floating) */}
              <div className="absolute animate-[floatBackground_6s_ease-in-out_infinite] z-10 w-full max-w-sm drop-shadow-2xl">
                <SignalCard 
                  data={{ type: 'BUY', ticker: 'RELIANCE', price: '2450.00', target: '2520.00', sl: '2410.00', gain: '+2.86% \u2191' }} 
                />
              </div>
            </div>

          </div>
        </div>

        {/* Disclaimer Bottom */}
        <div className="absolute bottom-4 right-10 z-20 opacity-40 hidden md:block">
           <p className="text-[9px] text-right max-w-xs font-medium">TCG is not SEBI-registered. All signals are for educational purposes only. Trade at your own risk.</p>
        </div>
      </section>

      {/* 2. SOCIAL PROOF BAR */}
      <Marquee text="" />

      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <h2 className="font-display text-5xl md:text-[64px] text-white">Why Traders Choose Us</h2>
            <div className="w-20 h-1 bg-tcg-green mt-6 shadow-[0_0_10px_#39FF14]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📡', title: 'Real-Time Signals', desc: 'Stock Market equities & derivatives with precise entry, target, and stop-loss levels.' },
              { icon: '⚡', title: 'Instant Telegram', desc: 'Get signals directly to your Telegram before the market moves.' },
              { icon: '📈', title: 'Intraday & Positional', desc: 'Curated calls for all trading styles, from day trades to swing setups.' },
              { icon: '🛡', title: 'Risk Management', desc: 'Every call comes with a strictly calculated risk-reward ratio.' },
              { icon: '📊', title: 'Option Chain Analytics', desc: 'Advanced derivatives signals based on institutional flow.' },
              { icon: '🤝', title: 'Elite Community', desc: 'Learn and trade alongside a tight-knit group of professional traders.' }
            ].map((feat, i) => (
              <div key={i} className="card-premium group">
                <div className="w-10 h-10 rounded-full bg-tcg-green/10 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="font-body font-semibold text-lg text-white mb-2">{feat.title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-16 md:py-24 relative border-y border-white/5 bg-tcg-black">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 text-center">
            <h2 className="font-display text-5xl md:text-[64px] text-white mb-4">How It Works</h2>
            <p className="font-body text-lg text-white/60 max-w-xl mx-auto">Three steps from signup to live signals — built for speed and clarity.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between relative max-w-5xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-tcg-green/20 z-0">
               <div className="h-full bg-tcg-green w-1/3 shadow-[0_0_10px_#39FF14]"></div>
            </div>

            {[
              { num: '01', title: 'Create Your Account', desc: 'Sign up in under a minute and verify your email — no paperwork.' },
              { num: '02', title: 'Choose Plan & Pay', desc: 'Pick Starter, Pro, or Elite. Pay securely via Razorpay with GST invoice.' },
              { num: '03', title: 'Get Telegram Access', desc: 'Receive your private invite and start getting structured signals instantly.' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center p-6 md:w-1/3 mb-8 md:mb-0">
                 {/* Circle Node */}
                 <div className="w-[120px] h-[120px] rounded-full bg-[#0F0F0F] border border-white/10 backdrop-blur-xl flex items-center justify-center mb-6 relative group overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-tcg-green/5 group-hover:bg-tcg-green/10 transition-colors"></div>
                    <span className="font-display text-[80px] text-white/10 group-hover:text-tcg-green/30 transition-colors select-none leading-none mt-2">{step.num}</span>
                    <div className="absolute top-4 left-4 w-2 h-2 bg-tcg-green rounded-full shadow-[0_0_10px_#39FF14]"></div>
                 </div>
                 <h3 className="font-body font-bold text-lg text-white mb-3 tracking-wide">{step.title}</h3>
                 <p className="font-body text-sm text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/register" className="btn-primary">Start Step 01</Link>
          </div>
        </div>
      </section>

      {/* 5. LIVE SIGNAL PREVIEW */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Glow behind */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-tcg-green/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="font-display text-5xl md:text-[64px] text-white mb-6">Real Signals.<br/>Real Results.</h2>
            <p className="font-body text-lg text-white/70 mb-8 leading-relaxed">
              We cut the noise. Our telegram feed delivers exactly what you need to execute: direction, entry price, targets, and strict stop-loss. Check our verified hits.
            </p>
            
            <div className="bg-tcg-green/10 border border-tcg-green/30 p-6 rounded-xl max-w-sm">
                <div className="font-display text-4xl text-tcg-green mb-1">87.3%</div>
                <div className="font-body text-xs text-white/80 uppercase tracking-widest mb-3">of signals hit target.</div>
                <div className="w-full h-1.5 bg-tcg-black rounded-full overflow-hidden">
                   <div className="h-full bg-tcg-green shadow-[0_0_8px_#39FF14] w-[87.3%]"></div>
                </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            {/* Telegram simulated feed */}
            <div className="bg-[#0e1621] rounded-2xl border border-white/5 p-4 sm:p-6 shadow-2xl relative max-w-md mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
               {/* Telegram header mock */}
               <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                 <div className="w-10 h-10 rounded-full bg-tcg-green flex items-center justify-center text-black font-display text-lg shadow-[0_0_10px_#39FF14]">CG</div>
                 <div>
                   <div className="font-body font-semibold text-white">The Capital Guru Live</div>
                   <div className="font-body text-xs text-tcg-green font-mono">2,412 subscribers</div>
                 </div>
               </div>

               {/* Signals */}
               <div className="space-y-4">
                  <SignalCard 
                    data={{ type: 'BUY', ticker: 'RELIANCE', price: '2450.00', target: '2520.00', sl: '2410.00', gain: '+2.86% \u2191' }} 
                  />
                  <SignalCard 
                    data={{ type: 'SELL', ticker: 'HDFCBANK', price: '1680', target: '1630', sl: '1700', gain: 'Hit +2.97% \u2705' }} 
                  />
                  <SignalCard 
                    data={{ type: 'BUY', ticker: 'TATAMOTORS', price: '890', target: '920', sl: '875', gain: 'Hit +3.4% \u2705' }} 
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-tcg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-5xl md:text-[64px] text-white mb-16 text-center">What Our Members Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Rahul S.', city: 'Mumbai', initial: 'R', quote: "Joined the Pro plan 4 months ago. The intraday calls are incredibly accurate. Made back my subscription fee in the first week!" },
              { name: 'Priya M.', city: 'Bangalore', initial: 'P', quote: "Finally a signal service that actually works. The Telegram group is super active and the team responds quickly to queries." },
              { name: 'Vikram T.', city: 'Delhi', initial: 'V', quote: "The option chain signals alone are worth the Elite subscription. Up 34% in 3 months strictly following their structured calls." }
            ].map((t, i) => (
              <div key={i} className="card-premium">
                 <div className="flex text-amber-400 mb-4 text-sm gap-1">
                    {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                 </div>
                 <p className="font-body italic text-[15px] text-white/80 mb-8 leading-relaxed">&quot;{t.quote}&quot;</p>
                 <div className="flex items-center gap-4 mt-auto">
                   <div className="w-10 h-10 rounded-full bg-tcg-green/20 text-tcg-green border border-tcg-green/20 flex items-center justify-center font-display text-xl">{t.initial}</div>
                   <div>
                     <div className="font-body font-semibold text-white text-sm">{t.name}</div>
                     <div className="font-body text-xs text-white/50 uppercase tracking-wider">{t.city}</div>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
