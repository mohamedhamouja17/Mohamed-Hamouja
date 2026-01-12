import fs from 'fs';
import path from 'path';
// Fix: Use default import for process to avoid missing named export errors for cwd and exit
import process from 'process';
import { MY_IMAGES } from './constants.ts';

/**
 * generate-sitemap.ts
 * 
 * This script generates a sitemap.xml file for search engines to crawl.
 * It maps static application routes and dynamic wallpaper detail pages.
 */

const BASE_URL = 'https://walzoo.com';

// Application static routes
const staticRoutes = [
  '/',
  '/blog',
  '/about',
  '/privacy',
  '/terms',
  '/contact'
];

// Dynamic wallpaper routes generated from the slug field in constants.ts
const wallpaperRoutes = MY_IMAGES.map(img => `/wallpaper/${img.slug}`);

const allRoutes = [...staticRoutes, ...wallpaperRoutes];

const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => {
    // Normalize URL to prevent double slashes at the root
    const loc = `${BASE_URL}${route === '/' ? '' : route}`;
    const priority = route === '/' ? '1.0' : '0.8';
    const changefreq = route === '/' ? 'daily' : 'weekly';
    
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  // Define target output path: ./public/sitemap.xml
  // Fix: Use process.cwd() directly since named export was missing
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const publicDir = path.dirname(sitemapPath);

  // Ensure the public directory exists before writing
  if (!fs.existsSync(publicDir)) {
    console.log('Public directory not found. Creating it...');
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log(`✅ Sitemap successfully generated at: ${sitemapPath}`);
  } catch (err) {
    console.error('❌ Error writing sitemap file:', err);
    // Fix: Use process.exit() directly since named export was missing
    process.exit(1);
  }
};

generateSitemap();