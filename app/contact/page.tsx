'use client';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Mail, MessageCircle, Globe, Send } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col">
      <Navbar />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-tcg-green/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-tcg-green/[0.02] blur-[120px]" />
      </div>
      
      <section className="pt-40 pb-24 relative z-10 flex-1 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-tcg-green bg-tcg-green/5 px-4 py-2 rounded-full border border-tcg-green/10 mb-8 inline-flex">
              SUPPORT TERMINAL
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
              Let&apos;s <br/>
              <span className="text-tcg-green text-glow">Connect.</span>
            </h1>
            <p className="font-body text-xl text-white/40 mb-16 leading-relaxed font-medium lowercase tracking-tight">
              our systems are active 24/7. for payment verification, technical queries, or institutional partnership requests, use the digital channels below.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-tcg-green border border-white/5 group-hover:bg-tcg-green group-hover:text-black transition-all duration-500 shadow-xl group-hover:shadow-tcg-green/20">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30 font-black mb-1">Direct Inquiries</div>
                  <div className="font-display text-xl font-black text-white group-hover:text-tcg-green transition-colors uppercase tracking-tight">mahir@thecapitalguru.net</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-tcg-green border border-white/5 group-hover:bg-tcg-green group-hover:text-black transition-all duration-500 shadow-xl group-hover:shadow-tcg-green/20">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <div className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30 font-black mb-1">Telegram Node</div>
                  <div className="font-display text-xl font-black text-white group-hover:text-tcg-green transition-colors uppercase tracking-tight">@TheCapitalGuruSupport</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-tcg-green border border-white/5 group-hover:bg-tcg-green group-hover:text-black transition-all duration-500 shadow-xl group-hover:shadow-tcg-green/20">
                  <Globe size={24} />
                </div>
                <div>
                  <div className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30 font-black mb-1">Global HQ</div>
                  <div className="font-display text-xl font-black text-white group-hover:text-tcg-green transition-colors uppercase tracking-tight">Mumbai, Maharashtra, IN</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form className="space-y-6 card-premium p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-tcg-green/5 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all group-hover:scale-125"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="font-body text-[10px] uppercase text-white/30 tracking-[0.2em] font-black block">Identity Name</label>
                  <input type="text" className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-4 font-body text-white text-sm focus:border-tcg-green/50 focus:bg-white/[0.05] outline-none transition-all" placeholder="Rahul Singh" />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-[10px] uppercase text-white/30 tracking-[0.2em] font-black block">Digital Email</label>
                  <input type="email" className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-4 font-body text-white text-sm focus:border-tcg-green/50 focus:bg-white/[0.05] outline-none transition-all" placeholder="rahul@example.com" />
                </div>
              </div>
              
              <div className="space-y-2 relative z-10">
                  <label className="font-body text-[10px] uppercase text-white/30 tracking-[0.2em] font-black block">Subject Terminal</label>
                  <input type="text" className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-4 font-body text-white text-sm focus:border-tcg-green/50 focus:bg-white/[0.05] outline-none transition-all" placeholder="How can we assist?" />
              </div>
              
              <div className="space-y-2 relative z-10">
                <label className="font-body text-[10px] uppercase text-white/30 tracking-[0.2em] font-black block">Transmission Content</label>
                <textarea rows={6} className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-4 font-body text-white text-sm focus:border-tcg-green/50 focus:bg-white/[0.05] outline-none transition-all align-top resize-none" placeholder="Enter your detailed message here..."></textarea>
              </div>
              
              <button type="button" className="btn-primary w-full py-5 text-sm font-black relative z-10 group overflow-hidden">
                <span className="flex items-center justify-center gap-3">
                  INITIATE TRANSMISSION <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
