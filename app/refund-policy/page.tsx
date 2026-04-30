import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="pt-40 pb-32 max-w-4xl mx-auto px-6">
        <h1 className="font-display text-5xl font-black uppercase tracking-tighter mb-12 text-tcg-green">Refund <span className="text-white">Policy.</span></h1>
        
        <div className="prose prose-invert max-w-none font-body text-white/60 space-y-8">
          <p className="text-xl font-bold text-white uppercase italic">Strict No-Refund Policy</p>
          
          <section>
            <h2 className="text-white text-2xl font-bold uppercase mb-4">1. Digital Nature of Service</h2>
            <p>Our signals and market flow maps are purely digital information products providing real-time data. Once access is granted to the Command Center (Dashboard) or Telegram community, the value of the service is consumed immediately.</p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold uppercase mb-4">2. Non-Refundable Transactions</h2>
            <p>All payments made to The Capital Guru (TCG) are <strong>final and non-refundable</strong>. We do not provide credits, refunds, or prorated billing for subscriptions that are cancelled mid-term.</p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold uppercase mb-4">3. Subscription Cancellation</h2>
            <p>You can cancel your subscription at any time to prevent future billing. Upon cancellation, you will retain access to the signals until the end of your current billing cycle.</p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold uppercase mb-4">4. Exceptions</h2>
            <p>In rare cases of duplicate billing or technical errors on our side, please contact mahir@thecapitalguru.net with valid transaction proof for a manual review.</p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
