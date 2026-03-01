const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// 1. Authentication
const serviceAccount = require('./service-account.json');
const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  ['https://www.googleapis.com/auth/indexing'],
  null
);

const BASE_URL = 'https://www.walzoo.com';

async function getBlogSlugs() {
  const blogDir = path.join(__dirname, 'content', 'blog');
  const files = fs.readdirSync(blogDir);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
}

async function getWallpaperSlugs() {
  const constantsPath = path.join(__dirname, 'constants.ts');
  const content = fs.readFileSync(constantsPath, 'utf8');
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const slugs = [];
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return [...new Set(slugs)]; // Unique slugs
}

async function indexUrl(url) {
  try {
    const response = await google.indexing('v3').urlNotifications.publish({
      auth: jwtClient,
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });
    console.log(`Successfully indexed: ${url}`);
    return response.data;
  } catch (error) {
    console.error(`Error indexing ${url}:`, error.message);
    if (error.response && error.response.data) {
      console.error('Details:', error.response.data);
    }
  }
}

async function run() {
  console.log('Starting Google Indexing process...');
  
  try {
    await jwtClient.authorize();
    console.log('Authenticated successfully.');

    const blogSlugs = await getBlogSlugs();
    const wallpaperSlugs = await getWallpaperSlugs();

    const urls = [
      ...blogSlugs.map(slug => `${BASE_URL}/blog/post/${slug}`),
      ...wallpaperSlugs.map(slug => `${BASE_URL}/wallpaper/${slug}`)
    ];

    console.log(`Found ${urls.length} URLs to index.`);

    // Handle batching (sequential with small delay to avoid rate limits)
    for (const url of urls) {
      await indexUrl(url);
      // Small delay to be safe
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('Indexing process completed.');
  } catch (error) {
    console.error('Fatal error:', error.message);
  }
}

run();
