import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Disclaimer | The Capital Guru',
  description: 'Important legal disclaimer regarding trading risks and SEBI status.',
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-40 pb-24 max-w-4xl mx-auto px-6">
        <h1 className="font-display text-5xl md:text-7xl font-black mb-12 uppercase tracking-tighter">Legal <span className="text-tcg-green">Disclaimer.</span></h1>
        
        <div className="space-y-12 font-body text-white/70 leading-relaxed text-lg">
          <section className="p-8 bg-red-500/5 border border-red-500/20 rounded-3xl">
            <h2 className="text-red-500 text-2xl font-bold mb-4 uppercase tracking-wider">Trading Risk Warning</h2>
            <p>
              Stock market trading involves significant risk of loss and is not suitable for everyone. Past performance is no guarantee of future results. You should only trade with money you can afford to lose.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-4 uppercase tracking-wider">SEBI Non-Registration</h2>
            <p>
              The Capital Guru is NOT a SEBI (Securities and Exchange Board of India) registered investment advisor or research analyst. We provide educational research based on technical and quant models. We do not provide personalized financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-4 uppercase tracking-wider">No Guarantee of Results</h2>
            <p>
              While we maintain a high historical accuracy, there is absolutely no guarantee that the signals provided will result in profit. Market conditions can change rapidly, and signals may hit stop-losses. We are not responsible for any financial losses incurred using our research.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-4 uppercase tracking-wider">Execution Risk</h2>
            <p>
              The speed of execution is critical in F&O trading. Delays in Telegram delivery, internet connectivity, or broker terminal issues are outside our control. You should use a fast broker and maintain your own discipline.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-body font-bold mb-4 uppercase tracking-wider text-tcg-green">Consult Your Financial Advisor</h2>
            <p>
              Before making any investment decisions, please consult with a qualified, SEBI registered financial advisor to understand your risk profile and suitability.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
