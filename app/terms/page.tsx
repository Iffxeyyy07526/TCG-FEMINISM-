import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Terms of Service | The Capital Guru',
  description: 'Legal terms and conditions for using The Capital Guru platform.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-40 pb-24 max-w-4xl mx-auto px-6">
        <h1 className="font-display text-5xl md:text-7xl font-black mb-12 uppercase tracking-tighter">Terms of <span className="text-tcg-green">Service.</span></h1>
        
        <div className="space-y-12 font-body text-white/70 leading-relaxed text-lg">
          <section>
            <h2 className="text-white text-2xl font-bold mb-4 uppercase tracking-wider">1. Acceptance of Terms</h2>
            <p>
              By accessing and using The Capital Guru (&quot;Platform&quot;), you agree to the following terms and conditions. If you do not agree to these terms, please do not use the Platform. All signals and market insights provided are for information purposes.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-4 uppercase tracking-wider">2. Nature of Service</h2>
            <p>
              The Capital Guru provides educational market analysis and research setups. We are NOT SEBI registered investment advisors. Our content is provided as independent research for educational and informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-4 uppercase tracking-wider">3. Subscription & Payments</h2>
            <p>
              All subscriptions are final. Access to the premium signal floor and Telegram channel is granted only after manual or automated payment verification. We reserve the right to revoke access if any prohibited activities (like signal sharing or piracy) are detected.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-4 uppercase tracking-wider">4. Signal Sharing Policy</h2>
            <p>
              Your subscription is for your personal use only. Sharing signals, credentials, or re-broadcasting our intellectual property in external groups will result in immediate termination of access without refund and possible legal action under Indian Copyright and IP laws.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-4 uppercase tracking-wider">5. Jurisdiction</h2>
            <p>
              Any disputes arising from the use of this Platform shall be subject to the exclusive jurisdiction of the courts of Mumbai, India.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
