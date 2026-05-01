'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Check, X, Star, ShieldCheck } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="pt-40 pb-32 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-tcg-green/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-tcg-green/[0.03] blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-tcg-green bg-tcg-green/5 px-4 py-2 rounded-full border border-tcg-green/10 mb-8 inline-flex">
              PROFESSIONAL TIER ACCESS
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
              Unlock Your <br/>
              <span className="text-tcg-green text-glow">Trading Edge.</span>
            </h1>
            <p className="font-body text-xl text-white/40 max-w-2xl mx-auto font-medium lowercase tracking-tight">
              precision-engineered intelligence for serious market players. choose your growth weapon.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-20">
            <div className="bg-white/5 border border-white/10 p-1 rounded-2xl flex items-center gap-1">
               <button 
                 onClick={() => setBillingCycle('monthly')}
                 className={cn(
                   "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                   billingCycle === 'monthly' ? "bg-tcg-green text-black shadow-[0_0_20px_rgba(57,255,20,0.3)]" : "text-white/40 hover:text-white"
                 )}
               >
                 Monthly
               </button>
               <button 
                 onClick={() => setBillingCycle('annual')}
                 className={cn(
                   "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                   billingCycle === 'annual' ? "bg-tcg-green text-black shadow-[0_0_20px_rgba(57,255,20,0.3)]" : "text-white/40 hover:text-white"
                 )}
               >
                 Annual <span className="ml-1 text-[8px] opacity-60">(-20%)</span>
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            {/* Starter */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card-premium p-10 flex flex-col text-left group"
            >
              <div className="mb-10">
                <h3 className="font-display text-3xl font-black text-white uppercase mb-1 tracking-tight">Starter</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Entry Level Intel</p>
              </div>
              
              <div className="mb-10 min-h-[140px]">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-6xl font-black text-white tracking-tighter">
                    {billingCycle === 'monthly' ? '₹2,499' : '₹19,990'}
                  </span>
                  <span className="font-body text-white/30 text-sm font-bold uppercase tracking-widest">
                    {billingCycle === 'monthly' ? '/ Month' : '/ Year'}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-tcg-green mt-2 font-black uppercase tracking-widest bg-tcg-green/5 py-1 px-3 rounded-full border border-tcg-green/10 w-fit">
                  {billingCycle === 'monthly' ? '₹83 Execution Cost / Day' : '₹54 Execution Cost / Day'}
                </div>
              </div>

              <ul className="space-y-5 font-body text-sm text-white/60 flex-1 mb-12">
                <li className="flex items-start gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> <span>Real-time NSE signals</span></li>
                <li className="flex items-start gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> <span>Intraday Cash & F&O</span></li>
                <li className="flex items-start gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> <span>Exact Entry, Targets & SL</span></li>
                <li className="flex items-start gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors opacity-30"><X size={18} className="text-white shrink-0 mt-0.5" /> <span>Positional Swing Alpha</span></li>
                <li className="flex items-start gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors opacity-30"><X size={18} className="text-white shrink-0 mt-0.5" /> <span>Private Telegram Access</span></li>
              </ul>
              
              <Link href="/checkout?plan=starter" className="glass-light w-full py-5 text-xs font-black uppercase tracking-widest rounded-xl hover:border-tcg-green/30 hover:text-tcg-green transition-all text-center">
                Select Strategy
              </Link>
            </motion.div>

            {/* Pro - MOST POPULAR */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-premium border-2 border-tcg-green/40 p-12 flex flex-col text-left lg:scale-110 z-20 shadow-[0_0_80px_rgba(57,255,20,0.08)] bg-[#0A0A0A]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-tcg-green text-black font-display font-black text-[10px] tracking-[0.2em] uppercase px-8 py-3 rounded-full shadow-[0_0_30px_#39FF14] animate-pulse">
                Institutional Choice
              </div>
              
              <div className="mb-12">
                <h3 className="font-display text-5xl font-black text-white uppercase mb-2 tracking-tighter flex items-center gap-3">Pro <Star size={24} className="fill-tcg-green text-tcg-green" /></h3>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-tcg-green">Our Most Optimized Plan</p>
              </div>

              <div className="mb-12">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-8xl font-black text-white tracking-tighter">₹11,999</span>
                  <span className="font-body text-white/30 text-base font-bold uppercase tracking-widest">/ 6mo</span>
                </div>
                <div className="font-mono text-xs text-tcg-green mt-4 font-black uppercase tracking-widest bg-tcg-green/10 inline-block px-4 py-1.5 rounded-full border border-tcg-green/20">
                  SAVE 25% VS STARTER
                </div>
              </div>

              <ul className="space-y-4 font-body text-sm text-white/80 flex-1 mb-14">
                <li className="flex items-start gap-4 p-4 bg-white/[0.04] rounded-2xl hover:bg-tcg-green/[0.03] transition-colors"><Check size={20} className="text-tcg-green shrink-0 mt-0.5" /> <span>All Alpha Signal Access</span></li>
                <li className="flex items-start gap-4 p-4 bg-white/[0.04] rounded-2xl hover:bg-tcg-green/[0.03] transition-colors"><Check size={20} className="text-tcg-green shrink-0 mt-0.5" /> <span>Weekly Market Flow Map</span></li>
                <li className="flex items-start gap-4 p-4 bg-white/[0.04] rounded-2xl hover:bg-tcg-green/[0.03] transition-colors"><Check size={20} className="text-tcg-green shrink-0 mt-0.5" /> <span>High-Conviction Swing Calls</span></li>
                <li className="flex items-start gap-4 p-4 bg-white/[0.04] rounded-2xl hover:bg-tcg-green/[0.03] transition-colors"><Check size={20} className="text-tcg-green shrink-0 mt-0.5" /> <span>Priority Support Terminal</span></li>
                <li className="flex items-start gap-4 p-4 bg-white/[0.04] rounded-2xl hover:bg-tcg-green/[0.03] transition-colors"><Check size={20} className="text-tcg-green shrink-0 mt-0.5" /> <span>Historical Data Index</span></li>
              </ul>
              
              <Link href="/checkout?plan=pro" className="btn-primary w-full py-6 text-base font-black relative overflow-hidden group">
                <span className="relative z-10 transition-transform group-hover:scale-105 inline-block">ACTIVATE PRO ACCESS &rarr;</span>
              </Link>
            </motion.div>

            {/* Elite */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="card-premium p-10 flex flex-col text-left group"
            >
              <div className="mb-10">
                <h3 className="font-display text-3xl font-black text-white uppercase mb-1 tracking-tight">Elite</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">The Full Portfolio Engine</p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-6xl font-black text-white tracking-tighter">₹19,999</span>
                  <span className="font-body text-white/30 text-sm font-bold uppercase tracking-widest">/ Year</span>
                </div>
                <div className="font-mono text-[10px] text-tcg-green mt-2 font-black uppercase tracking-widest bg-tcg-green/5 py-1 px-3 rounded-full border border-tcg-green/10 w-fit">
                  Only ₹55 / day Cost
                </div>
              </div>

              <ul className="space-y-5 font-body text-sm text-white/60 flex-1 mb-12">
                <li className="flex items-start gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> <span>Everything in Pro Plan</span></li>
                <li className="flex items-start gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> <span>1-on-1 Portfolio Sync</span></li>
                <li className="flex items-start gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> <span>Advanced Option Strats</span></li>
                <li className="flex items-start gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> <span>Early Access Discovery</span></li>
                <li className="flex items-start gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors"><Check size={18} className="text-tcg-green shrink-0 mt-0.5" /> <span>Full Mentorship Hub</span></li>
              </ul>
              
              <Link href="/checkout?plan=elite" className="glass-light w-full py-5 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all text-center">
                Select Elite
              </Link>
            </motion.div>
          </div>

          {/* Comparison Table Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-48 text-left"
          >
            <div className="mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 italic">Compare <span className="text-tcg-green text-glow">Edge.</span></h2>
              <p className="font-body text-white/40 text-sm font-medium tracking-tight">Full feature breakdown across tactical archetypes.</p>
            </div>

            <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-8 px-6 text-left font-mono text-[10px] font-black uppercase tracking-[0.4em] text-white/20 w-1/3">Capabilities</th>
                    <th className="py-8 px-6 text-center font-display text-lg font-black uppercase tracking-tighter text-white">Starter</th>
                    <th className="py-8 px-6 text-center font-display text-lg font-black uppercase tracking-tighter text-tcg-green">Pro</th>
                    <th className="py-8 px-6 text-center font-display text-lg font-black uppercase tracking-tighter text-yellow-500">Elite</th>
                  </tr>
                </thead>
                <tbody className="font-body font-medium">
                  {[
                    { feature: "Daily NSE / F&O Intraday Signals", s: true, p: true, e: true },
                    { feature: "Signals per week (Avg)", s: "5-7", p: "10-15", e: "Unlimited" },
                    { feature: "Exact Entry, Targets & Stop Loss", s: true, p: true, e: true },
                    { feature: "Private Telegram Channel Access", s: true, p: true, e: true },
                    { feature: "Market Flow Map (Weekly Analysis)", s: false, p: true, e: true },
                    { feature: "High-Conviction Positional Swing Alpha", s: false, p: true, e: true },
                    { feature: "Historical Performance Data Index", s: false, p: true, e: true },
                    { feature: "1-on-1 Portfolio Sync Sessions", s: false, p: false, e: "2 / Month" },
                    { feature: "Advanced Option Strategy Modules", s: false, p: false, e: true },
                    { feature: "Direct Mentorship Hub Access", s: false, p: false, e: true },
                    { feature: "Support Response Time", s: "48 hours", p: "24 hours", e: "Priority" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                      <td className="py-6 px-6 text-sm text-white/60 group-hover:text-white transition-colors">{row.feature}</td>
                      <td className="py-6 px-6 text-center">
                        {typeof row.s === 'boolean' ? (row.s ? <Check size={18} className="mx-auto text-tcg-green" /> : <X size={18} className="mx-auto text-white/10" />) : <span className="text-white/40 text-[10px] font-black font-mono">{row.s}</span>}
                      </td>
                      <td className="py-6 px-6 text-center bg-tcg-green/[0.02]">
                        {typeof row.p === 'boolean' ? (row.p ? <Check size={18} className="mx-auto text-tcg-green" /> : <X size={18} className="mx-auto text-white/10" />) : <span className="text-tcg-green text-[10px] font-black font-mono">{row.p}</span>}
                      </td>
                      <td className="py-6 px-6 text-center">
                        {typeof row.e === 'boolean' ? (row.e ? <Check size={18} className="mx-auto text-tcg-green" /> : <X size={18} className="mx-auto text-white/10" />) : <span className="text-yellow-500 text-[10px] font-black font-mono">{row.e}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          <div className="mt-48 glass max-w-4xl mx-auto p-12 rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center gap-10">
             <div className="w-24 h-24 rounded-[2rem] bg-tcg-green/10 flex items-center justify-center text-tcg-green shrink-0 shadow-[0_0_40px_rgba(57,255,20,0.1)]">
               <ShieldCheck size={48} />
             </div>
             <div className="text-left">
               <h4 className="font-display text-2xl font-black text-white uppercase tracking-tight mb-3 font-mono">Institutional Shield</h4>
               <p className="font-body text-base text-white/40 font-medium leading-relaxed">
                 Every transaction is protected by standard 256-bit SSL encryption. Once activated, your access to the signals and Telegram community is instant and secure. We value your intellectual privacy above all.
               </p>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
