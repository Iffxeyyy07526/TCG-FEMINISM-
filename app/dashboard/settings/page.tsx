'use client';
import { useProfile } from '@/hooks/use-profile';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-tcg-green" />
      </div>
    );
  }

  const planMapping: any = {
    starter: 'Starter Member',
    pro: 'Pro Member',
    elite: 'Elite Member'
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="font-display text-4xl uppercase tracking-wide">Terminal <span className="text-tcg-green">Settings.</span></h1>
        <p className="font-body text-sm text-white/50 lowercase tracking-tight">manage your node configuration and credentials.</p>
      </div>

      <div className="space-y-6">
        <div className="card-premium p-6 sm:p-8">
          <h2 className="font-display text-xl mb-6 border-b border-white/10 pb-4 uppercase font-black">Identity Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-body text-[10px] uppercase tracking-widest text-white/30 block font-black">Full Legal Name</label>
              <input type="text" value={profile?.full_name || ''} readOnly className="w-full bg-[#0F0F0F] border border-white/5 rounded-xl px-4 py-4 font-body text-white text-sm focus:border-tcg-green outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-body text-[10px] uppercase tracking-widest text-white/30 block font-black">Digital Email Address</label>
              <input type="email" value={profile?.email || ''} disabled className="w-full bg-white/5 border border-transparent rounded-xl px-4 py-4 font-body text-white/50 text-sm cursor-not-allowed" />
            </div>
          </div>
          <div className="mt-8">
            <button className="px-8 py-3 text-xs font-black text-black bg-tcg-green rounded-xl tracking-widest uppercase hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(57,255,20,0.3)]">SYNC CHANGES</button>
          </div>
        </div>

        <div className="card-premium p-6 sm:p-8">
          <h2 className="font-display text-xl mb-6 border-b border-white/10 pb-4 uppercase font-black">Subscription Terminal</h2>
          <div className={cn(
            "flex flex-col sm:flex-row justify-between items-start sm:items-center p-8 rounded-[2rem] gap-6 border transition-all duration-500",
            profile?.status === 'approved' ? "bg-tcg-green/5 border-tcg-green/20" : "bg-white/5 border-white/10"
          )}>
            <div>
              <div className="font-display font-black text-2xl text-white uppercase tracking-tighter flex items-center gap-3 mb-2">
                {planMapping[profile?.plan as string] || 'Starter Member'} 
                {profile?.plan === 'elite' && <span className="text-amber-400 text-sm">ELITE_NODE</span>}
              </div>
              <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
                {profile?.status === 'approved' 
                  ? `Active Until: ${profile?.expires_at ? new Date(profile.expires_at).toLocaleDateString() : 'N/A'}` 
                  : 'Awaiting Authorization'}
              </div>
            </div>
            <button className="btn-primary py-3 px-8 text-[10px] w-full sm:w-auto">MANAGE SUBSCRIPTION</button>
          </div>
        </div>
      </div>
    </div>
  );
}
