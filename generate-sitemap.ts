import fs from 'fs';
import path from 'path';
import process from 'process';
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

  // Define target output path: ./dist/sitemap.xml
  const distDir = path.resolve(process.cwd(), 'dist');

  // Ensure the distribution directory exists before writing
  if (!fs.existsSync(distDir)) {
    console.log('Dist directory not found. Creating it...');
    fs.mkdirSync(distDir, { recursive: true });
  }

  const outputPath = path.join(distDir, 'sitemap.xml');
  
  try {
    fs.writeFileSync(outputPath, sitemap, 'utf8');
    console.log(`✅ Sitemap successfully generated at: ${outputPath}`);
  } catch (err) {
    console.error('❌ Error writing sitemap file:', err);
    process.exit(1);
  }
};

generateSitemap();
