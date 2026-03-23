import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
import { MY_IMAGES } from '../constants.js';

// Initialize Firebase Admin SDK
const creds = process.env.GOOGLE_CREDS;
if (!admin.apps.length && creds) {
  try {
    const serviceAccount = JSON.parse(creds);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
    console.log('Firebase Admin initialized for project:', serviceAccount.project_id);
  } catch (e) {
    console.error('Failed to initialize Firebase Admin:', e);
  }
}

export default async function handler(req: any, res: any) {
  // 1. Keep the existing CRON_SECRET authorization check
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    // 2. Authenticate with Google Indexing API
    if (!creds) {
      return res.status(500).json({ 
        success: false, 
        message: 'GOOGLE_CREDS environment variable is missing. Please add your service account JSON to Vercel env.' 
      });
    }

    const serviceAccount = JSON.parse(creds);
    const jwtClient = new google.auth.JWT(
      serviceAccount.client_email,
      undefined,
      serviceAccount.private_key,
      ['https://www.googleapis.com/auth/indexing']
    );

    // 3. Fetch wallpaper URLs and other site URLs
    const BASE_URL = 'https://www.walzoo.com';
    
    // Static main pages
    const staticUrls = [
      `${BASE_URL}/`,
      `${BASE_URL}/blog`,
      `${BASE_URL}/blog/phone`,
      `${BASE_URL}/blog/tablet`,
      `${BASE_URL}/blog/desktop`,
    ];

    // Wallpaper URLs from constants.ts
    const wallpaperUrls = MY_IMAGES.map(img => `${BASE_URL}/wallpaper/${img.slug}`);

    // Blog URLs from filesystem (if available in deployment)
    let blogUrls: string[] = [];
    const possibleBlogDirs = [
      path.join(process.cwd(), 'src/content/blog'),
      path.join(process.cwd(), 'content/blog')
    ];

    for (const dir of possibleBlogDirs) {
      if (fs.existsSync(dir)) {
        try {
          const files = fs.readdirSync(dir);
          const slugs = files.filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));
          blogUrls = slugs.map(slug => `${BASE_URL}/blog/post/${slug}`);
          break;
        } catch (e) {
          console.error(`Error reading blog dir ${dir}:`, e);
        }
      }
    }

    const allUrls = [...new Set([...staticUrls, ...blogUrls, ...wallpaperUrls])];

    // 4. Check tracking system (Firestore) to find unindexed URLs
    let db: admin.firestore.Firestore;
    try {
      db = admin.firestore();
      const currentProjectId = admin.app().options.projectId;
      console.log(`Attempting to access Firestore. Project ID: ${currentProjectId}`);
    } catch (e: any) {
      console.error('Firestore Access Error:', e.message);
      throw new Error(`Failed to access Firestore: ${e.message}`);
    }

    const cacheRef = db.collection('indexing').doc('cache');
    const cacheSnap = await cacheRef.get();
    let indexedUrls: string[] = [];
    
    if (cacheSnap.exists) {
      indexedUrls = cacheSnap.data()?.urls || [];
    }

    // Filter out already indexed URLs and limit to 200 (Google's daily limit)
    const urlsToProcess = allUrls.filter(url => !indexedUrls.includes(url)).slice(0, 200);

    if (urlsToProcess.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'All URLs are already indexed. Nothing to do.',
        count: 0 
      });
    }

    // 5. Submit URLs to Google Indexing API
    await jwtClient.authorize();
    const indexing = google.indexing('v3');
    const newlyIndexed: string[] = [];

    for (const url of urlsToProcess) {
      try {
        await indexing.urlNotifications.publish({
          auth: jwtClient,
          requestBody: { url, type: 'URL_UPDATED' }
        });
        newlyIndexed.push(url);
      } catch (e: any) {
        console.error(`❌ Error indexing ${url}:`, e.message);
      }
    }

    // 6. Update tracking system (Firestore)
    if (newlyIndexed.length > 0) {
      const updatedCache = [...new Set([...indexedUrls, ...newlyIndexed])];
      await cacheRef.set({ 
        urls: updatedCache,
        lastUpdated: new Date().toISOString(),
        lastBatchCount: newlyIndexed.length
      }, { merge: true });
    }

    // 7. Return detailed JSON response
    return res.status(200).json({
      success: true,
      message: `Successfully submitted ${newlyIndexed.length} URLs to Google Indexing API.`,
      count: newlyIndexed.length,
      newlyIndexed: newlyIndexed,
      totalIndexed: indexedUrls.length + newlyIndexed.length
    });

  } catch (error: any) {
    console.error('Indexing Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'An internal error occurred during indexing.' 
    });
  }
}
