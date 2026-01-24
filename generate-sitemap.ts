import fs from 'fs';
import path from 'path';
// Use named imports for process to ensure properties like cwd and exit are correctly typed and available in ESM
import { cwd, exit } from 'process';
import { MY_IMAGES } from './constants.ts';

/**
 * generate-sitemap.ts
 * 
 * This script generates a single consolidated sitemap.xml file for search engines.
 * It includes both URL locations and image metadata for SEO efficiency.
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

const generateSitemap = () => {
  // Today's date for current content update signal as requested
  const today = '2026-01-24';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticRoutes
  .map(route => {
    const loc = `${BASE_URL}${route === '/' ? '' : route}`;
    const priority = route === '/' ? '1.0' : '0.8';
    const changefreq = route === '/' ? 'daily' : 'weekly';
    
    // Freeze historical dates for static pages, only update home
    const date = route === '/' ? today : '2026-01-18';
    
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
${MY_IMAGES.map(img => {
  // Preserve historical dates based on upload blocks to protect indexing
  let date = today;
  if (img.id <= 3) {
    date = '2026-01-15';
  } else if (img.id <= 10) {
    date = '2026-01-18';
  } else if (img.id === 11) {
    date = '2026-01-19';
  } else if (img.id <= 17) {
    date = '2026-01-21';
  } else if (img.id <= 23) {
    date = '2026-01-22';
  } else if (img.id <= 29) {
    date = '2026-01-23';
  } else if (img.id <= 34) {
    date = '2026-01-24';
  } else {
    date = today;
  }
  
  return `  <url>
    <loc>${BASE_URL}/wallpaper/${img.slug}</loc>
    <lastmod>${date}</lastmod>
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

  const paths = {
    // Fix: Access cwd() from named import to ensure correct Node.js typing
    publicSitemap: path.join(cwd(), 'public', 'sitemap.xml'),
    // Fix: Access cwd() from named import to ensure correct Node.js typing
    rootSitemap: path.join(cwd(), 'sitemap.xml')
  };
  
  const publicDir = path.dirname(paths.publicSitemap);

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    fs.writeFileSync(paths.publicSitemap, sitemap, 'utf8');
    fs.writeFileSync(paths.rootSitemap, sitemap, 'utf8');
    console.log(`✅ Consolidated sitemap successfully generated at /public/sitemap.xml`);
  } catch (err) {
    console.error('❌ Error writing sitemap file:', err);
    // Fix: Use exit() from named import to stop the script on error with correct typing
    exit(1);
  }
};

generateSitemap();