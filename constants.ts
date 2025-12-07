
import { type Wallpaper, type IconPack, type Category } from './types';

const generateWallpapers = (count: number, width: number, height: number): Wallpaper[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://picsum.photos/seed/${i + Date.now()}/${width}/${height}`,
  }));
};

export const WALLPAPER_DATA: Record<Category, Wallpaper[]> = {
  Home: generateWallpapers(12, 600, 400),
  'Desktop': generateWallpapers(12, 600, 340),
  'Phone': generateWallpapers(10, 300, 600),
  'Tablet': generateWallpapers(12, 400, 500),
};

export const ICON_PACK_DATA: IconPack[] = [];
