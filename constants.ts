import { type Wallpaper, type IconPack, type Category } from './types';

const generateWallpapers = (count: number, width: number, height: number): Wallpaper[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://picsum.photos/seed/${i + Date.now()}/${width}/${height}`,
  }));
};

export const WALLPAPER_DATA: Record<Exclude<Category, 'App Icons'>, Wallpaper[]> = {
  Home: generateWallpapers(12, 600, 400),
  PC: generateWallpapers(12, 600, 340),
  Phone: generateWallpapers(10, 300, 600),
  Tablet: generateWallpapers(12, 400, 500),
  TV: generateWallpapers(12, 800, 450),
};

export const ICON_PACK_DATA: IconPack[] = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/pack1/500/500', title: 'Minimalist Monochrome', count: 80, os: 'Android' },
  { id: 2, imageUrl: 'https://picsum.photos/seed/pack2/500/500', title: 'Neon Nights', count: 120, os: 'Android' },
  { id: 3, imageUrl: 'https://picsum.photos/seed/pack3/500/500', title: 'Pastel Dreams', count: 100, os: 'Android' },
  { id: 4, imageUrl: 'https://picsum.photos/seed/pack4/500/500', title: 'Retro Pixel', count: 90, os: 'iOS' },
  { id: 5, imageUrl: 'https://picsum.photos/seed/pack5/500/500', title: 'Nature Elements', count: 110, os: 'iOS' },
  { id: 6, imageUrl: 'https://picsum.photos/seed/pack6/500/500', title: 'Vintage Vibes', count: 70, os: 'iOS' },
  { id: 7, imageUrl: 'https://picsum.photos/seed/pack7/500/500', title: 'Cyberpunk City', count: 150, os: 'Windows' },
  { id: 8, imageUrl: 'https://picsum.photos/seed/pack8/500/500', title: 'Oceanic Blues', count: 95, os: 'Windows' },
  { id: 9, imageUrl: 'https://picsum.photos/seed/pack9/500/500', title: 'Autumn Warmth', count: 85, os: 'Windows' },
  { id: 10, imageUrl: 'https://picsum.photos/seed/pack10/500/500', title: 'Galaxy Quest', count: 130, os: 'Mac' },
  { id: 11, imageUrl: 'https://picsum.photos/seed/pack11/500/500', title: 'Geometric Shapes', count: 105, os: 'Mac' },
  { id: 12, imageUrl: 'https://picsum.photos/seed/pack12/500/500', title: 'Hand Drawn', count: 65, os: 'Mac' },
];