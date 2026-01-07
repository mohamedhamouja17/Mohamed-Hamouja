
import { type Wallpaper, type Category } from './types';

const R2_BASE_URL = "https://cdn.walzoo.com";

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

/**
 * Manual list of all wallpaper assets hosted on Cloudflare R2.
 * Folders are case-sensitive: /Desktop/Cars/
 */
export const MY_IMAGES: Wallpaper[] = [
  {
    id: 1,
    slug: "porsche-718-gt4rs-white-red-rims",
    title: "Porsche 718 GT4RS",
    description: "High-performance Porsche 718 GT4RS in white with striking red rims. Captured in stunning 4K detail.",
    imageUrl: `${R2_BASE_URL}/Desktop/Cars/porsche-718-gt4rs-white-red-rims.png`,
    category: 'Desktop',
    subCategory: 'Cars',
    width: 3840,
    height: 2160,
    extension: 'png'
  },
  // Add more manual entries here following the same /Device/Category/Name structure
];

/**
 * Maps categories to their respective filtered arrays.
 */
export const WALLPAPER_DATA: Record<Category, Wallpaper[]> = {
  'Home': MY_IMAGES, 
  'Desktop': MY_IMAGES.filter(img => img.category === 'Desktop'),
  'Phone': MY_IMAGES.filter(img => img.category === 'Phone'),
  'Tablet': MY_IMAGES.filter(img => img.category === 'Tablet'),
};

export const ICON_PACK_DATA = [];
