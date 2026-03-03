import { google } from 'googleapis';
import Sitemapper from 'sitemapper';

async function run() {
  const creds = process.env.GOOGLE_CREDS;
  if (!creds) {
    console.error('❌ GOOGLE_CREDS not found in GitHub Secrets!');
    return;
  }

  const serviceAccount = JSON.parse(creds);
  const jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    ['https://www.googleapis.com/auth/indexing']
  );

  const sitemap = new Sitemapper();
  // ✅ Fixed Sitemap URL
  const SITEMAP_URL = 'https://www.walzoo.com/sitemap.xml'; 

  try {
    console.log('🔍 Fetching all live URLs from Walzoo Sitemap...');
    const { sites } = await sitemap.fetch(SITEMAP_URL);

    if (!sites || sites.length === 0) {
      console.error('⚠️ No URLs found. Please check your Sitemap URL.');
      return;
    }

    console.log(`📊 Found ${sites.length} total URLs to index.`);

    await jwtClient.authorize();
    const indexing = google.indexing('v3');

    for (const url of sites) {
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
    console.log('✨ Success: All Walzoo content is now in Google queue!');
  } catch (err) {
    console.error('💥 Critical Error:', err.message);
  }
}

run();
