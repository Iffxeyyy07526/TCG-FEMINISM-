import { notFound } from 'next/navigation';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { getFullBlogData } from '@/lib/blog-data';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export async function generateStaticParams() {
  const blogs = getFullBlogData();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blogs = getFullBlogData();
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    return {};
  }

  return {
    title: `${blog.title} | The Capital Guru`,
    description: blog.metaDescription,
    alternates: {
      canonical: `https://thecapitalguru.net/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      url: `https://thecapitalguru.net/blog/${resolvedParams.slug}`,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blogs = getFullBlogData();
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.metaDescription,
    image: 'https://thecapitalguru.net/og-image.jpg',
    author: {
      '@type': 'Organization',
      name: 'The Capital Guru',
      url: 'https://thecapitalguru.net',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Capital Guru',
      logo: {
        '@type': 'ImageObject',
        url: 'https://thecapitalguru.net/logo.png',
      },
    },
    datePublished: '2024-03-01T00:00:00Z', // Use real date in prod
    dateModified: '2024-03-01T00:00:00Z',
  };

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
      
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 relative z-10 px-6 max-w-3xl mx-auto">
          <Link href="/blog" className="text-xs uppercase tracking-widest text-tcg-green hover:underline mb-8 inline-block">&larr; Back to Insights</Link>
          
          <div className="mb-12 border-b border-white/10 pb-8">
            <h1 className="font-display text-4xl md:text-5xl uppercase text-tcg-green mb-6 leading-tight">{blog.title}</h1>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/50">
              <span>By The Capital Guru</span>
              <span>&bull;</span>
              <span>Trading Intel</span>
            </div>
          </div>

          <div className="font-body text-white/80 prose prose-invert prose-tcg max-w-none">
             <Markdown
                components={{
                  h1: ({node, ...props}) => <h1 className="font-display text-3xl uppercase text-white mt-12 mb-6" {...props} />,
                  h2: ({node, ...props}) => <h2 className="font-display text-2xl uppercase text-white mt-10 mb-4" {...props} />,
                  h3: ({node, ...props}) => <h3 className="font-display text-xl uppercase text-tcg-green mt-8 mb-3" {...props} />,
                  p: ({node, ...props}) => <p className="mb-6 leading-relaxed text-white/80" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80" {...props} />,
                  li: ({node, ...props}) => <li {...props} />,
                  a: ({node, ...props}) => <a className="text-tcg-green hover:underline font-bold" {...props} />,
                  strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />,
                }}
             >
                {blog.content}
             </Markdown>
          </div>

          <div className="mt-16 bg-[#0F0F0F] rounded-2xl p-8 border border-tcg-green/30 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div className="relative z-10">
              <h3 className="font-display text-2xl uppercase text-white mb-4">Stop guessing. Start profiting.</h3>
              <p className="font-body text-white/70 mb-8 max-w-md mx-auto">Get exact entries, stop-losses, and targets tailored for the Nifty & Bank Nifty. Institutional accuracy delivered straight to your Telegram.</p>
              <Link href="/pricing" className="inline-block px-8 py-4 text-xs font-bold text-black bg-tcg-green rounded-xl tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(57,255,20,0.3)] uppercase">
                Claim Your Edge &rarr;
              </Link>
            </div>
          </div>
        </div>
      <Footer />
    </main>
  );
}
