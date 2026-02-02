import fs from 'fs';
import path from 'path';
// Use the global process object available in Node.js to ensure correct typing of cwd() and exit()
import { SUB_CATEGORIES, MY_IMAGES } from './constants.ts';

/**
 * generate-sitemap.ts
 * 
 * Updated version: Generates a sitemap with static routes, categories, and dynamic wallpaper entries.
 * Manages batches:
 * Batch 1 (IDs 1-6): 2026-01-26
 * Batch 2 (IDs 7-12): 2026-01-27
 * Batch 3 (IDs 13-18): 2026-01-28
 * Batch 4 (IDs 19-24): 2026-01-29
 * Batch 6 (IDs 31-36): 2026-01-30
 * Batch 7 (IDs 37-42): 2026-01-31
 * Batch 8 (IDs 43-48): 2026-02-01
 * Batch 9 (IDs 49-54): 2026-02-02
 */

const BASE_URL = 'https://walzoo.com';
const today = '2026-02-02';
const batch8Date = '2026-02-01';
const batch7Date = '2026-01-31';
const batch6Date = '2026-01-30';
const batch4Date = '2026-01-29';
const batch3Date = '2026-01-28';
const batch2Date = '2026-01-27';
const batch1Date = '2026-01-26';
const historicalDate = '2026-01-24';

const staticRoutes = [
  '/',
  '/blog',
  '/about',
  '/privacy',
  '/terms',
  '/contact'
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticRoutes
  .map(route => {
    const isHome = route === '/';
    return `  <url>
    <loc>${BASE_URL}${isHome ? '' : route}</loc>
    <lastmod>${isHome ? today : historicalDate}</lastmod>
    <changefreq>${isHome ? 'daily' : 'weekly'}</changefreq>
    <priority>${isHome ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
${SUB_CATEGORIES.map(cat => {
  const slug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  return `  <url>
    <loc>${BASE_URL}/category/${slug}</loc>
    <lastmod>${historicalDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
}).join('\n')}
${MY_IMAGES.map(img => {
  // Logic to freeze older image dates as requested
  let imgDate = today;
  if (img.id <= 6) {
    imgDate = batch1Date;
  } else if (img.id <= 12) {
    imgDate = batch2Date;
  } else if (img.id <= 18) {
    imgDate = batch3Date;
  } else if (img.id <= 24) {
    imgDate = batch4Date;
  } else if (img.id <= 36) {
    imgDate = batch6Date;
  } else if (img.id <= 42) {
    imgDate = batch7Date;
  } else if (img.id <= 48) {
    imgDate = batch8Date;
  }
  
  return `  <url>
    <loc>${BASE_URL}/wallpaper/${img.slug}</loc>
    <lastmod>${imgDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${img.imageUrl}</image:loc>
      <image:title>${img.title.replace(/&/g, '&amp;')}</image:title>
      <image:caption>${img.description.replace(/&/g, '&amp;')}</image:caption>
    </image:image>
  </url>`;
}).join('\n')}
</urlset>`;

  // Accessing cwd() on the global process object via type casting to resolve type errors
  const paths = {
    publicSitemap: path.join((process as any).cwd(), 'public', 'sitemap.xml'),
    rootSitemap: path.join((process as any).cwd(), 'sitemap.xml')
  };
  
  const publicDir = path.dirname(paths.publicSitemap);
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  try {
    fs.writeFileSync(paths.publicSitemap, sitemap, 'utf8');
    fs.writeFileSync(paths.rootSitemap, sitemap, 'utf8');
    console.log(`✅ Fresh sitemap generated with 16 categories, static routes, and ${MY_IMAGES.length} wallpapers.`);
  } catch (err) {
    console.error('❌ Error writing sitemap:', err);
    // Accessing exit() on the global process object via type casting to resolve type errors
    (process as any).exit(1);
  }
};

generateSitemap();