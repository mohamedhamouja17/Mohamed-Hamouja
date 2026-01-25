import fs from 'fs';
import path from 'path';
// Fix: Import the process object instead of named exports to avoid module resolution errors
import process from 'process';
import { SUB_CATEGORIES } from './constants.ts';

/**
 * generate-sitemap.ts
 * 
 * Reset version: Generates a sitemap for the site skeleton.
 * Includes Home, Static pages, and the 16 core categories.
 */

const BASE_URL = 'https://walzoo.com';
const today = '2026-01-24';

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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(route => `  <url>
    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`)
  .join('\n')}
${SUB_CATEGORIES.map(cat => {
  const slug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  return `  <url>
    <loc>${BASE_URL}/category/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  // Fix: Call process.cwd() method instead of the missing named export
  const paths = {
    publicSitemap: path.join(process.cwd(), 'public', 'sitemap.xml'),
    rootSitemap: path.join(process.cwd(), 'sitemap.xml')
  };
  
  const publicDir = path.dirname(paths.publicSitemap);
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  try {
    fs.writeFileSync(paths.publicSitemap, sitemap, 'utf8');
    fs.writeFileSync(paths.rootSitemap, sitemap, 'utf8');
    console.log(`✅ Fresh sitemap generated with 16 categories and static routes.`);
  } catch (err) {
    console.error('❌ Error writing sitemap:', err);
    // Fix: Call process.exit(1) instead of the missing named export
    process.exit(1);
  }
};

generateSitemap();