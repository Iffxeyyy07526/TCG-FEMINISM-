import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSeoPageBySlug, seoPagesData } from '@/lib/seo-data';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export async function generateStaticParams() {
  return seoPagesData.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const pageData = getSeoPageBySlug(resolvedParams.slug);

  if (!pageData) {
    return {};
  }

  const metaDesc = `Looking for the ${pageData.keyword}? Discover our complete ${pageData.format} for finding the most reliable ${pageData.primary} ${pageData.location} to maximize your ROI.`;

  return {
    title: `${pageData.title} | The Capital Guru`,
    description: metaDesc,
    alternates: {
      canonical: `https://thecapitalguru.net/trading/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${pageData.title} | The Capital Guru`,
      description: metaDesc,
      url: `https://thecapitalguru.net/trading/${resolvedParams.slug}`,
      type: 'article',
    },
  };
}

export default async function ProgrammaticSeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pageData = getSeoPageBySlug(resolvedParams.slug);

  if (!pageData) {
    notFound();
  }

  // Find some related pages for internal linking
  const relatedPages = seoPagesData
    .filter(p => p.primary === pageData.primary && p.slug !== pageData.slug)
    .slice(0, 5);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: pageData.title,
      description: `A comprehensive ${pageData.format} on ${pageData.keyword}.`,
      author: {
        '@type': 'Organization',
        name: 'The Capital Guru',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Capital Guru',
        logo: {
          '@type': 'ImageObject',
          url: 'https://i.ibb.co/1Gbm0Csd/main-logo.jpg',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What makes the ${pageData.keyword} different from others?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `The key difference for ${pageData.primary} lies in institutional-grade analysis, real-time delivery, and proven risk-to-reward metrics specific to markets ${pageData.location}.`
          }
        },
        {
          '@type': 'Question',
          name: `How can I get started with ${pageData.primary}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `You can start immediately by subscribing to our premium channel, which provides real-time alerts tailored ${pageData.modifier}.`
          }
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-tcg-black text-white relative overflow-hidden">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Background FX */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tcg-green/5 blur-[150px] rounded-full hidden md:block"></div>
      </div>

      <div className="pt-32 pb-16 md:pt-40 md:pb-24 max-w-4xl mx-auto px-6 relative z-10">
          <div className="mb-6">
            <Link href="/trading" className="text-xs uppercase tracking-widest text-tcg-green hover:underline">
              &larr; Trading Hub
            </Link>
          </div>

          <h1 className="font-display text-4xl md:text-6xl uppercase text-tcg-green mb-6 leading-tight">
            {pageData.title}
          </h1>

          <div className="font-body text-white/80 prose prose-invert prose-tcg max-w-none">
            <p className="text-xl mb-10 leading-relaxed text-white/90">
              Are you searching for the <strong>{pageData.keyword}</strong>? In this comprehensive {pageData.format}, we break down everything you need to know about navigating {pageData.primary} {pageData.location}. Our approach is designed explicitly {pageData.modifier} to ensure maximum risk-to-reward ratios and consistent growth.
            </p>

            <h2 className="font-display text-2xl uppercase text-white mt-10 mb-4 border-b border-white/10 pb-4">
              Overview of {pageData.primary}
            </h2>
            <p className="mb-6 leading-relaxed">
              When dealing with the highly volatile financial markets, relying on guesswork is the fastest way to lose capital. 
              Finding the <em>{pageData.keyword}</em> requires a deep understanding of market structure, volume profile, and institutional order flow. 
              Our experts at The Capital Guru have spent years refining algorithms and technical analysis to bring you actionable insights directly to your device.
            </p>

            <h2 className="font-display text-2xl uppercase text-white mt-10 mb-4 border-b border-white/10 pb-4">
              Why Focus on {pageData.keyword}?
            </h2>
            <ul className="list-disc pl-6 mb-6 space-y-3">
              <li><strong>Institutional Accuracy:</strong> Eliminate the noise of typical retail trading.</li>
              <li><strong>Risk Management:</strong> Strategies tailored explicitly {pageData.modifier}.</li>
              <li><strong>Market Specificity:</strong> Focused perfectly for traders looking for opportunities {pageData.location}.</li>
              <li><strong>Real-Time Execution:</strong> Knowing about a setup is useless if you miss the entry. We deliver instantly.</li>
            </ul>

            <div className="my-12 bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="font-display text-xl uppercase text-tcg-green mb-4">Comparison: Retail vs. Institutional Grade {pageData.primary}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-3 px-4 text-white uppercase tracking-widest">Feature</th>
                      <th className="py-3 px-4 text-white uppercase tracking-widest">Average Provider</th>
                      <th className="py-3 px-4 text-tcg-green uppercase tracking-widest">The Capital Guru</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 text-white/70">Win Rate</td>
                      <td className="py-3 px-4 text-white/50">40-50%</td>
                      <td className="py-3 px-4 text-white bg-tcg-green/10 font-bold">85%+ Proven</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 text-white/70">Delivery Speed</td>
                      <td className="py-3 px-4 text-white/50">Delayed / Email</td>
                      <td className="py-3 px-4 text-white bg-tcg-green/10 font-bold">Real-time Telegram</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-white/70">Risk/Reward</td>
                      <td className="py-3 px-4 text-white/50">1:1 or negative</td>
                      <td className="py-3 px-4 text-white bg-tcg-green/10 font-bold">1:3 minimum mandate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="font-display text-2xl uppercase text-white mt-10 mb-4 border-b border-white/10 pb-4">
              Pros & Cons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl">
                <h4 className="font-bold text-green-400 mb-4 uppercase tracking-widest text-sm flex items-center gap-2"><span>+</span> The Pros</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>Data-driven, objective execution signals.</li>
                  <li>Saves hours of charting and pre-market analysis.</li>
                  <li>Allows you to leverage the expertise of veterans.</li>
                </ul>
              </div>
              <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl">
                <h4 className="font-bold text-red-500 mb-4 uppercase tracking-widest text-sm flex items-center gap-2"><span>-</span> The Cons</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>Still requires strict discipline to follow exactly as instructed.</li>
                  <li>Over-leveraging can still destroy your account if you ignore our strict stop losses.</li>
                </ul>
              </div>
            </div>

            <h2 className="font-display text-2xl uppercase text-white mt-10 mb-4 border-b border-white/10 pb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 mb-10">
              <div>
                <h4 className="font-bold text-lg mb-2">What makes the {pageData.keyword} different from others?</h4>
                <p className="text-white/70">The key difference for {pageData.primary} lies in institutional-grade analysis, real-time delivery, and proven risk-to-reward metrics specific to markets {pageData.location}.</p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">How can I get started with {pageData.primary}?</h4>
                <p className="text-white/70">You can start immediately by subscribing to our premium channel, which provides real-time alerts tailored {pageData.modifier}.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-[#0F0F0F] rounded-2xl p-8 border border-tcg-green/30 text-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
             <div className="relative z-10">
               <h3 className="font-display text-2xl uppercase text-white mb-4">Start Dominating Today</h3>
               <p className="font-body text-white/70 mb-8 max-w-md mx-auto">Get exact entries, stop-losses, and targets directly to your phone. Institutional accuracy tailored for {pageData.primary}.</p>
               <Link href="/pricing" className="inline-block px-8 py-4 text-xs font-bold text-black bg-tcg-green rounded-xl tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(57,255,20,0.3)] uppercase">
                 Unlock Premium Access &rarr;
               </Link>
             </div>
          </div>

          {relatedPages.length > 0 && (
            <div className="mt-16 pt-10 border-t border-white/10">
              <h3 className="font-display text-2xl uppercase text-white mb-6">Explore Related Strategies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPages.map(rp => (
                  <Link key={rp.slug} href={`/trading/${rp.slug}`} className="block bg-[#0F0F0F] border border-white/5 hover:border-tcg-green/30 p-4 rounded-xl transition-colors group">
                    <h4 className="font-bold text-sm group-hover:text-tcg-green transition-colors">{rp.title}</h4>
                    <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">{rp.format}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      <Footer />
    </main>
  );
}
