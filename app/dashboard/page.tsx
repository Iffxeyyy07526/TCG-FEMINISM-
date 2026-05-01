'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SignalCard } from '@/components/ui/signal-card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { ShieldAlert, CreditCard, ExternalLink, History, Lock, CheckCircle2, Loader2, AlertTriangle, Target, TrendingUp, ShieldCheck, XCircle, ArrowUpRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useProfile } from '@/hooks/use-profile';
import { motion } from 'motion/react';

export default function DashboardPage() {
  const { profile, loading: profileLoading } = useProfile();
  const [signals, setSignals] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, accuracy: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch signals
        const { data: signalsData } = await supabase
          .from('signals')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (signalsData) {
          setSignals(signalsData);
        }

        // Calculate stats
        const { data: allSignals } = await supabase
          .from('signals')
          .select('gain, is_active');

        if (allSignals) {
          const hits = allSignals.filter((s: any) => s.gain && (s.gain.includes('HIT') || s.gain.includes('+'))).length;
          setStats({
            total: allSignals.length,
            accuracy: allSignals.length > 0 ? Math.round((hits / allSignals.length) * 100) : 0
          });
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  const isApproved = profile?.status === 'approved';
  const isPending = profile?.status === 'pending';
  const isRejected = profile?.status === 'rejected';

  const getStatusConfig = () => {
    if (isApproved) return {
      icon: <ShieldCheck size={32} className="text-tcg-green" />,
      title: "Security Node Active",
      subtitle: "Institutional data stream is now synchronized with your terminal.",
      color: "border-tcg-green/20 bg-tcg-green/5",
      badge: "LIVE_FEED_ON"
    };
    if (isPending) return {
      icon: <Loader2 size={32} className="animate-spin text-tcg-green" />,
      title: "Verification In Progress",
      subtitle: "Our nodes are currently verifying your payment. Sync will complete shortly.",
      color: "border-tcg-green/10 bg-tcg-green/[0.02]",
      badge: "VERIFYING_BLOCK"
    };
    if (isRejected) return {
      icon: <XCircle size={32} className="text-red-500" />,
      title: "Access Denied",
      subtitle: "Verification failed. Please contact support or re-upload your proof.",
      color: "border-red-500/20 bg-red-500/5",
      badge: "INVALID_CREDENTIALS"
    };
    return {
      icon: <AlertTriangle size={32} className="text-yellow-500" />,
      title: "Account Restricted",
      subtitle: "Complete your activation to unlock institutional signals and professional tools.",
      color: "border-yellow-500/20 bg-yellow-500/5",
      badge: "RESTRICTED_MODE"
    };
  };

  const statusConfig = getStatusConfig();

  if (profileLoading || (loading && !profile)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-tcg-green" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Dynamic Status Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "border rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative group transition-all duration-500",
          statusConfig.color
        )}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-tcg-green/5 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-tcg-green/10 transition-colors"></div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md">
            {statusConfig.icon}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-white tracking-tighter">
                {statusConfig.title}
              </h2>
              <span className="font-mono text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-tcg-green/60 font-black">
                {statusConfig.badge}
              </span>
            </div>
            <p className="text-white/40 text-sm md:text-base font-medium max-w-xl">
              {statusConfig.subtitle}
            </p>
          </div>
        </div>

        {!isApproved && (
          <div className="flex gap-4 relative z-10 w-full md:w-auto">
            <Link href="/pricing" className="btn-primary px-10 py-5 whitespace-nowrap group flex-1 text-center shadow-[0_0_30px_rgba(57,255,20,0.2)]">
              {isRejected ? 'Re-Apply Now' : 'Complete Activation'} <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
            </Link>
          </div>
        )}
      </motion.div>

      {/* Top Header / Market Status */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-10 bg-tcg-green rounded-full shadow-[0_0_20px_#39FF14]"></div>
            <h1 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
              Welcome back, <br/>
              <span className="text-tcg-green text-glow">{profile?.full_name?.split(' ')[0] || 'Trader'}.</span>
            </h1>
          </div>
          <p className="font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/30 pl-5 flex items-center gap-2">
            Status: {isApproved ? <span className="text-tcg-green">UNRESTRICTED_ACCESS</span> : <span className="text-yellow-500">LIMITED_PROTOCOL</span>} 
            <span className="mx-2 opacity-20">|</span> 
            NODE_ID: {profile?.id?.substring(0, 8)}
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-white/[0.03] border border-white/5 backdrop-blur-md rounded-2xl px-6 py-4 flex items-center gap-4 group hover:border-tcg-green/30 transition-colors">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-tcg-green animate-ping absolute inset-0 opacity-40"></div>
              <div className="w-3 h-3 rounded-full bg-tcg-green shadow-[0_0_12px_#39FF14] relative"></div>
            </div>
            <div>
              <div className="font-mono text-[10px] font-black uppercase tracking-widest text-white/40">Market Node</div>
              <div className="font-display text-sm font-black text-tcg-green uppercase">NSE_LIVE_ON</div>
            </div>
          </div>
          
          <button className={cn(
            "h-14 px-8 rounded-2xl text-[10px] font-black transition-all flex items-center gap-3 uppercase tracking-[0.2em] group overflow-hidden relative flex-1 md:flex-none",
            isApproved 
              ? "bg-[#2AABEE] text-white hover:shadow-[0_0_30px_rgba(42,171,238,0.4)]" 
              : "bg-white/5 border border-white/10 text-white/20 cursor-not-allowed"
          )}>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
            {isApproved ? (
              <><MessageCircle size={18} /> Telegram Sync</>
            ) : (
              <><Lock size={16} /> Stream Encrypted</>
            )}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Performance Index */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 card-premium p-10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-tcg-green/10 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="flex items-start justify-between mb-10">
            <div>
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">Alpha Stream Index</div>
              <h3 className="font-display text-3xl font-black text-white uppercase tracking-tighter">Total Signal Distro</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-tcg-green/5 border border-tcg-green/10 flex items-center justify-center text-tcg-green">
              <TrendingUp size={28} />
            </div>
          </div>

          <div className="font-display text-8xl md:text-9xl font-black text-tcg-green mb-6 tracking-tighter text-glow flex items-baseline gap-4">
            <AnimatedCounter to={isApproved ? stats.total : 156} duration={2} format="plus" />
          </div>
          
          <div className="flex items-center gap-3 text-white/40 font-medium">
            <Target size={18} className="text-tcg-green" />
            <p className="text-sm">Proprietary setups distributed to pro-terminals this cycle.</p>
          </div>
        </motion.div>

        {/* Accuracy Tracker */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="card-premium p-10 flex flex-col items-center justify-center relative group"
        >
          <div className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-white/20 mb-10 w-full text-left">Edge Precision</div>
          
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
              <motion.circle 
                initial={{ strokeDashoffset: 276 }}
                animate={{ strokeDashoffset: isApproved ? (276 - (stats.accuracy * 276) / 100) : 138 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                cx="50" 
                cy="50" 
                r="44" 
                fill="none" 
                stroke="#39FF14" 
                strokeWidth="8" 
                strokeDasharray="276.46" 
                strokeLinecap="round"
                className="drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-5xl font-black text-white text-glow">
                {isApproved ? `${stats.accuracy}%` : '56%'}
              </span>
              <span className="font-mono text-[10px] text-tcg-green font-black tracking-[0.2em] mt-2 uppercase">Precision</span>
            </div>
          </div>
        </motion.div>

        {/* Signals Feed */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-end px-2">
            <div className="space-y-1">
              <h2 className="font-display text-3xl font-black uppercase tracking-tighter text-white">
                Institutional <span className="text-tcg-green">Flow.</span>
              </h2>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest italic">Real-time signal dissemination pipeline</p>
            </div>
            {isApproved ? (
               <Link href="/dashboard/signals" className="text-[11px] font-black text-tcg-green uppercase tracking-widest hover:underline flex items-center gap-2 mb-1">
                 View Historical Logs <History size={14} />
               </Link>
            ) : (
              <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
                <Lock size={12} className="text-red-500" />
                <span className="font-mono text-[10px] font-black text-red-500 uppercase tracking-widest">Feed Locked</span>
              </div>
            )}
          </div>
          
          <div className="card-premium p-1 relative overflow-hidden">
             {!isApproved && (
               <div className="absolute inset-0 z-10 backdrop-blur-[6px] bg-black/40 flex flex-col items-center justify-center p-8 text-center space-y-6">
                 <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                   <Lock size={32} />
                 </div>
                 <div className="space-y-2 max-w-sm">
                   <h3 className="font-display text-2xl font-black uppercase text-white tracking-tighter">Encrypted Signal Stream</h3>
                   <p className="text-white/40 text-sm font-medium">Your node currently lacks the clearance to decrypt real-time institutional flow.</p>
                 </div>
                 <Link href="/pricing" className="btn-primary py-4 px-10 shadow-[0_0_20px_rgba(57,255,20,0.2)]">Upgrade Clearance</Link>
               </div>
             )}

             <div className="p-8 space-y-6">
              {signals.length > 0 ? (
                signals.map((signal, idx) => (
                  <SignalCard 
                    key={signal.id || idx} 
                    data={{
                      type: signal.type,
                      ticker: signal.ticker,
                      price: signal.price,
                      target: signal.target,
                      sl: signal.sl,
                      rrRatio: signal.rr_ratio,
                      gain: signal.gain
                    }} 
                  />
                ))
              ) : (
                <div className="text-center py-20">
                  <Loader2 className="animate-spin text-white/10 mx-auto mb-4" size={32} />
                  <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em]">Establishing link with data nodes...</div>
                </div>
              )}
             </div>
          </div>
        </div>

        {/* Account Integrity */}
        <div className="space-y-6">
          <div className="px-2">
             <h2 className="font-display text-3xl font-black uppercase tracking-tighter text-white">System <span className="text-tcg-green">Auth.</span></h2>
          </div>
          
          <div className="card-premium p-8 space-y-10 group">
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500",
                  isApproved 
                    ? "bg-tcg-green/5 border-tcg-green/20 text-tcg-green shadow-[0_0_20px_rgba(57,255,20,0.15)] scale-110" 
                    : "bg-white/[0.03] border-white/10 text-white/20"
                )}>
                  {isApproved ? <ShieldCheck size={28} /> : <Lock size={28} />}
                </div>
                <div>
                  <div className="font-display font-black text-lg text-white uppercase tracking-tight">Security Protocol</div>
                  <div className={cn("font-mono text-[10px] font-black uppercase tracking-[0.2em] mt-1", isApproved ? "text-tcg-green" : "text-white/20")}>
                    {isApproved ? 'SECURE_NODE_ACTIVE' : 'SECURITY_ENCRYPTED'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-tcg-green group-hover:bg-tcg-green/10 transition-colors">
                  <CreditCard size={28} />
                </div>
                <div>
                  <div className="font-display font-black text-lg text-white uppercase tracking-tight">Plan Clearance</div>
                  <div className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-tcg-green mt-1">
                    {profile?.plan === 'starter' ? 'STARTER MEMBER' : 
                     profile?.plan === 'pro' ? 'PRO MEMBER' : 
                     profile?.plan === 'elite' ? 'ELITE MEMBER' : 
                     'ACCESS_LIMITED'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <Link href="/dashboard/settings" className="group/link flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                <span className="font-display text-xs font-black uppercase tracking-widest text-white/30 group-hover/link:text-white transition-colors">Terminal Settings</span>
                <ExternalLink size={14} className="text-white/20 group-hover/link:text-tcg-green transition-colors" />
              </Link>
              <Link href="/checkout" className="group/link flex items-center justify-between p-3 rounded-xl hover:bg-tcg-green/10 transition-colors">
                <span className="font-display text-xs font-black uppercase tracking-widest text-tcg-green">Renew Membership</span>
                <ArrowUpRight size={14} className="text-tcg-green" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
