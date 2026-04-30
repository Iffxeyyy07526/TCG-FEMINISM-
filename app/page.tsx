import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { LiveBadge } from '@/components/ui/live-badge';
import { SignalCard } from '@/components/ui/signal-card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Marquee } from '@/components/ui/marquee';
import { FAQ } from '@/components/ui/faq';
import { Testimonials } from '@/components/ui/testimonials';
import Link from 'next/link';
import Script from 'next/script';
import * as motion from 'motion/react-client';

export default function Home() {
  const telegramLink = "https://t.me/TheCapitalGuruSupport";
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://thecapitalguru.net/#organization',
        name: 'The Capital Guru',
        url: 'https://thecapitalguru.net',
        logo: 'https://i.ibb.co/1Gbm0Csd/main-logo.jpg',
        sameAs: [
          telegramLink,
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
    <main className="min-h-screen bg-tcg-black text-white selection:bg-tcg-green/30 selection:text-tcg-green">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-56 md:pb-40 overflow-hidden">
        {/* Background FX */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-tcg-black" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-[-200px] right-[-200px] w-[900px] h-[900px] rounded-full bg-tcg-green opacity-[0.08] blur-[180px]" />
          <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full bg-tcg-green opacity-[0.05] blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-center xl:items-start text-center xl:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <LiveBadge text="LIVE · INSTITUTIONAL ALPHA FLOOR · ACTIVELY TRADING" className="mb-12" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter uppercase mb-10"
              >
                UNLEASH <br/>
                <span className="text-tcg-green italic underline decoration-tcg-green/10 underline-offset-[16px]">GURU ALPHA.</span><br/>
                BE THE 1%.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/40 max-w-2xl mb-14 leading-tight font-body font-bold lowercase tracking-tight"
              >
                quit guessing. start trailing the whales. get high-conviction, research-backed signals for indian stock market delivered straight to your telegram edge.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-6 mb-20 w-full sm:w-auto"
              >
                <Link 
                  href="/register" 
                  className="btn-primary px-12 py-5 text-base w-full sm:w-auto"
                >
                  SECURE ACCESS NOW
                </Link>
                <Link href="/pricing" className="glass-light px-10 py-5 text-white font-display font-black text-sm uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center justify-center w-full sm:w-auto group">
                  EXPLORE PLANS <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
                
                <a 
                  href={telegramLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[9px] items-center gap-2 font-black uppercase tracking-[0.3em] text-white/30 hover:text-tcg-green transition-colors hidden xl:flex group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-tcg-green animate-pulse shadow-[0_0_8px_#39FF14]"></span>
                  Direct Support Terminal
                </a>
              </motion.div>

              {/* Stats Row */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-wrap gap-12 items-center opacity-70"
              >
                <div className="flex flex-col">
                  <span className="text-3xl font-black font-display tracking-tight text-white mb-1 whitespace-nowrap">
                    <AnimatedCounter to={87.3} format="percent" />
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-black font-body text-white/40">Accuracy Rate</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black font-display tracking-tight text-white mb-1">1:3.4</span>
                  <span className="text-[10px] uppercase tracking-widest font-black font-body text-white/40">Avg RR Ratio</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black font-display tracking-tight text-white mb-1 whitespace-nowrap">
                    <AnimatedCounter to={2400} format="plus" />
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-black font-body text-white/40">Elite Traders</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Right Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 40, rotate: 12 }}
              animate={{ opacity: 1, x: 0, rotate: 6 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="lg:col-span-5 relative hidden lg:flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-tcg-green/5 blur-[120px] rounded-full scale-150" />
              <div className="relative z-10 w-full max-w-sm hover:rotate-0 transition-transform duration-700 cursor-pointer">
                <SignalCard 
                  className="shadow-2xl shadow-tcg-green/5"
                  data={{ 
                    type: 'BUY', 
                    ticker: 'NIFTY 24500 CE', 
                    price: '145.00', 
                    target: '210.00', 
                    sl: '115.00', 
                    rrRatio: '1:3.2',
                    status: 'ACTIVE'
                  }} 
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF BAR */}
      <Marquee text="" />

      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center"
          >
            <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">The Institutional Edge</h2>
            <div className="h-1 w-20 bg-tcg-green mx-auto mb-6"></div>
            <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed font-body font-medium">Professional-grade research tools and signal delivery systems designed for high-performance execution.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '📡', title: 'Institutional Flow', desc: 'Signals based on big-money movements and institutional order blocks.' },
              { icon: '⚡', title: 'Instant Execution', desc: 'Real-time Telegram alerts ensuring you enter before the volatility spikes.' },
              { icon: '📈', title: 'Full Asset Range', desc: 'Comprehensive setups for Nifty, Bank Nifty, and major blue-chip equities.' },
              { icon: '🛡', title: 'Risk Guard', desc: 'Pre-calculated stop-losses and position sizing for every single alert.' },
              { icon: '📊', title: 'Alpha Analytics', desc: 'Entries derived from complex option chain and volumetric analysis.' },
              { icon: '🤝', title: 'Direct Access', desc: 'Direct communication for doubt clearing and active trade management.' }
            ].map((feat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-premium group"
              >
                <div className="w-14 h-14 rounded-2xl bg-tcg-green/5 flex items-center justify-center text-3xl mb-8 border border-tcg-green/10 group-hover:scale-110 group-hover:bg-tcg-green/10 transition-all duration-500">
                  {feat.icon}
                </div>
                <h3 className="font-display font-black text-xl text-white mb-4 uppercase tracking-tight group-hover:text-tcg-green transition-colors">{feat.title}</h3>
                <p className="font-body text-white/30 leading-relaxed text-sm font-medium">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PERFORMANCE PREVIEW */}
      <section className="py-32 relative overflow-hidden bg-tcg-black/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-6xl font-black text-white mb-8 leading-[0.9] uppercase tracking-tighter">Precision <br/><span className="text-tcg-green">Execution.</span></h2>
            <p className="font-body text-lg text-white/50 mb-10 leading-relaxed font-medium">
              We don&apos;t just post signals; we build trade plans. Our methodology focuses on high-probability zones where the risk-to-reward ratio is skewed in your favor.
            </p>
            
            <div className="flex gap-12">
              <div className="flex flex-col">
                <span className="text-4xl font-display font-black text-tcg-green tracking-tighter">
                  <AnimatedCounter to={87} format="percent" />
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-black">Historical Accuracy</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-display font-black text-white tracking-tighter">1:3.4</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-black">Average Reward</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#050505] rounded-[2.5rem] border border-white/10 p-10 shadow-2xl relative max-w-md mx-auto group">
               <div className="absolute -inset-1 bg-gradient-to-r from-tcg-green/20 to-tcg-metal/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
               <div className="relative">
                 <div className="flex items-center gap-4 border-b border-white/10 pb-8 mb-10">
                   <div className="w-14 h-14 rounded-2xl bg-tcg-green flex items-center justify-center text-black font-display font-black text-xl shadow-[0_0_20px_rgba(57,255,20,0.4)]">TG</div>
                   <div>
                     <div className="font-display font-black text-white text-xl uppercase tracking-tight">The Capital Guru</div>
                     <div className="font-body text-[10px] text-tcg-green font-black tracking-[0.2em] uppercase">2,412 ACTIVE SUBSCRIBERS</div>
                   </div>
                 </div>

                 <div className="space-y-6">
                    <SignalCard 
                      className="border-white/5"
                      data={{ type: 'BUY', ticker: 'RELIANCE', price: '2450.00', target: '2520.00', sl: '2410.00', rrRatio: '1:3.5', gain: 'HIT \u2705' }} 
                    />
                    <SignalCard 
                      className="border-white/5"
                      data={{ type: 'SELL', ticker: 'HDFCBANK', price: '1680', target: '1630', sl: '1700', rrRatio: '1:2.8', gain: 'HIT \u2705' }} 
                    />
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. TESTIMONIALS & FAQ */}
      <Testimonials />
      <FAQ />

      {/* 6. FINAL CTA */}
      <section className="py-40 relative overflow-hidden bg-tcg-black">
        <div className="absolute inset-0 bg-tcg-green/5 blur-[140px] rounded-full translate-y-1/2 opacity-50"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-[0.9]">Elevate Your <br/>Trading Game.</h2>
            <p className="text-white/50 text-xl mb-12 max-w-2xl mx-auto font-body font-medium">Join the elite rank of traders receiving our institutional setups daily.</p>
            <div className="flex flex-col items-center gap-6">
              <Link href="/register" className="btn-primary px-16 py-6 text-lg group">
                REGISTER NOW <span className="group-hover:translate-x-2 transition-transform duration-300 ml-2">&rarr;</span>
              </Link>
              <a 
                href={telegramLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-black uppercase tracking-[0.2em] text-white/30 hover:text-tcg-green transition-colors"
              >
                Need Help? Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
