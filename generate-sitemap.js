import fs from 'fs';
import path from 'path';
import { SUB_CATEGORIES, MY_IMAGES } from './constants.ts';

/**
 * generate-sitemap.js
 * 
 * Generates a comprehensive sitemap for Walzoo using clean URLs.
 * Includes static pages, category pages, and dynamic wallpaper detail pages.
 */

const BASE_URL = 'https://walzoo.com';
const TODAY = '2026-02-14';
const HISTORICAL_DATE = '2026-01-24';

// Batch Dates
const BATCH_DATES = {
  1: '2026-01-26', // IDs 1-6
  2: '2026-01-27', // IDs 7-12
  3: '2026-01-28', // IDs 13-18
  4: '2026-01-29', // IDs 19-24
  6: '2026-01-30', // IDs 31-36
  7: '2026-01-31', // IDs 37-42
  8: '2026-02-01', // IDs 43-48
  9: '2026-02-02', // IDs 49-54
  10: '2026-02-03', // IDs 55-60
  11: '2026-02-04', // IDs 61-66
  12: '2026-02-05', // IDs 67-72
  13: '2026-02-06', // IDs 73-78
  14: '2026-02-07', // IDs 79-84
  15: '2026-02-08', // IDs 85-90
  16: '2026-02-09', // IDs 91-96
  17: '2026-02-11', // IDs 97-102
  18: '2026-02-12', // IDs 103-108
  19: '2026-02-13', // IDs 109-114
  20: '2026-02-14'  // IDs 115-120
};

const staticRoutes = [
  '/',
  '/desktop',
  '/phone',
  '/tablet',
  '/blog',
  '/about',
  '/privacy',
  '/terms',
  '/contact'
];

const generateSitemap = () => {
  const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  const xmlFooter = `</urlset>`;

  const staticEntries = staticRoutes.map(route => {
    const isHome = route === '/';
    return `  <url>
    <loc>${BASE_URL}${isHome ? '' : route}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${isHome ? 'daily' : 'weekly'}</changefreq>
    <priority>${isHome ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join('\n');

  const categoryEntries = SUB_CATEGORIES.map(cat => {
    const slug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    const devices = ['desktop', 'phone', 'tablet'];
    
    const categoryUrl = `  <url>
    <loc>${BASE_URL}/category/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;

    const deviceCategoryUrls = devices.map(device => `  <url>
    <loc>${BASE_URL}/${device}/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

    return `${categoryUrl}\n${deviceCategoryUrls}`;
  }).join('\n');

  const wallpaperEntries = MY_IMAGES.map(img => {
    const title = escapeXml(img.title);
    const description = escapeXml(img.description);
    
    return `  <url>
    <loc>${BASE_URL}/wallpaper/${img.slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${img.imageUrl}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${description}</image:caption>
    </image:image>
  </url>`;
  }).join('\n');

  const sitemapContent = `${xmlHeader}\n${staticEntries}\n${categoryEntries}\n${wallpaperEntries}\n${xmlFooter}`;

  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const rootPath = path.join(process.cwd(), 'sitemap.xml');

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    fs.writeFileSync(publicPath, sitemapContent, 'utf8');
    fs.writeFileSync(rootPath, sitemapContent, 'utf8');
    console.log(`✅ Sitemap successfully generated at ${publicPath}`);
    console.log(`📊 Total entries: ${staticRoutes.length + SUB_CATEGORIES.length + MY_IMAGES.length}`);
  } catch (err) {
    console.error('❌ Error writing sitemap:', err);
    process.exit(1);
  }
};

generateSitemap();