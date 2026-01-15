import fs from 'fs';
import path from 'path';
// Use namespace import for the process module to ensure proper typing of Node.js-specific methods like cwd and exit
import * as process from 'process';
import { MY_IMAGES } from './constants.ts';

/**
 * generate-sitemap.ts
 * 
 * This script generates sitemap.xml and sitemap-images.xml files for search engines.
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

const generateSitemaps = () => {
  // Use the fixed date as requested by the user
  const today = '2026-01-15';
  
  // 1. Generate standard sitemap (unified with images as requested)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticRoutes
  .map(route => {
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
${MY_IMAGES.map(img => `  <url>
    <loc>${BASE_URL}/wallpaper/${img.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${img.imageUrl}</image:loc>
      <image:title>${img.title.replace(/&/g, '&amp;')}</image:title>
      <image:caption>${img.description.replace(/&/g, '&amp;')}</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  // 2. Generate pure image sitemap for reference
  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${MY_IMAGES.map(img => `  <url>
    <loc>${BASE_URL}/wallpaper/${img.slug}</loc>
    <image:image>
      <image:loc>${img.imageUrl}</image:loc>
      <image:title>${img.title.replace(/&/g, '&amp;')}</image:title>
      <image:caption>${img.description.replace(/&/g, '&amp;')}</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  const paths = {
    // Fixed: used namespace import to ensure cwd() is properly typed
    publicSitemap: path.join(process.cwd(), 'public', 'sitemap.xml'),
    rootSitemap: path.join(process.cwd(), 'sitemap.xml'),
    publicImageSitemap: path.join(process.cwd(), 'public', 'sitemap-images.xml'),
    rootImageSitemap: path.join(process.cwd(), 'sitemap-images.xml')
  };
  
  const publicDir = path.dirname(paths.publicSitemap);

  if (!fs.existsSync(publicDir)) {
    console.log('Public directory not found. Creating it...');
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    // Write standard sitemaps
    fs.writeFileSync(paths.publicSitemap, sitemap, 'utf8');
    fs.writeFileSync(paths.rootSitemap, sitemap, 'utf8');
    console.log(`✅ Standard sitemap successfully generated.`);
    
    // Write image sitemaps
    fs.writeFileSync(paths.publicImageSitemap, imageSitemap, 'utf8');
    fs.writeFileSync(paths.rootImageSitemap, imageSitemap, 'utf8');
    console.log(`✅ Image sitemap successfully generated.`);
  } catch (err) {
    console.error('❌ Error writing sitemap files:', err);
    // Fixed: used namespace import to ensure exit() is properly typed
    process.exit(1);
  }
};

generateSitemaps();