import fs from 'fs';
import path from 'path';
// Use named imports for process methods to ensure they are correctly typed and avoid shadowing the global process object
import { cwd, exit } from 'process';
import { MY_IMAGES } from './constants.ts';

/**
 * generate-sitemap.ts
 * 
 * This script generates a sitemap.xml file for search engines to crawl.
 * It maps static application routes and dynamic wallpaper detail pages.
 */

const BASE_URL = 'https://mohamed-hamouja.vercel.app';

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
  // Saving to 'public' ensures Vercel serves it correctly as a static asset
  // Use the imported cwd() function directly to resolve typing issues
  const sitemapPath = path.join(cwd(), 'public', 'sitemap.xml');
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
    // Use the imported exit() function directly to resolve typing issues
    exit(1);
  }
};

generateSitemap();