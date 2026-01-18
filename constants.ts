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
    slug: "deer-silhouette-full-moon",
    title: "Deer Silhouette Full Moon",
    description: "A stunning deer silhouette under a full moon in a night field.",
    imageUrl: `${R2_BASE_URL}/Phone/Animals/deer-silhouette-full-moon-antlers-night-field.png`,
    category: "Phone",
    subCategory: "Animals",
    width: 1080,
    height: 1920,
    extension: "png"
  },
  {
    id: 3,
    slug: "porsche-911-gt3rs-abandoned-warehouse",
    title: "Porsche 911 GT3RS Abandoned Warehouse",
    description: "A stunning Porsche 911 GT3RS captured in an atmospheric abandoned warehouse setting. High-quality 4K Tablet Wallpaper.",
    imageUrl: `${R2_BASE_URL}/Tablet/Cars/porsche-911-gt3rs-abandoned-warehouse.png`,
    category: 'Tablet',
    subCategory: 'Cars',
    width: 2732,
    height: 2048,
    extension: 'png'
  },
  {
    id: 4,
    slug: "chevrolet-corvette-c8-olive-green",
    title: "Chevrolet Corvette C8 Olive Green",
    description: "Exotic Chevrolet Corvette C8 in a unique olive green finish. Stunning 4K automotive wallpaper for Desktop.",
    imageUrl: `${R2_BASE_URL}/Desktop/Cars/chevrolet-corvette-c8-olive-green.png`,
    category: 'Desktop',
    subCategory: 'Cars',
    width: 3840,
    height: 2160,
    extension: 'png'
  },
  {
    id: 5,
    slug: "mercedes-benz-g-class-emerald-green",
    title: "Mercedes-Benz G-Class Emerald Green",
    description: "Luxury Mercedes-Benz G-Class (G-Wagon) in an elegant emerald green finish. High-resolution 4K Desktop background.",
    imageUrl: `${R2_BASE_URL}/Desktop/Cars/mercedes-benz-g-class-emerald-green.png`,
    category: 'Desktop',
    subCategory: 'Cars',
    width: 3840,
    height: 2160,
    extension: 'png'
  },
  {
    id: 6,
    slug: "ferrari-488-pista-spider-red",
    title: "Ferrari 488 Pista Spider Red",
    description: "Breathtaking Ferrari 488 Pista Spider in classic racing red. Ultimate 4K supercar wallpaper for high-end displays.",
    imageUrl: `${R2_BASE_URL}/Desktop/Cars/ferrari-488-pista-spider-red.png`,
    category: 'Desktop',
    subCategory: 'Cars',
    width: 3840,
    height: 2160,
    extension: 'png'
  }
];

export const WALLPAPER_DATA: Record<Category, Wallpaper[]> = {
  'Home': MY_IMAGES, 
  'Desktop': MY_IMAGES.filter(img => img.category === 'Desktop'),
  'Phone': MY_IMAGES.filter(img => img.category === 'Phone'),
  'Tablet': MY_IMAGES.filter(img => img.category === 'Tablet'),
};

export const ICON_PACK_DATA = [];