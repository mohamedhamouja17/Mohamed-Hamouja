import fs from 'fs';
import path from 'path';
// Fix: Use star import for the process module to ensure proper typing of Node.js-specific methods like cwd and exit
import * as process from 'process';
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

  // Define paths for both public/sitemap.xml and root sitemap.xml
  const publicSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const rootSitemapPath = path.join(process.cwd(), 'sitemap.xml');
  
  const publicDir = path.dirname(publicSitemapPath);

  // Ensure the public directory exists before writing
  if (!fs.existsSync(publicDir)) {
    console.log('Public directory not found. Creating it...');
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    // Write to public/sitemap.xml
    fs.writeFileSync(publicSitemapPath, sitemap, 'utf8');
    console.log(`✅ Sitemap successfully generated at: ${publicSitemapPath}`);
    
    // Write to root sitemap.xml
    fs.writeFileSync(rootSitemapPath, sitemap, 'utf8');
    console.log(`✅ Sitemap successfully copied to root at: ${rootSitemapPath}`);
  } catch (err) {
    console.error('❌ Error writing sitemap files:', err);
    process.exit(1);
  }
};

generateSitemap();