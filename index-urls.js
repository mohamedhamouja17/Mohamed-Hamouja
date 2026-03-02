import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const creds = process.env.GOOGLE_CREDS;
  if (!creds) {
    console.log('No credentials found. This is normal if running locally without secrets.');
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

  // دالة لجلب أسماء المقالات من المجلد
  const getSlugs = (dir) => {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));
  };

  const blogDir = fs.existsSync('./src/content/blog') ? './src/content/blog' : './content/blog';
  const blogSlugs = getSlugs(path.join(process.cwd(), blogDir));

  // قائمة الروابط الشاملة
  const urls = [
    `${BASE_URL}/`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/blog/phone`,
    `${BASE_URL}/blog/tablet`,
    `${BASE_URL}/blog/desktop`,
    `${BASE_URL}/phone`,
    `${BASE_URL}/tablet`,
    `${BASE_URL}/desktop`,
    ...blogSlugs.map(slug => `${BASE_URL}/blog/post/${slug}`)
  ];

  console.log(`📊 Found ${urls.length} URLs. Sending to Google...`);

  try {
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
        console.error(`❌ Error indexing ${url}:`, e.message);
      }
    }
    console.log('✨ All done! Walzoo is now in Google queue.');
  } catch (err) {
    console.error('💥 Auth Error:', err.message);
  }
}

run();
