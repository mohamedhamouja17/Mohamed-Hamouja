
import fs from 'fs';
import path from 'path';
// Use default import for process to ensure the correctly typed process object is used instead of a namespace
import process from 'process';
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
  // Today's date for new content
  const today = '2026-01-18';
  
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
${MY_IMAGES.map(img => {
  // Use a heuristic or manual check for older items if precise differential dates are needed
  // For the script, we'll use 'today' as the default for simplicity unless explicitly mapped
  const date = img.id <= 3 ? '2026-01-15' : today;
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
    // Fix: Access cwd() from the imported process object
    publicSitemap: path.join(process.cwd(), 'public', 'sitemap.xml'),
    // Fix: Access cwd() from the imported process object
    rootSitemap: path.join(process.cwd(), 'sitemap.xml')
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
    // Fix: Use process.exit() to stop the script on error
    process.exit(1);
  }
};

generateSitemap();
