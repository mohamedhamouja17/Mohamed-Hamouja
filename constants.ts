import { type Wallpaper, type Category } from './types.ts';

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

// Data Wipe: Removed all existing image entries to start fresh with new 4K strategy.
export const MY_IMAGES: Wallpaper[] = [];

export const WALLPAPER_DATA: Record<Category, Wallpaper[]> = {
  'Home': [...MY_IMAGES].reverse(), 
  'Desktop': MY_IMAGES.filter(img => img.category === 'Desktop').reverse(),
  'Phone': MY_IMAGES.filter(img => img.category === 'Phone').reverse(),
  'Tablet': MY_IMAGES.filter(img => img.category === 'Tablet').reverse(),
};

export const ICON_PACK_DATA = [];