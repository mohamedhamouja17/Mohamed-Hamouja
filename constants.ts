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
  {
    id: 2,
    slug: "neon-city-night-vibes",
    title: "Cyberpunk Cityscape",
    description: "A futuristic neon city drenched in rain, perfect for high-resolution desktop setups.",
    imageUrl: `https://picsum.photos/seed/cyber/3840/2160`,
    category: 'Desktop',
    subCategory: 'Digital Art',
    width: 3840,
    height: 2160,
    extension: 'jpg'
  },
  {
    id: 3,
    slug: "iphone-aesthetic-gradient",
    title: "Aesthetic Mesh Gradient",
    description: "Soft, flowing colors designed specifically for mobile OLED screens.",
    imageUrl: `https://picsum.photos/seed/mobile1/1080/1920`,
    category: 'Phone',
    subCategory: 'Abstract',
    width: 1080,
    height: 1920,
    extension: 'jpg'
  },
  {
    id: 4,
    slug: "misty-forest-vertical",
    title: "Misty Morning Forest",
    description: "Serene morning fog rolling through a dense pine forest, optimized for iPhone and Android.",
    imageUrl: `https://picsum.photos/seed/mobile2/1080/1920`,
    category: 'Phone',
    subCategory: 'Nature',
    width: 1080,
    height: 1920,
    extension: 'jpg'
  },
  {
    id: 5,
    slug: "tablet-minimal-mountains",
    title: "Minimalist Mountains",
    description: "Clean vector-style mountain range for tablets and iPads.",
    imageUrl: `https://picsum.photos/seed/tablet1/2048/2732`,
    category: 'Tablet',
    subCategory: 'Minimalist',
    width: 2048,
    height: 2732,
    extension: 'jpg'
  }
];

export const WALLPAPER_DATA: Record<Category, Wallpaper[]> = {
  'Home': MY_IMAGES, 
  'Desktop': MY_IMAGES.filter(img => img.category === 'Desktop'),
  'Phone': MY_IMAGES.filter(img => img.category === 'Phone'),
  'Tablet': MY_IMAGES.filter(img => img.category === 'Tablet'),
};

export const ICON_PACK_DATA = [];