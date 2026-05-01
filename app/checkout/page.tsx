'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Loader2, ArrowRight, CheckCircle2, ShieldCheck, QrCode, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const PLANS = {
  starter: { name: 'Starter', price: '₹2,499' },
  pro: { name: 'Pro', price: '₹11,999' },
  elite: { name: 'Elite', price: '₹19,999' }
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planKey = (searchParams.get('plan') || 'pro') as keyof typeof PLANS;
  const currentPlan = PLANS[planKey] || PLANS.pro;
  
  const [step, setStep] = useState(1);
  const [settings, setSettings] = useState<{ upiId: string; qrUrl: string; maintenance: boolean; whatsappNumber?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function initCheckout() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // If not logged in, redirect to login but keep the plan
          router.push(`/login?redirect=/checkout&plan=${planKey}`);
          return;
        }

        setFormData({
            fullName: user.user_metadata?.full_name || '',
            email: user.email || '',
            whatsapp: user.user_metadata?.whatsapp || ''
        });

        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            setSettings(data);
        } catch (e) {
            console.error('Settings fetch error:', e);
            setSettings({ upiId: 'mahir@okaxis', qrUrl: 'https://i.ibb.co/S7mZ5dC/qr.png', maintenance: false, whatsappNumber: '919876543210' });
        }
        setLoading(false);
    }
    initCheckout();
  }, [router, planKey]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-tcg-green font-mono">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="uppercase tracking-widest text-[10px] font-black">Building Secure Pipeline...</p>
      </div>
    );
  }

  if (settings?.maintenance) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
        <div className="max-w-sm glass p-12 rounded-[2.5rem] border border-white/10">
          <div className="text-6xl mb-8">⚡</div>
          <h1 className="font-display text-4xl mb-4 text-white uppercase tracking-tighter">Gateway Offline</h1>
          <p className="font-body text-white/40 text-sm mb-8">Our payment processors are currently undergoing high-load maintenance. Please contact support via WhatsApp.</p>
          <a href={`https://wa.me/${settings.whatsappNumber}`} className="btn-primary w-full py-4 text-xs font-black uppercase tracking-widest block">Contact Support</a>
        </div>
      </div>
    );
  }

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Persist details to Supabase profile
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({ 
            full_name: formData.fullName,
            whatsapp_number: formData.whatsapp 
          })
          .eq('id', user.id);
      }
    } catch (err) {
      console.error('Failed to update profile during checkout:', err);
    }

    if (step === 2) {
      // Send Payment Initiated Email
      try {
        await fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'payment-initiated',
            email: formData.email,
            data: { plan: currentPlan.name, price: currentPlan.price }
          })
        });
      } catch (err) {
        console.error('Payment email failed:', err);
      }
    }
    setStep(step + 1);
  };

  const handleFinalize = () => {
    const num = settings?.whatsappNumber || '919876543210';
    const msg = encodeURIComponent(`TCG Payment Confirmation\nPlan: ${currentPlan.name}\nName: ${formData.fullName}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\n\nI have completed the payment. Here is the screenshot:`);
    window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-black py-20 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-tcg-green/5 blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 relative z-10">
        
        {/* Left Side: Steps */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-12">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm border-2 transition-all", step >= 1 ? "bg-tcg-green border-tcg-green text-black" : "border-white/10 text-white/20")}>1</div>
            <div className="h-[2px] w-8 bg-white/10"></div>
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm border-2 transition-all", step >= 2 ? "bg-tcg-green border-tcg-green text-black" : "border-white/10 text-white/20")}>2</div>
            <div className="h-[2px] w-8 bg-white/10"></div>
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm border-2 transition-all", step >= 3 ? "bg-tcg-green border-tcg-green text-black" : "border-white/10 text-white/20")}>3</div>
          </div>

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <h2 className="font-display text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">Confirm <br/><span className="text-tcg-green">Your Details.</span></h2>
              <p className="font-body text-white/40 mb-10 max-w-sm uppercase text-[10px] tracking-[0.2em] font-bold">Ensure this information is accurate for account activation.</p>
              
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="space-y-4">
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-tcg-green transition-colors block mb-2">Trader Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-body focus:border-tcg-green outline-none transition-all"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-tcg-green transition-colors block mb-2">Institutional Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-body focus:border-tcg-green outline-none transition-all"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-tcg-green transition-colors block mb-2">WhatsApp Number (For Alerts)</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.whatsapp}
                      onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-body focus:border-tcg-green outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                
                <button type="submit" className="btn-primary w-full py-6 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3">
                  Continue to Payment <ArrowRight size={18} />
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500 text-center lg:text-left">
              <h2 className="font-display text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">Scan & <br/><span className="text-tcg-green text-glow">Authorize.</span></h2>
              <p className="font-body text-white/40 mb-12 max-w-sm uppercase text-[10px] tracking-[0.2em] font-bold">Complete transaction via any UPI application.</p>
              
              <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
                <div className="bg-white p-6 rounded-[2rem] shadow-[0_0_50px_rgba(57,255,20,0.15)] relative group overflow-hidden">
                  <Image unoptimized src={settings?.qrUrl || 'https://i.ibb.co/S7mZ5dC/qr.png'} alt="Payment QR" width={240} height={240} className="rounded-lg mix-blend-multiply transition-transform group-hover:scale-105 duration-500" />
                  <div className="absolute inset-0 bg-tcg-green/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="space-y-6 flex-1 text-center lg:text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block">Unified Payments Interface ID</label>
                    <div className="font-mono text-xl text-tcg-green font-bold bg-white/5 border border-white/10 py-4 px-6 rounded-2xl break-all">
                      {settings?.upiId}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <p className="text-[9px] font-black text-white/30 uppercase mb-1">Payable</p>
                      <p className="font-display text-2xl font-black text-white">{currentPlan.price}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <p className="text-[9px] font-black text-white/30 uppercase mb-1">Validity</p>
                      <p className="font-display text-2xl font-black text-white">{planKey === 'starter' ? '30 Days' : planKey === 'pro' ? '6 Months' : '1 Year'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setStep(1)} className="glass-light px-8 py-5 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10">Modify Info</button>
                <button onClick={() => setStep(3)} className="btn-primary flex-1 py-5 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 group">
                   Confirm Payment Done <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
               <div className="w-20 h-20 bg-tcg-green/10 rounded-full flex items-center justify-center text-tcg-green mb-8 shadow-[0_0_40px_rgba(57,255,20,0.15)]">
                 <CheckCircle2 size={40} />
               </div>
               <h2 className="font-display text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">Finalize <br/><span className="text-tcg-green">The Bridge.</span></h2>
               <p className="font-body text-white/40 mb-10 max-w-md text-sm leading-relaxed">
                 To activate your institutional access, click the button below to send your payment screenshot to Mahir on WhatsApp. Our team will review and approve your account within 30 minutes.
               </p>

               <div className="space-y-6">
                 <button 
                  onClick={handleFinalize}
                  className="w-full py-6 bg-[#25D366] text-white text-base font-black uppercase tracking-widest rounded-2xl shadow-[0_20px_50px_rgba(37,211,102,0.2)] hover:scale-[1.02] transition-all flex items-center justify-center gap-4 group">
                    <MessageSquare size={24} className="fill-white/20" /> Send Screenshot to WhatsApp
                 </button>
                 <Link href="/dashboard" className="block text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">Return to Waiting Room</Link>
               </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in zoom-in duration-500 text-center lg:text-left">
               <h2 className="font-display text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none pt-12">Session <br/><span className="text-tcg-green">Synchronized.</span></h2>
               <p className="font-body text-white/40 mb-12 max-w-sm text-sm">Your activation request has been logged. Please check your WhatsApp/Dashboard for the approval confirmation.</p>
               <Link href="/dashboard" className="btn-primary inline-flex px-12 py-5 text-xs font-black uppercase tracking-widest rounded-xl">Enter Dashboard</Link>
            </div>
          )}
        </div>

        {/* Right Side: Summary Card */}
        <div className="lg:sticky lg:top-32 h-fit">
          <div className="card-premium p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-white/5 -rotate-12 pointer-events-none">
              <ShieldCheck size={120} />
            </div>
            
            <div className="mb-8">
              <h4 className="text-[10px] font-black text-tcg-green uppercase tracking-[0.3em] mb-2">Selected Intelligence</h4>
              <h3 className="font-display text-4xl font-black text-white uppercase tracking-tight">{currentPlan.name} Tier</h3>
            </div>

            <div className="space-y-4 mb-10">
               <div className="flex justify-between items-center py-3 border-b border-white/5">
                 <span className="text-white/40 font-body text-xs uppercase font-bold">Access Level</span>
                 <span className="text-white font-mono text-xs uppercase font-black">{planKey === 'starter' ? 'Standard' : planKey === 'pro' ? 'Advanced' : 'Unlimited'}</span>
               </div>
               <div className="flex justify-between items-center py-3 border-b border-white/5">
                 <span className="text-white/40 font-body text-xs uppercase font-bold">Network Status</span>
                 <span className="text-tcg-green font-mono text-xs uppercase font-black">ENCRYPTED</span>
               </div>
               <div className="flex justify-between items-center py-3 border-b border-white/5">
                 <span className="text-white/40 font-body text-xs uppercase font-bold">Setup Fee</span>
                 <span className="text-white font-mono text-xs uppercase font-black">WAIVED</span>
               </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mb-8">
               <div className="flex justify-between items-end">
                 <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1 block">Total Due</span>
                 <span className="font-display text-4xl font-black text-tcg-green text-glow">{currentPlan.price}</span>
               </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-tcg-green/5 p-4 rounded-xl border border-tcg-green/20">
                <ShieldCheck size={16} className="text-tcg-green shrink-0 mt-0.5" />
                <p className="text-[10px] text-tcg-green font-bold uppercase tracking-tight leading-relaxed">Secure gateway protected by 256-bit institutional encryption.</p>
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-center text-[10px] font-black text-white/20 uppercase tracking-widest">
            Need Help? <Link href="/contact" className="text-tcg-green hover:underline">Contact Intelligence Core</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-tcg-green font-mono">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="uppercase tracking-widest text-[10px] font-black">Initializing Secure Frame...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
