import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { SUB_CATEGORIES, MY_IMAGES } from './constants.ts';

/**
 * generate-sitemap.ts
 * 
 * Generates a comprehensive sitemap for Walzoo for SEO optimization.
 */

const BASE_URL = 'https://walzoo.com';
const today = new Date().toISOString().split('T')[0];
const historicalDate = '2026-01-24';

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
  const title = img.title.replace(/&/g, '&amp;');
  const description = img.description.replace(/&/g, '&amp;');
  
  return `  <url>
    <loc>${BASE_URL}/wallpaper/${img.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${img.imageUrl}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${description}</image:caption>
    </image:image>
  </url>`;
}).join('\n')}
</urlset>`;

  const cwd = process.cwd();
  const publicDir = path.join(cwd, 'public');
  const publicSitemap = path.join(publicDir, 'sitemap.xml');
  const rootSitemap = path.join(cwd, 'sitemap.xml');
  
  // Ensure the public directory exists before writing
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    fs.writeFileSync(publicSitemap, sitemap, 'utf8');
    fs.writeFileSync(rootSitemap, sitemap, 'utf8');
    console.log(`✅ Sitemap successfully generated at ${publicSitemap}`);
  } catch (err) {
    console.error('❌ Error writing sitemap:', err);
    process.exit(1);
  }
};

generateSitemap();