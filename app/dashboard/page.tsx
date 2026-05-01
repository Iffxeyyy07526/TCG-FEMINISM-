'use client';
import { useState, useEffect } from 'react';
import { SignalCard } from '@/components/ui/signal-card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { ShieldAlert, CreditCard, ExternalLink, History, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [userStatus, setUserStatus] = useState<'pending' | 'approved'>('pending');
  const [signals, setSignals] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, accuracy: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('status')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUserStatus(profile.status as 'pending' | 'approved');
        } else {
          // Fallback to localStorage for demo
          const localStatus = localStorage.getItem('tcg_user_status');
          if (localStatus) setUserStatus(localStatus as any);
        }

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
  }, []);

  const isApproved = userStatus === 'approved';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-tcg-green" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 mt-10">
      {/* Status Banner */}
      {!isApproved && (
        <div className="bg-tcg-green/5 border border-tcg-green/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tcg-green/5 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-tcg-green/10 flex items-center justify-center text-tcg-green shadow-[0_0_20px_rgba(57,255,20,0.1)]">
              {userStatus === 'pending' ? <Loader2 className="animate-spin" size={32} /> : <ShieldAlert size={32} />}
            </div>
            <div>
              <h2 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                {userStatus === 'pending' ? 'Verification In Progress' : 'Account Restricted'}
              </h2>
              <p className="text-white/40 text-sm font-medium">
                {userStatus === 'pending' 
                  ? 'Our nodes are verifying your transaction. Access will be granted shortly.' 
                  : 'Verify your payment to unlock real-time institutional signals and Telegram access.'}
              </p>
            </div>
          </div>
          {userStatus !== 'pending' ? (
            <Link href="/pricing" className="btn-primary px-8 py-4 whitespace-nowrap relative z-10 group">
              Complete Activation <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          ) : (
            <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/50 relative z-10">
              Awaiting Admin Review
            </div>
          )}
        </div>
      )}

      {/* Top Header / Market Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="font-display text-4xl font-black uppercase tracking-tighter text-white">
            Command <span className="text-tcg-green text-glow">Center.</span>
          </h1>
          <p className="font-body text-sm font-medium text-white/40">Terminal ID: TCG-XP-8842 // {isApproved ? 'FULL ACCESS' : 'RESTRICTED'}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-2xl px-5 py-3 flex items-center gap-4 border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-tcg-green animate-pulse shadow-[0_0_12px_#39FF14]"></div>
            <div>
              <div className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-white/30">NIFTY 50</div>
              <div className="font-body text-xs font-black text-tcg-green">MARKET ACTIVE</div>
            </div>
          </div>
          
          {isApproved ? (
            <button className="bg-[#2AABEE] text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-[#229ED9] transition-all flex items-center gap-2 uppercase tracking-widest hover:shadow-[0_0_25px_rgba(42,171,238,0.4)] hover:scale-105 active:scale-95">
              <span>📱</span> TELEGRAM ACCESS
            </button>
          ) : (
            <div className="bg-white/5 border border-white/10 text-white/20 px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 uppercase tracking-widest cursor-not-allowed">
              <Lock size={14} /> TG LOCKED
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Signals Overview / Stats */}
        <div className="md:col-span-2 card-premium relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tcg-green/5 blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all group-hover:scale-125"></div>
          <div className="font-body text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 font-mono">Institutional Edge Index</div>
          <div className="font-display text-7xl font-black text-tcg-green mb-4 tracking-tighter text-glow">
            <AnimatedCounter to={isApproved ? stats.total : 156} duration={2} format="plus" />
          </div>
          <p className="font-body text-sm text-white/50 font-medium leading-relaxed">
            High-conviction setups identified by our proprietary flow algorithms {isApproved ? 'this year' : 'in public records'}.
          </p>
        </div>

        {/* Win Rate Tracker */}
        <div className="card-premium flex flex-col items-center justify-center relative group">
          <div className="font-body text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8 w-full text-left font-mono">Success Rate</div>
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#39FF14" 
                strokeWidth="10" 
                strokeDasharray="283" 
                strokeDashoffset={isApproved ? (283 - (stats.accuracy * 283) / 100) : 140} 
                className="drop-shadow-[0_0_12px_rgba(57,255,20,0.4)] transition-all duration-1000 ease-out" 
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-4xl font-black text-white">{isApproved ? `${stats.accuracy}%` : '56%'}</span>
              <span className="text-[10px] text-white/30 font-black tracking-widest mt-1 uppercase">Accuracy</span>
            </div>
          </div>
        </div>

        {/* Latest Signals */}
        <div className="md:col-span-2 card-premium">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tcg-green/5 border border-tcg-green/10 flex items-center justify-center text-tcg-green">
                {isApproved ? <ExternalLink size={20} /> : <History size={20} />}
              </div>
              <h2 className="font-display text-2xl font-black uppercase tracking-tighter text-white">
                {isApproved ? 'Active Intel' : 'Legacy Log'}
              </h2>
            </div>
            {!isApproved && (
              <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/5 text-white/40 border border-white/10 rounded-full">
                 Locked Index
              </span>
            )}
          </div>
          
          <div className={cn("space-y-6 mb-8 transition-all duration-500", !isApproved && "opacity-30 blur-[2px] select-none pointer-events-none")}>
            {signals.length > 0 ? (
              signals.map((signal, idx) => (
                <SignalCard key={signal.id || idx} data={{
                  type: signal.type,
                  ticker: signal.ticker,
                  price: signal.price,
                  target: signal.target,
                  sl: signal.sl,
                  rrRatio: signal.rr_ratio,
                  gain: signal.gain
                }} />
              ))
            ) : (
              <div className="text-center py-10 text-white/20 uppercase tracking-widest text-xs">No signals distributed today</div>
            )}
          </div>

          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
            <p className="text-[11px] text-white/30 font-medium max-w-sm italic">
              * Active signals are reserved for Approved members only. Historical data is provided for transparency.
            </p>
            {!isApproved && (
              <Link href="/pricing" className="text-tcg-green text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                Unlock Active Stream <ExternalLink size={12} />
              </Link>
            )}
          </div>
        </div>

        {/* Security / Status */}
        <div className="card-premium space-y-8 h-fit">
          <div>
            <div className="font-body text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6 font-mono">Security Node</div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border transition-colors", isApproved ? "bg-tcg-green/5 border-tcg-green/20 text-tcg-green shadow-[0_0_15px_rgba(57,255,20,0.1)]" : "bg-red-500/5 border-red-500/20 text-red-500")}>
                  {isApproved ? <CheckCircle2 size={20} /> : <Lock size={20} />}
                </div>
                <div>
                  <div className="font-body font-black text-sm text-white uppercase tracking-tight">Access Token</div>
                  <div className={cn("text-[10px] font-black uppercase tracking-widest", isApproved ? "text-tcg-green" : "text-white/30")}>
                    {isApproved ? 'LIVE_STREAM_ON' : 'ENCRYPTED_LOCKED'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                  <CreditCard size={20} />
                </div>
                <div>
                  <div className="font-body font-black text-sm text-white uppercase tracking-tight">Subscription</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">
                    {isApproved ? 'PROFESSIONAL-ELITE' : 'INACTIVE_VOID'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
            <Link href="/dashboard/settings" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors flex items-center justify-between">
              Account Safety <span>&rarr;</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
