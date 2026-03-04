import { google } from 'googleapis';
import Sitemapper from 'sitemapper';

async function run() {
  const creds = process.env.GOOGLE_CREDS;
  if (!creds) {
    console.error('❌ GOOGLE_CREDS secret is missing!');
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
  const SITEMAP_URL = 'https://www.walzoo.com/sitemap.xml'; 

  try {
    console.log('🔍 Fetching URLs from sitemap...');
    const { sites } = await sitemap.fetch(SITEMAP_URL);

    if (!sites || sites.length === 0) {
      console.error('⚠️ No URLs found in sitemap!');
      return;
    }

    console.log(`📊 Found ${sites.length} URLs to index.`);

    await jwtClient.authorize();
    const indexing = google.indexing('v3');

    for (const url of sites) {
      try {
        await indexing.urlNotifications.publish({
          auth: jwtClient,
          requestBody: { url, type: 'URL_UPDATED' }
        });
        console.log(`✅ Success: ${url}`);
      } catch (e) {
        console.error(`❌ Error for ${url}:`, e.message);
      }
    }
    console.log('✨ All Walzoo links have been sent to Google!');
  } catch (err) {
    console.error('💥 Error:', err.message);
  }
}

run();
