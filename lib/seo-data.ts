export const primaryKeywords = [
  'NSE stock market signals',
  'Bank Nifty options tips',
  'intraday trading signals',
  'swing trading calls',
  'Nifty 50 predictions'
];

export const modifiers = [
  'best',
  'top',
  'premium',
  'highly accurate',
  'for beginners',
  'for professionals',
  'with low risk',
  'in 2026'
];

export const locations = [
  'in India',
  'in Mumbai',
  'in Delhi',
  'in Gujarat',
  'Global'
];

export const formats = [
  'guide',
  'review',
  'comparison',
  'tutorial'
];

export interface SeoPageData {
  id: number;
  primary: string;
  modifier: string;
  location: string;
  title: string;
  slug: string;
  keyword: string;
  format: string;
}

export function generateSeoPages(): SeoPageData[] {
  const pages: SeoPageData[] = [];
  let id = 1;
  
  // Generate 200 combinations
  for (const primary of primaryKeywords) {
    for (const mod of modifiers) {
      for (const loc of locations) {
        // determine a format based on id to vary content somewhat
        const format = formats[id % formats.length];
        const title = `${mod.charAt(0).toUpperCase() + mod.slice(1)} ${primary} ${loc}`;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        pages.push({
          id: id++,
          primary,
          modifier: mod,
          location: loc,
          title,
          slug,
          keyword: `${mod} ${primary} ${loc}`,
          format
        });
      }
    }
  }
  return pages;
}

export const seoPagesData = generateSeoPages();

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return seoPagesData.find(page => page.slug === slug);
}
