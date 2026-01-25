import { db } from './firebase.ts';
import { collection, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore';

/**
 * cleanup-db.ts
 * 
 * Run this function from a secure admin console or temporary UI button
 * to purge all wallpaper entries from your Firestore database.
 */
export const clearWallpapersCollection = async () => {
  try {
    const colRef = collection(db, "wallpapers");
    const snapshot = await getDocs(colRef);
    
    if (snapshot.empty) {
      console.log("Database is already empty.");
      return;
    }

    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => {
      batch.delete(doc(db, "wallpapers", d.id));
    });

    await batch.commit();
    console.log(`Successfully deleted ${snapshot.size} wallpaper entries from Firestore.`);
  } catch (error) {
    console.error("Error clearing Firestore wallpapers collection:", error);
  }
};