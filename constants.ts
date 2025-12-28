
import { type Wallpaper, type Category } from './types';

const generateWallpapers = (count: number, width: number, height: number, category: Category): Wallpaper[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1 + Math.floor(Math.random() * 1000);
    const title = `${category} Aesthetic #${id}`;
    return {
      id,
      slug: `${category.toLowerCase()}-wallpaper-4k-${id}`,
      title,
      description: `Download this stunning ${category} wallpaper. High-resolution ${width}x${height} background optimized for your device. 100% Free on Walzoo.`,
      imageUrl: `https://picsum.photos/seed/${id}/${width}/${height}`,
      category,
      width,
      height
    };
  });
};

export const WALLPAPER_DATA: Record<Category, Wallpaper[]> = {
  // Home uses 1080p for faster initial load previews
  Home: generateWallpapers(12, 1920, 1080, 'Home'),
  // True 4K for Desktop (16:9)
  'Desktop': generateWallpapers(12, 3840, 2160, 'Desktop'),
  // Modern high-res vertical display for Phone (9:19.5 approx)
  'Phone': generateWallpapers(12, 1290, 2796, 'Phone'),
  // 3:4 resolution for Tablet to match iPad/Tablet identity
  'Tablet': generateWallpapers(12, 1536, 2048, 'Tablet'),
};

export const ICON_PACK_DATA = [];
