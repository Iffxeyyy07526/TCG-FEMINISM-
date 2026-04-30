import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="pt-40 pb-32 max-w-4xl mx-auto px-6">
        <h1 className="font-display text-5xl font-black uppercase tracking-tighter mb-12 text-tcg-green">Cookies <span className="text-white">Notice.</span></h1>
        
        <div className="prose prose-invert max-w-none font-body text-white/60 space-y-8">
          <p>This website uses cookies to enhance your trading experience. By continuing to use the terminal, you agree to our use of cookies.</p>

          <section>
            <h2 className="text-white text-2xl font-bold uppercase mb-4">1. What are cookies?</h2>
            <p>Cookies are small text files stored on your device that help us remember your session, preferences, and login status. They are essential for the &quot;Command Center&quot; (Dashboard) to function correctly.</p>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold uppercase mb-4">2. Types of Cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for secure login and account access.</li>
              <li><strong>Preference Cookies:</strong> Remember your theme settings or display filters.</li>
              <li><strong>Analytical Cookies:</strong> Help us understand how users interact with our signal stream to improve performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold uppercase mb-4">3. Management</h2>
            <p>You can disable cookies in your browser settings; however, certain parts of the Capital Guru terminal may become inaccessible or malfunction as a result.</p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
