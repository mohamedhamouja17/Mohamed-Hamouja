
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
    // Map 'Home' category to 'desktop' for URL construction
    const devicePath = (category === 'Home' ? 'desktop' : category.toLowerCase());
    
    // Cycle through the new sub-categories provided by the user
    const subCategory = SUB_CATEGORIES[i % SUB_CATEGORIES.length];
    const imageName = `${devicePath}-v${id}`;
    
    // Pattern: ${baseURL}/${deviceType}/${category}/${imageName}.jpg
    // Note: In R2 storage, folder names are usually clean strings. 
    // We'll use the subCategory directly but in a real app, these might be slugified.
    const imageUrl = `${R2_BASE_URL}/${devicePath}/${subCategory}/${imageName}.jpg`;
    
    return {
      id,
      slug: imageName,
      title: `${subCategory} #${id}`,
      description: `Premium 4K ${category} background from our ${subCategory} collection. Optimized for high-resolution displays.`,
      imageUrl,
      category,
      subCategory,
      width,
      height
    };
  });
};

export const WALLPAPER_DATA: Record<Category, Wallpaper[]> = {
  'Home': generateWallpapers(12, 1920, 1080, 'Home'),
  'Desktop': generateWallpapers(12, 3840, 2160, 'Desktop'),
  'Phone': generateWallpapers(12, 1290, 2796, 'Phone'),
  'Tablet': generateWallpapers(12, 1536, 2048, 'Tablet'),
};

export const ICON_PACK_DATA = [];
