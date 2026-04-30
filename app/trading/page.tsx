import Link from 'next/link';
import { seoPagesData } from '@/lib/seo-data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { LiveBadge } from '@/components/ui/live-badge';
import * as motion from 'motion/react-client';

export const metadata = {
  title: 'Trading Hub | Institutional Grade Intelligence',
  description: 'Explore hundreds of trading strategies, signals, and insights tailored for the Indian Stock Market and global exchanges.',
  alternates: {
    canonical: 'https://thecapitalguru.net/trading',
  }
};

export default function TradingHubIndex() {
  // Group by primary keyword for pillar structure
  const groupedPages = seoPagesData.reduce((acc, page) => {
    if (!acc[page.primary]) {
      acc[page.primary] = [];
    }
    acc[page.primary].push(page);
    return acc;
  }, {} as Record<string, typeof seoPagesData>);

  const categories = Object.keys(groupedPages);

  return (
    <main className="min-h-screen bg-tcg-black text-white relative overflow-hidden">
      <Navbar />
      {/* Background FX */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tcg-green/5 blur-[150px] rounded-full hidden md:block"></div>
      </div>
      
      <div className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <LiveBadge text="MARKET INTEL INDEX" className="mx-auto mb-8" />
            <h1 className="font-display text-6xl md:text-8xl font-black uppercase text-white mb-8 tracking-tighter leading-none">
              Trading <span className="text-tcg-green">Hub.</span>
            </h1>
            <p className="font-body text-xl text-white/50 max-w-2xl mx-auto font-medium">Navigating the complexities of the market with precision-engineered research hubs.</p>
          </motion.div>

          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category} className="border border-white/10 bg-[#0F0F0F] rounded-2xl p-8">
                <h2 className="font-display text-3xl uppercase text-white mb-2 border-b border-white/10 pb-4">{category}</h2>
                <p className="text-sm text-white/50 mb-8 uppercase tracking-widest font-bold">Pillar Hub &bull; {groupedPages[category].length} Resources</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedPages[category].slice(0, 15).map(page => (
                    <Link key={page.slug} href={`/trading/${page.slug}`} className="block bg-black/50 border border-white/5 hover:border-tcg-green/30 p-4 rounded-xl transition-colors group">
                      <h3 className="font-bold text-sm text-white/90 group-hover:text-tcg-green transition-colors">{page.title}</h3>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[9px] px-2 py-1 bg-white/5 rounded uppercase tracking-widest text-white/50">{page.format}</span>
                        <span className="text-[9px] px-2 py-1 bg-white/5 rounded uppercase tracking-widest text-white/50">{page.location}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                {groupedPages[category].length > 15 && (
                  <div className="mt-6 pt-6 border-t border-white/10 text-center">
                    <span className="text-xs uppercase tracking-widest text-tcg-green font-bold">+{groupedPages[category].length - 15} more highly targeted variations available in the index.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      <Footer />
    </main>
  );
}
