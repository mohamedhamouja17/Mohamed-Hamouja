import { google } from 'googleapis';
import Sitemapper from 'sitemapper';

async function run() {
  const creds = process.env.GOOGLE_CREDS;
  if (!creds) return console.error('❌ Missing GOOGLE_CREDS');

  const serviceAccount = JSON.parse(creds);
  const jwtClient = new google.auth.JWT(
    serviceAccount.client_email, null, serviceAccount.private_key,
    ['https://www.googleapis.com/auth/indexing']
  );

  const sitemap = new Sitemapper();
  try {
    const { sites } = await sitemap.fetch('https://www.walzoo.com/sitemap.xml');
    console.log(`📊 Found ${sites.length} URLs to index.`);

    await jwtClient.authorize();
    const indexing = google.indexing('v3');

    for (const url of sites) {
      await indexing.urlNotifications.publish({
        auth: jwtClient,
        requestBody: { url, type: 'URL_UPDATED' }
      });
      console.log(`✅ Indexed: ${url}`);
    }
    console.log('✨ All done!');
  } catch (err) { console.error('💥 Error:', err.message); }
}
run();
