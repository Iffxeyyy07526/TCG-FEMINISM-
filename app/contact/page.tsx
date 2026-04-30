import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col selection:bg-tcg-green/30 selection:text-tcg-green">
      <Navbar />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-tcg-green opacity-[0.08] blur-[120px]" />
      </div>
      
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-2xl">
          <h1 className="font-display text-6xl md:text-8xl uppercase tracking-wider mb-6">Contact <span className="text-tcg-green">Us</span></h1>
          <p className="font-body text-lg text-white/60 mb-12 leading-relaxed">
            Have questions about our signals, plans, or platform? Drop us a message and our support team will get back to you within 24 hours.
          </p>
          
          <div className="space-y-6 hidden lg:block">
             <div className="flex items-center gap-4 text-white/70">
                <div className="w-12 h-12 rounded-full bg-tcg-green/10 flex items-center justify-center text-tcg-green border border-tcg-green/20">✉</div>
                <div>
                   <div className="font-body text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Email Us</div>
                   <div className="font-body">mahir@thecapitalguru.net</div>
                </div>
             </div>
             <div className="flex items-center gap-4 text-white/70">
                <div className="w-12 h-12 rounded-full bg-tcg-green/10 flex items-center justify-center text-tcg-green border border-tcg-green/20">📱</div>
                <div>
                   <div className="font-body text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Community Support</div>
                   <div className="font-body text-tcg-green hover:underline cursor-pointer">@TheCapitalGuruSupport</div>
                </div>
             </div>
          </div>
        </div>

        <form className="space-y-6 card-premium p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-xs uppercase text-white/50 tracking-widest block mb-2">Name</label>
              <input type="text" className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm focus:border-tcg-green outline-none transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="font-body text-xs uppercase text-white/50 tracking-widest block mb-2">Email</label>
              <input type="email" className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm focus:border-tcg-green outline-none transition-colors" placeholder="johndoe@email.com" />
            </div>
          </div>
          <div>
              <label className="font-body text-xs uppercase text-white/50 tracking-widest block mb-2">Subject</label>
              <input type="text" className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm focus:border-tcg-green outline-none transition-colors" placeholder="How can we help?" />
          </div>
          <div>
            <label className="font-body text-xs uppercase text-white/50 tracking-widest block mb-2">Message</label>
            <textarea rows={5} className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm focus:border-tcg-green outline-none transition-colors align-top" placeholder="Your message here..."></textarea>
          </div>
          <button type="button" className="w-full px-6 py-4 text-xs font-bold text-black bg-tcg-green rounded-xl tracking-widest hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all uppercase mt-2">Send Message</button>
        </form>
      </section>

      <Footer />
    </main>
  );
}
