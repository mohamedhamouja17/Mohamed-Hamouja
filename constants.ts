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
export const MY_IMAGES: Wallpaper[] = [
  {
    id: 1,
    slug: "aerial-beach-palm-trees-turquoise-water",
    title: "Aerial Beach Palm Trees",
    description: "A stunning aerial view of a tropical beach with palm trees and turquoise water. High-quality 4K Nature wallpaper.",
    imageUrl: `${R2_BASE_URL}/Desktop/Nature/aerial-beach-palm-trees-turquoise-water.webp`,
    category: 'Desktop',
    subCategory: 'Nature',
    width: 3840,
    height: 2160,
    extension: 'webp'
  },
  {
    id: 2,
    slug: "saturn-rings-black-and-white-minimalist",
    title: "Saturn Rings Minimalist",
    description: "A striking black and white minimalist view of Saturn's iconic rings in deep space. Perfect for clean desktop setups.",
    imageUrl: `${R2_BASE_URL}/Desktop/Space/saturn-rings-black-and-white-minimalist.webp`,
    category: 'Desktop',
    subCategory: 'Space',
    width: 3840,
    height: 2160,
    extension: 'webp'
  },
  {
    id: 3,
    slug: "blue-teal-slate-stone-wall-pattern",
    title: "Blue Teal Slate Stone",
    description: "An abstract and textured pattern of blue and teal slate stones, offering a rugged yet modern aesthetic for your phone.",
    imageUrl: `${R2_BASE_URL}/Phone/Abstract/blue-teal-slate-stone-wall-pattern.webp`,
    category: 'Phone',
    subCategory: 'Abstract',
    width: 1080,
    height: 2340,
    extension: 'webp'
  },
  {
    id: 4,
    slug: "eiffel-tower-paris-street-view",
    title: "Eiffel Tower Street View",
    description: "A classic street view of the Eiffel Tower in Paris, capturing the romantic atmosphere of the city in high resolution.",
    imageUrl: `${R2_BASE_URL}/Phone/Cities%20%26%20Landmarks/eiffel-tower-paris-street-view.webp`,
    category: 'Phone',
    subCategory: 'Cities & Landmarks',
    width: 1080,
    height: 2340,
    extension: 'webp'
  },
  {
    id: 5,
    slug: "classic-teal-stripe-pattern-linen",
    title: "Classic Teal Stripe Pattern",
    description: "A minimalist teal stripe pattern on a linen-like texture, ideal for a clean and professional tablet background.",
    imageUrl: `${R2_BASE_URL}/Tablet/Minimalist/classic-teal-stripe-pattern-linen.webp`,
    category: 'Tablet',
    subCategory: 'Minimalist',
    width: 2048,
    height: 2732,
    extension: 'webp'
  },
  {
    id: 6,
    slug: "cyber-circuit-cat-gold-lights",
    title: "Cyber Circuit Cat",
    description: "A futuristic digital cat design featuring glowing gold circuits and neon technology elements. 4K Tablet art.",
    imageUrl: `${R2_BASE_URL}/Tablet/Technology/cyber-circuit-cat-gold-lights.webp`,
    category: 'Tablet',
    subCategory: 'Technology',
    width: 2048,
    height: 2732,
    extension: 'webp'
  }
];

export const WALLPAPER_DATA: Record<Category, Wallpaper[]> = {
  'Home': [...MY_IMAGES].reverse(), 
  'Desktop': MY_IMAGES.filter(img => img.category === 'Desktop').reverse(),
  'Phone': MY_IMAGES.filter(img => img.category === 'Phone').reverse(),
  'Tablet': MY_IMAGES.filter(img => img.category === 'Tablet').reverse(),
};

export const ICON_PACK_DATA = [];