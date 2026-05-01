'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Loader2, Trash2, Plus, Users, Send, Settings as SettingsIcon, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'settings' | 'users' | 'signals' | 'coupons'>('users');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [settings, setSettings] = useState({ upiId: '', qrUrl: '', maintenance: false, whatsappNumber: '' });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [signals, setSignals] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Coupon Form State
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount_percent: 10,
    max_uses: 100,
    is_active: true
  });

  // Signal Form State
  const [newSignal, setNewSignal] = useState({
    type: 'BUY',
    ticker: '',
    price: '',
    target: '',
    sl: '',
    rr_ratio: '',
  });

  const fetchData = async () => {
    try {
      // Fetch users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (usersData) setPendingUsers(usersData);

      // Fetch signals
      const { data: signalsData } = await supabase
        .from('signals')
        .select('*')
        .order('created_at', { ascending: false });

      if (signalsData) setSignals(signalsData);

      // Fetch coupons
      const { data: couponsData } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (couponsData) setCoupons(couponsData);

      // Fetch settings
      try {
        const res = await fetch('/api/settings');
        const settingsData = await res.json();
        if (settingsData) setSettings(settingsData);
      } catch (err) {
        console.error('Settings fetch failed', err);
      }

    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const updateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setMsg('Configuration synchronized.');
        setTimeout(() => setMsg(''), 3000);
      } else {
        throw new Error('Update failed');
      }
    } catch (err: any) {
      alert(err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session }, error: sessionErr } = await supabase.auth.getSession();
        if (sessionErr) throw sessionErr;

        if (session) {
          const { data: profile, error: profileErr } = await supabase.from('profiles').select('is_admin').eq('id', session.user.id).single();
          if (profileErr) throw profileErr;

          if (profile?.is_admin) {
            setIsAuthenticated(true);
            await fetchData();
          } else {
            // Not an admin
            await supabase.auth.signOut();
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Terminal sync error:', err);
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', data.user.id).single();
      if (!profile?.is_admin) {
        await supabase.auth.signOut();
        throw new Error('Unauthorized terminal access.');
      }

      setIsAuthenticated(true);
      await fetchData();
    } catch (err: any) {
      alert(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (userId: string) => {
    try {
      const user = pendingUsers.find(u => u.id === userId);
      if (!user) return;

      // Calculate expiration based on plan
      const now = new Date();
      let durationDays = 30; // Default Starter
      const planType = user.plan?.toLowerCase() || 'starter';
      if (planType === 'pro') durationDays = 180;
      if (planType === 'elite') durationDays = 365;

      const expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

      const { error } = await supabase
        .from('profiles')
        .update({ 
          status: 'approved',
          plan_activated_at: now.toISOString(),
          expires_at: expiresAt.toISOString()
        })
        .eq('id', userId);
      
      if (error) throw error;
      setPendingUsers(users => users.map(u => u.id === userId ? { ...u, status: 'approved', expires_at: expiresAt.toISOString() } : u));

      // Send Approval Email
      try {
        await fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'approval',
            email: user.email,
            data: { telegramLink: 'https://t.me/thecapitalguru' }
          })
        });
      } catch (emailErr) {
        console.error('Approval email failed:', emailErr);
      }
    } catch (err: any) {
      alert('Approval failed: ' + err.message);
    }
  };

  const deleteSignal = async (signalId: string) => {
    try {
      const { error } = await supabase
        .from('signals')
        .delete()
        .eq('id', signalId);
      
      if (error) throw error;
      setSignals(s => s.filter(x => x.id !== signalId));
    } catch (err: any) {
      alert('Delete failed');
    }
  };

  const createSignal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('signals')
        .insert([newSignal])
        .select();

      if (error) throw error;
      if (data) setSignals([data[0], ...signals]);
      setNewSignal({ type: 'BUY', ticker: '', price: '', target: '', sl: '', rr_ratio: '' });
      setMsg('Signal deployed to live floor!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err: any) {
      alert('Signal deployment failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const createCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('coupons')
        .insert([newCoupon])
        .select();

      if (error) throw error;
      if (data) setCoupons([data[0], ...coupons]);
      setNewCoupon({ code: '', discount_percent: 10, max_uses: 100, is_active: true });
      setMsg('Coupon code generated.');
      setTimeout(() => setMsg(''), 3000);
    } catch (err: any) {
      alert('Coupon generation failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteCoupon = async (id: string) => {
    try {
      const { error } = await supabase.from('coupons').delete().eq('id', id);
      if (error) throw error;
      setCoupons(c => c.filter(x => x.id !== id));
    } catch (err: any) {
      alert('Delete failed');
    }
  };

  const updateSignalStatus = async (id: string, gain: string) => {
    try {
      const { error } = await supabase
        .from('signals')
        .update({ gain, is_active: gain === 'PENDING' })
        .eq('id', id);
      
      if (error) throw error;
      setSignals(s => s.map(x => x.id === id ? { ...x, gain, is_active: gain === 'PENDING' } : x));
    } catch (err: any) {
      alert('Update failed');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-black text-tcg-green flex flex-col items-center justify-center font-mono gap-4">
      <Loader2 className="animate-spin" size={32} />
      <div className="text-[10px] uppercase tracking-[0.3em] font-black animate-pulse">Syncing Terminal Nodes...</div>
      <div className="text-[8px] text-white/20 uppercase tracking-widest mt-10">Institutional access verification in progress</div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none fixed">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="w-full max-w-sm bg-[#0F0F0F] rounded-2xl border border-white/10 p-8 z-10">
          <h1 className="font-display text-2xl uppercase mb-6 text-center text-tcg-green font-black tracking-tighter">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-body text-[10px] uppercase tracking-widest text-white/50 block mb-1 font-black">Identity Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" placeholder="admin@thecapitalguru.net" />
            </div>
            <div>
              <label className="font-body text-[10px] uppercase tracking-widest text-white/50 block mb-1 font-black">Access Key</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="w-full px-6 py-4 text-xs font-bold text-black bg-tcg-green rounded-lg tracking-widest uppercase hover:bg-tcg-green/80 transition-all mt-4 flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={16} /> : 'Authenticate'}
            </button>
            <p className="text-[9px] text-white/20 text-center uppercase tracking-widest leading-relaxed">
              If authentication fails, ensure your identity is registered on the main floor and authorized for terminal access.
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tcg-green/[0.03] blur-[100px]" />
      </div>
      
      <nav className="border-b border-white/10 bg-[#050505] px-6 py-4 flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-tcg-green flex items-center justify-center text-black font-display font-black text-2xl shadow-[0_0_15px_rgba(57,255,20,0.5)]">TCG</div>
          <span className="font-display text-xl tracking-tighter uppercase hidden sm:block font-black">Command <span className="text-tcg-green">Center</span></span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" target="_blank" className="text-[10px] uppercase tracking-widest text-tcg-green hover:underline font-black">View Site</Link>
          <button onClick={handleLogout} className="text-[10px] uppercase tracking-widest text-red-500 hover:text-red-400 font-black">Logout</button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col md:flex-row z-10 relative">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-[#050505]/50 p-6 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('users')}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeTab === 'users' ? "bg-tcg-green text-black" : "text-white/40 hover:bg-white/5 hover:text-white")}
          >
            <Users size={16} /> Nodes
          </button>
          <button 
            onClick={() => setActiveTab('signals')}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeTab === 'signals' ? "bg-tcg-green text-black" : "text-white/40 hover:bg-white/5 hover:text-white")}
          >
            <Send size={16} /> Signals
          </button>
          <button 
            onClick={() => setActiveTab('coupons')}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeTab === 'coupons' ? "bg-tcg-green text-black" : "text-white/40 hover:bg-white/5 hover:text-white")}
          >
            <CreditCard size={16} /> Coupons
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeTab === 'settings' ? "bg-tcg-green text-black" : "text-white/40 hover:bg-white/5 hover:text-white")}
          >
            <SettingsIcon size={16} /> Config
          </button>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-[calc(100vh-80px)]">
          {activeTab === 'users' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="font-display text-4xl uppercase font-black tracking-tighter mb-2">Network Nodes</h1>
                  <p className="font-body text-sm text-white/40">Review and authorize institutional access requests.</p>
                </div>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full md:w-80 bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-sm focus:border-tcg-green outline-none transition-all"
                  />
                  <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-tcg-green transition-colors" />
                </div>
              </div>

              <div className="card-premium overflow-hidden border-white/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-widest font-black text-white/30">
                        <th className="px-6 py-5">Identity</th>
                        <th className="px-6 py-5">Email</th>
                        <th className="px-6 py-5">Tier</th>
                        <th className="px-6 py-5">Expirations</th>
                        <th className="px-6 py-5">Status</th>
                        <th className="px-6 py-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {pendingUsers.filter(u => 
                        u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        u.email?.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map(user => (
                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-5">
                            <div className="flex flex-col">
                              <span className="font-black text-white tracking-tight">{user.full_name || 'N/A'}</span>
                              <span className="text-[10px] text-white/20 font-mono">ID: {user.id.substring(0, 8)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-white/50 text-xs font-mono">{user.email}</td>
                          <td className="px-6 py-5">
                            <select 
                              className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:text-tcg-green"
                              value={user.plan?.toLowerCase() || 'starter'}
                              onChange={async (e) => {
                                const newPlan = e.target.value;
                                const { error } = await supabase.from('profiles').update({ plan: newPlan }).eq('id', user.id);
                                if (!error) setPendingUsers(u => u.map(curr => curr.id === user.id ? { ...curr, plan: newPlan } : curr));
                              }}
                            >
                              <option value="starter">Starter</option>
                              <option value="pro">Pro</option>
                              <option value="elite">Elite</option>
                            </select>
                          </td>
                          <td className="px-6 py-5 text-[10px] font-mono text-white/30">
                            {user.expires_at ? new Date(user.expires_at).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-5">
                            <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border", 
                              user.status === 'approved' ? "bg-tcg-green/10 text-tcg-green border-tcg-green/20" : 
                              user.status === 'rejected' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                              "bg-yellow-500/10 text-yellow-500 border-yellow-500/20")}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right space-x-2">
                            {user.status !== 'approved' ? (
                              <button 
                                onClick={() => approveUser(user.id)}
                                className="px-4 py-2 bg-tcg-green text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:scale-105 transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                                Authorize
                              </button>
                            ) : (
                              <button 
                                onClick={async () => {
                                  const { error } = await supabase.from('profiles').update({ status: 'pending' }).eq('id', user.id);
                                  if (!error) setPendingUsers(u => u.map(curr => curr.id === user.id ? { ...curr, status: 'pending' } : curr));
                                }}
                                className="px-4 py-2 bg-white/5 border border-white/10 text-white/30 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-all">
                                Suspended
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'signals' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
              <div className="mb-10">
                <h1 className="font-display text-4xl uppercase font-black tracking-tighter mb-2">Signal Deployment</h1>
                <p className="font-body text-sm text-white/40">Push institutional-grade trade setups to the live floor.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Form */}
                <form onSubmit={createSignal} className="card-premium p-8 space-y-6 lg:col-span-1 h-fit">
                  <h3 className="font-display text-xl font-black uppercase tracking-tight text-tcg-green mb-4">New Signal</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Action</label>
                      <select 
                        value={newSignal.type} 
                        onChange={e => setNewSignal({...newSignal, type: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none"
                      >
                        <option value="BUY">BUY / LONG</option>
                        <option value="SELL">SELL / SHORT</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Ticker</label>
                      <input type="text" required value={newSignal.ticker} onChange={e => setNewSignal({...newSignal, ticker: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" placeholder="ITC" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Price</label>
                      <input type="text" required value={newSignal.price} onChange={e => setNewSignal({...newSignal, price: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" placeholder="450.00" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Target</label>
                      <input type="text" required value={newSignal.target} onChange={e => setNewSignal({...newSignal, target: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" placeholder="475.00" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Stop Loss</label>
                      <input type="text" required value={newSignal.sl} onChange={e => setNewSignal({...newSignal, sl: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" placeholder="442.00" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">R:R Ratio</label>
                      <input type="text" required value={newSignal.rr_ratio} onChange={e => setNewSignal({...newSignal, rr_ratio: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" placeholder="1:2.4" />
                    </div>
                  </div>

                  <button 
                    disabled={saving}
                    type="submit" 
                    className="w-full py-4 bg-tcg-green text-black font-black uppercase text-xs tracking-widest rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="animate-spin" /> : <Plus size={18} />} Deploy
                  </button>
                  {msg && <p className="text-center text-[10px] font-black text-tcg-green animate-pulse uppercase tracking-[0.2em]">{msg}</p>}
                </form>

                {/* List */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-display text-xl font-black uppercase tracking-tight text-white mb-6">Live Logs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                    {signals.map(signal => (
                      <div key={signal.id} className="card-premium p-5 flex items-center justify-between border-white/5 hover:border-tcg-green/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-1.5 h-10 rounded-full", signal.type === 'BUY' ? "bg-tcg-green shadow-[0_0_10px_#39FF14]" : "bg-red-500 shadow-[0_0_10px_#EF4444]")} />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-black text-white">{signal.ticker}</span>
                              <span className={cn("text-[8px] font-black px-1.5 py-0.5 rounded", signal.type === 'BUY' ? "text-tcg-green bg-tcg-green/10" : "text-red-500 bg-red-500/10")}>{signal.type}</span>
                              <span className="text-[8px] font-black uppercase text-white/20 ml-2">{signal.gain || 'ACTIVE'}</span>
                            </div>
                            <div className="text-[10px] text-white/30 font-mono">P: {signal.price} &bull; T: {signal.target}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select 
                            className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[8px] font-black text-white/50 outline-none"
                            value={signal.gain || 'PENDING'}
                            onChange={(e) => updateSignalStatus(signal.id, e.target.value)}
                          >
                            <option value="PENDING">SET_PENDING</option>
                            <option value="HIT">HIT_TARGET</option>
                            <option value="STOPPED">STOPPED_OUT</option>
                            <option value="+20%">PROFIT_20%</option>
                            <option value="+50%">PROFIT_50%</option>
                          </select>
                          <button onClick={() => deleteSignal(signal.id)} className="p-2 text-white/20 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {signals.length === 0 && <div className="col-span-full py-20 text-center text-white/20 uppercase text-xs font-black tracking-widest">No signals deployed</div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
              <div className="mb-10">
                <h1 className="font-display text-4xl uppercase font-black tracking-tighter mb-2">Discount Engines</h1>
                <p className="font-body text-sm text-white/40">Generate and manage promotional access keys.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <form onSubmit={createCoupon} className="card-premium p-8 space-y-6 lg:col-span-1 h-fit">
                  <h3 className="font-display text-xl font-black uppercase tracking-tight text-tcg-green mb-4">New Coupon</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Coupon Code</label>
                      <input 
                        required
                        type="text" 
                        value={newCoupon.code} 
                        onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" 
                        placeholder="SUMMER20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Discount (%)</label>
                      <input 
                        required
                        type="number" 
                        value={newCoupon.discount_percent} 
                        onChange={e => setNewCoupon({...newCoupon, discount_percent: parseInt(e.target.value)})}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" 
                        placeholder="10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Max Uses</label>
                      <input 
                        required
                        type="number" 
                        value={newCoupon.max_uses} 
                        onChange={e => setNewCoupon({...newCoupon, max_uses: parseInt(e.target.value)})}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" 
                        placeholder="100" 
                      />
                    </div>
                  </div>

                  <button 
                    disabled={saving}
                    type="submit" 
                    className="w-full py-4 bg-tcg-green text-black font-black uppercase text-xs tracking-widest rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="animate-spin" /> : <Plus size={18} />} Generate Key
                  </button>
                  {msg && <p className="text-center text-[10px] font-black text-tcg-green animate-pulse uppercase tracking-[0.2em]">{msg}</p>}
                </form>

                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-display text-xl font-black uppercase tracking-tight text-white mb-6">Active Keys</h3>
                  <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[600px] pr-2">
                    {coupons.map(coupon => (
                      <div key={coupon.id} className="card-premium p-6 border-white/5 flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-full bg-tcg-green/10 flex items-center justify-center text-tcg-green font-black text-lg">
                              {coupon.discount_percent}%
                           </div>
                           <div>
                              <div className="font-display text-xl font-black text-white uppercase tracking-tighter">{coupon.code}</div>
                              <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.1em] flex gap-3">
                                 <span>Used: {coupon.used_count}/{coupon.max_uses}</span>
                                 <span>Status: {coupon.is_active ? 'ENABLED' : 'DISABLED'}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <button 
                              onClick={async () => {
                                const { error } = await supabase.from('coupons').update({ is_active: !coupon.is_active }).eq('id', coupon.id);
                                if (!error) setCoupons(c => c.map(x => x.id === coupon.id ? { ...x, is_active: !coupon.is_active } : x));
                              }}
                              className="text-[9px] font-black uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded hover:border-tcg-green transition-all"
                            >
                              Toggle
                           </button>
                           <button onClick={() => deleteCoupon(coupon.id)} className="text-white/20 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                           </button>
                        </div>
                      </div>
                    ))}
                    {coupons.length === 0 && <div className="py-20 text-center text-white/20 uppercase text-xs font-black tracking-widest">No promo keys generated</div>}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
              <div className="mb-10">
                <h1 className="font-display text-4xl uppercase font-black tracking-tighter mb-2">System Config</h1>
                <p className="font-body text-sm text-white/40">Adjust base parameters for payment flows and global visibility.</p>
              </div>
              
              <div className="card-premium p-8">
                <form onSubmit={updateSettings} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Primary UPI ID</label>
                      <input 
                        type="text" 
                        value={settings.upiId} 
                        onChange={e => setSettings({...settings, upiId: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" 
                        placeholder="9426961086@ptsbi" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">QR Code URL</label>
                      <input 
                        type="text" 
                        value={settings.qrUrl} 
                        onChange={e => setSettings({...settings, qrUrl: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" 
                        placeholder="https://i.ibb.co/..." 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Support WhatsApp Number</label>
                      <input 
                        type="text" 
                        value={settings.whatsappNumber} 
                        onChange={e => setSettings({...settings, whatsappNumber: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" 
                        placeholder="919876543210" 
                      />
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/70 block">Maintenance Mode</label>
                        <p className="text-[9px] text-white/30 uppercase font-bold">Disable all payments immediately</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSettings({...settings, maintenance: !settings.maintenance})}
                        className={cn("w-12 h-6 rounded-full transition-all relative", settings.maintenance ? "bg-red-500" : "bg-white/10")}
                      >
                         <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", settings.maintenance ? "right-1" : "left-1")} />
                      </button>
                    </div>
                  </div>

                  <button 
                    disabled={saving}
                    type="submit" 
                    className="w-full py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-tcg-green transition-all flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="animate-spin" /> : <SettingsIcon size={18} />} Update Engine
                  </button>
                  {msg && <p className="text-center text-[10px] font-black text-tcg-green animate-pulse uppercase tracking-[0.2em]">{msg}</p>}
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
