import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="pt-40 pb-32 max-w-4xl mx-auto px-6">
        <h1 className="font-display text-5xl font-black uppercase tracking-tighter mb-12 text-tcg-green">Privacy <span className="text-white">Policy.</span></h1>
        
        <div className="prose prose-invert max-w-none font-body text-white/60 space-y-8">
          <section>
            <h2 className="text-white text-2xl font-bold uppercase mb-4">1. Data Collection</h2>
            <p>At The Capital Guru (TCG), we collect minimal data required to provide our institutional signal services. This includes your name, email address, and transaction logs. We do not store your financial details or UPI credentials; these are processed securely by your respective banking apps.</p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold uppercase mb-4">2. Use of Information</h2>
            <p>Your information is used strictly for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verifying your subscription status.</li>
              <li>Providing access to the private Telegram channels.</li>
              <li>Sending technical updates and critical market alerts.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold uppercase mb-4">3. Security</h2>
            <p>We employ 256-bit SSL encryption for all data transmissions. Our internal systems are audited regularly to prevent unauthorized access. User data is never sold or shared with third-party marketing firms.</p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold uppercase mb-4">4. Compliance</h2>
            <p>We comply with the Information Technology Act, 2000 (India) and relevant data protection guidelines. Users have the right to request deletion of their data at any time by contacting mahir@thecapitalguru.net.</p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
