'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [settings, setSettings] = useState({ upiId: '', qrUrl: '', maintenance: false, whatsappNumber: '' });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [pendingPayments, setPendingPayments] = useState<{id: number, name: string, plan: string, status: string, date: string}[]>([]);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings({ 
        upiId: data.upiId || '', 
        qrUrl: data.qrUrl || '', 
        maintenance: data.maintenance || false,
        whatsappNumber: data.whatsappNumber || ''
      });
      setPendingPayments(data.pendingPayments || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Check local storage for session
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('tcg_admin') === 'true') {
        const checkAuth = async () => {
          setIsAuthenticated(true);
          await fetchSettings();
        };
        checkAuth();
      } else {
        const setLoad = async () => setLoading(false);
        setLoad();
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'mahir@thecapitalguru.net' && password === 'IftekharXmahir') {
      localStorage.setItem('tcg_admin', 'true');
      setIsAuthenticated(true);
      setLoading(true);
      fetchSettings();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tcg_admin');
    setIsAuthenticated(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      setMsg('Settings updated successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (e) {
      setMsg('Failed to save settings.');
    }
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen bg-black text-tcg-green flex items-center justify-center font-mono">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none fixed">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="w-full max-w-sm bg-[#0F0F0F] rounded-2xl border border-white/10 p-8 z-10">
          <h1 className="font-display text-2xl uppercase mb-6 text-center text-tcg-green">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-white/50 block mb-1">Admin Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" placeholder="admin@domain.com" />
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-white/50 block mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-tcg-green outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full px-6 py-3 text-xs font-bold text-black bg-tcg-green rounded-lg tracking-widest uppercase hover:bg-tcg-green/80 transition-colors mt-4">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>
      
      <nav className="border-b border-white/10 bg-[#0F0F0F] px-6 py-4 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-tcg-green flex items-center justify-center text-black font-display font-bold text-xl">CG</div>
          <span className="font-display text-xl tracking-widest uppercase hidden sm:block">Admin Console</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" target="_blank" className="text-xs uppercase tracking-widest text-tcg-green hover:underline">View Site</Link>
          <button onClick={handleLogout} className="text-xs uppercase tracking-widest text-red-500 hover:text-red-400">Logout</button>
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full z-10">
        <h1 className="font-display text-4xl uppercase mb-2">Global Settings</h1>
        <p className="font-body text-sm text-white/50 mb-10">Real-time configuration for the platform.</p>

        <form onSubmit={handleSave} className="space-y-6 bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <h2 className="font-display text-xl uppercase text-white">Maintenance Mode</h2>
              <p className="font-body text-xs text-white/50 mt-1">If enabled, the checkout page will show a maintenance message.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={settings.maintenance} onChange={e => setSettings({...settings, maintenance: e.target.checked})} className="sr-only peer" />
              <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-tcg-green"></div>
            </label>
          </div>

          <div className="space-y-4 pt-2">
            <h2 className="font-display text-xl uppercase text-white">Payment Gateway (UPI)</h2>
            
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-white/50 block mb-2">UPI ID</label>
              <input type="text" value={settings.upiId} onChange={e => setSettings({...settings, upiId: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 font-mono text-white text-sm focus:border-tcg-green outline-none transition-colors" placeholder="e.g. name@upi" />
              <p className="text-[10px] text-white/30 mt-1">Leave empty to force maintenance mode on checkout.</p>
            </div>

            <div>
              <label className="font-body text-xs uppercase tracking-widest text-white/50 block mb-2">UPI QR Code URL</label>
              <input type="text" value={settings.qrUrl} onChange={e => setSettings({...settings, qrUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 font-mono text-white text-sm focus:border-tcg-green outline-none transition-colors" placeholder="https://..." />
              <p className="text-[10px] text-white/30 mt-1">URL to the image containing the QR code.</p>
            </div>

            {settings.qrUrl && (
              <div className="mt-4 p-4 border border-white/10 rounded-lg inline-block bg-white/5">
                <Image unoptimized src={settings.qrUrl} alt="QR Preview" width={128} height={128} className="w-32 h-32 object-contain mix-blend-screen" />
              </div>
            )}

            <div className="pt-4">
              <label className="font-body text-xs uppercase tracking-widest text-white/50 block mb-2">WhatsApp Support Number</label>
              <input type="text" value={settings.whatsappNumber} onChange={e => setSettings({...settings, whatsappNumber: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 font-mono text-white text-sm focus:border-tcg-green outline-none transition-colors" placeholder="e.g. 919876543210" />
              <p className="text-[10px] text-white/30 mt-1">Include country code without &apos;+&apos; or &apos;00&apos;. Users will send payment screenshots here.</p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
            <div className="text-tcg-green text-xs font-bold">{msg}</div>
            <button disabled={saving} type="submit" className="px-8 py-3 text-xs font-bold text-black bg-tcg-green rounded-xl tracking-widest uppercase hover:bg-tcg-green/80 transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>

        <h2 className="font-display text-2xl uppercase mt-16 mb-6">Pending Payments</h2>
        <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {pendingPayments.length === 0 ? (
            <div className="p-8 text-center text-white/50 text-sm font-body">No pending payments.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-white/50 uppercase tracking-widest text-[10px]">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingPayments.map(payment => (
                    <tr key={payment.id} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-bold">{payment.name}</td>
                      <td className="px-6 py-4">{payment.plan}</td>
                      <td className="px-6 py-4 text-white/50">{payment.date}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded bg-[#25D366]/20 text-[#25D366] text-xs font-bold uppercase tracking-widest">{payment.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setPendingPayments(p => p.filter(x => x.id !== payment.id))}
                          className="px-4 py-2 bg-tcg-green text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-tcg-green/80 transition-colors">
                          Confirm & Send Invites
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
