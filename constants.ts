
import { type Wallpaper, type Category } from './types';

const R2_BASE_URL = "https://pub-92d8986bb0cc46a58160f8926467ee4e.r2.dev";

export const SUB_CATEGORIES = [
  'Space',
  'Nature',
  'Cities & Landmarks',
  'Abstract',
  'Minimalist',
  'Technology',
  'Digital Art',
  'Gaming',
  'Animals',
  'Cars',
  'Seasons',
  'Sports',
  'Quotes',
  'Anime',
  'Culture',
  'Kids'
];

const generateWallpapers = (count: number, width: number, height: number, category: Category): Wallpaper[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    // EXACT Device Folder Names: Desktop, Phone, Tablet
    const deviceFolder = (category === 'Home' ? 'Desktop' : category);
    
    // Cycle through categories: Space, Nature, etc.
    const themeFolder = SUB_CATEGORIES[i % SUB_CATEGORIES.length];
    const imageName = `${deviceFolder.toLowerCase()}-v${id}`;
    
    // STRICT PATTERN: ${baseURL}/${Device}/${Category}/${imageName}.png
    const imageUrl = `${R2_BASE_URL}/${deviceFolder}/${themeFolder}/${imageName}.png`;
    
    return {
      id,
      slug: imageName,
      title: `${themeFolder} #${id}`,
      description: `Premium 4K ${deviceFolder} background from our ${themeFolder} collection. Optimized for high-resolution displays.`,
      imageUrl,
      category,      // This tracks device type
      subCategory: themeFolder, // This tracks the theme (Nature, Cars, etc)
      width,
      height,
      extension: 'png'
    };
  });
};

export const WALLPAPER_DATA: Record<Category, Wallpaper[]> = {
  'Home': generateWallpapers(12, 1920, 1080, 'Home'),
  'Desktop': generateWallpapers(20, 3840, 2160, 'Desktop'),
  'Phone': generateWallpapers(20, 1290, 2796, 'Phone'),
  'Tablet': generateWallpapers(20, 1536, 2048, 'Tablet'),
};

export const ICON_PACK_DATA = [];
