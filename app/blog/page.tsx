import Link from 'next/link';
import { getFullBlogData } from '@/lib/blog-data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Trading Insights & Strategies | The Capital Guru Blog',
  description: 'Learn professional trading strategies, risk management, and market insights from institutional traders at The Capital Guru.',
};

export default function BlogIndex() {
  const blogs = getFullBlogData();

  return (
    <main className="min-h-screen bg-tcg-black text-white relative overflow-hidden">
      <Navbar />
      
      {/* Background FX */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tcg-green/5 blur-[150px] rounded-full hidden md:block"></div>
      </div>

      <div className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-7xl uppercase text-tcg-green mb-6 leading-none">Market Insights <br/><span className="text-white">& Strategies</span></h1>
            <p className="font-body text-white/70 max-w-2xl mx-auto">Master the markets with institutional-grade knowledge, trading psychological breakdowns, and high-probability setups.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group block">
                <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 h-full hover:border-tcg-green/50 transition-colors shadow-none hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-white/5 rounded text-[10px] uppercase tracking-widest text-white/50 border border-white/10 group-hover:border-tcg-green/30 group-hover:text-tcg-green transition-colors">{blog.searchIntent}</div>
                  </div>
                  <h2 className="font-display text-2xl uppercase mb-3 line-clamp-2 group-hover:text-tcg-green transition-colors">{blog.title}</h2>
                  <p className="font-body text-sm text-white/50 line-clamp-3 mb-6 flex-1">{blog.metaDescription}</p>
                  <div className="font-bold text-xs uppercase tracking-widest text-tcg-green flex items-center gap-2">Read Strategy <span>&rarr;</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      <Footer />
    </main>
  );
}
