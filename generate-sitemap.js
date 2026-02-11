
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
const TODAY = '2026-02-09';
const HISTORICAL_DATE = '2026-01-24';

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
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  const xmlFooter = `</urlset>`;

  const staticEntries = staticRoutes.map(route => {
    const isHome = route === '/';
    return `  <url>
    <loc>${BASE_URL}${isHome ? '' : route}</loc>
    <lastmod>${isHome ? TODAY : HISTORICAL_DATE}</lastmod>
    <changefreq>${isHome ? 'daily' : 'weekly'}</changefreq>
    <priority>${isHome ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join('\n');

  const categoryEntries = SUB_CATEGORIES.map(cat => {
    const slug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    return `  <url>
    <loc>${BASE_URL}/category/${slug}</loc>
    <lastmod>${HISTORICAL_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n');

  const wallpaperEntries = MY_IMAGES.map(img => {
    // Escape characters for XML compatibility
    const title = img.title.replace(/&/g, '&amp;');
    const description = img.description.replace(/&/g, '&amp;');
    
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
