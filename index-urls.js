import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const creds = process.env.GOOGLE_CREDS;
  if (!creds) {
    console.log('Push mode: No local credentials needed. Waiting for GitHub deployment.');
    return;
  }

  const serviceAccount = JSON.parse(creds);
  const jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    ['https://www.googleapis.com/auth/indexing']
  );

  const BASE_URL = 'https://www.walzoo.com';

  const getBlogSlugs = (dir) => {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));
  };

  const getWallpaperSlugs = () => {
    let constantsPath = path.join(process.cwd(), 'constants.ts');
    if (!fs.existsSync(constantsPath)) {
      constantsPath = path.join(process.cwd(), 'src', 'constants.ts');
    }
    if (!fs.existsSync(constantsPath)) return [];
    const content = fs.readFileSync(constantsPath, 'utf8');
    const slugRegex = /slug:\s*["']([^"']+)["']/g;
    const slugs = [];
    let match;
    while ((match = slugRegex.exec(content)) !== null) {
      slugs.push(match[1]);
    }
    return [...new Set(slugs)];
  };

  const blogDir = fs.existsSync('./src/content/blog') ? './src/content/blog' : './content/blog';
  const blogSlugs = getBlogSlugs(path.join(process.cwd(), blogDir));
  const wallpaperSlugs = getWallpaperSlugs();

  const urls = [
    `${BASE_URL}/`, 
    `${BASE_URL}/blog`, 
    `${BASE_URL}/blog/phone`,
    `${BASE_URL}/blog/tablet`, 
    `${BASE_URL}/blog/desktop`,
    ...blogSlugs.map(slug => `${BASE_URL}/blog/post/${slug}`),
    ...wallpaperSlugs.map(slug => `${BASE_URL}/wallpaper/${slug}`)
  ];

  console.log(`📊 Found ${urls.length} URLs. Authenticating...`);
  await jwtClient.authorize();
  const indexing = google.indexing('v3');

  for (const url of urls) {
    try {
      await indexing.urlNotifications.publish({
        auth: jwtClient,
        requestBody: { url, type: 'URL_UPDATED' }
      });
      console.log(`✅ Indexed: ${url}`);
    } catch (e) { 
      console.error(`❌ Error: ${url}`, e.message); 
    }
  }
}

run();
