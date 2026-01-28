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
  },
  {
    id: 7,
    slug: "neon-donuts-desert-night",
    title: "Neon Donuts Desert Night",
    description: "A vibrant digital art piece featuring neon donuts in a desert setting at night. Perfect for 4K desktop screens.",
    imageUrl: `${R2_BASE_URL}/Desktop/Digital%20Art/neon-donuts-to-go-desert-night.webp`,
    category: 'Desktop',
    subCategory: 'Digital Art',
    width: 3840,
    height: 2160,
    extension: 'webp'
  },
  {
    id: 8,
    slug: "neon-playstation-symbols",
    title: "Neon PlayStation Symbols",
    description: "Glowing neon PlayStation symbols set against a dark concrete wall, ideal for any gaming setup.",
    imageUrl: `${R2_BASE_URL}/Desktop/Gaming/neon-playstation-symbols-concrete-wall.webp`,
    category: 'Desktop',
    subCategory: 'Gaming',
    width: 3840,
    height: 2160,
    extension: 'webp'
  },
  {
    id: 9,
    slug: "penguin-iceberg-milky-way",
    title: "Penguin Iceberg Milky Way",
    description: "A majestic penguin standing on an iceberg under the Milky Way in Antarctica. Stunning phone wallpaper.",
    imageUrl: `${R2_BASE_URL}/Phone/Animals/penguin-iceberg-milky-way-antarctica.webp`,
    category: 'Phone',
    subCategory: 'Animals',
    width: 1080,
    height: 2340,
    extension: 'webp'
  },
  {
    id: 10,
    slug: "red-ferrari-autumn-reflection",
    title: "Red Ferrari Autumn Reflection",
    description: "A sleek red Ferrari in a showroom with beautiful autumn reflections. High-resolution car wallpaper for mobile.",
    imageUrl: `${R2_BASE_URL}/Phone/Cars/red-ferrari-showroom-autumn-reflection.webp`,
    category: 'Phone',
    subCategory: 'Cars',
    width: 1080,
    height: 2340,
    extension: 'webp'
  },
  {
    id: 11,
    slug: "autumn-leaves-sunset-forest",
    title: "Autumn Leaves Sunset Forest",
    description: "Golden autumn leaves and a serene forest path at sunset. A peaceful seasonal background for your tablet.",
    imageUrl: `${R2_BASE_URL}/Tablet/Seasons/autumn-leaves-sunset-forest-path.webp`,
    category: 'Tablet',
    subCategory: 'Seasons',
    width: 2048,
    height: 2732,
    extension: 'webp'
  },
  {
    id: 12,
    slug: "outdoor-basketball-court-night",
    title: "Outdoor Basketball Court Night",
    description: "An outdoor basketball court illuminated by moonlight at night. Dynamic sports theme for tablet screens.",
    imageUrl: `${R2_BASE_URL}/Tablet/Sports/outdoor-basketball-court-night-moonlight.webp`,
    category: 'Tablet',
    subCategory: 'Sports',
    width: 2048,
    height: 2732,
    extension: 'webp'
  },
  {
    id: 13,
    slug: "never-give-up-create-future",
    title: "Never Give Up Quote",
    description: "Inspirational 'Never Give Up' quote wallpaper for your desktop. High-quality 4K typography.",
    imageUrl: `${R2_BASE_URL}/Desktop/Quotes/never-give-up-create-your-own-future.webp`,
    category: 'Desktop',
    subCategory: 'Quotes',
    width: 3840,
    height: 2160,
    extension: 'webp'
  },
  {
    id: 14,
    slug: "samurai-warrior-tall-grass",
    title: "Samurai Warrior in Tall Grass",
    description: "An epic anime-style samurai warrior standing in tall grass. Stunning 4K desktop background.",
    imageUrl: `${R2_BASE_URL}/Desktop/Anime/samurai-warrior-standing-in-tall-grass.webp`,
    category: 'Desktop',
    subCategory: 'Anime',
    width: 3840,
    height: 2160,
    extension: 'webp'
  },
  {
    id: 15,
    slug: "parthenon-acropolis-athens-sunset",
    title: "Parthenon Acropolis Sunset",
    description: "A breathtaking sunset view of the Parthenon in Athens. Historical culture wallpaper for phone.",
    imageUrl: `${R2_BASE_URL}/Phone/Culture/parthenon-acropolis-athens-sunset-view.webp`,
    category: 'Phone',
    subCategory: 'Culture',
    width: 1080,
    height: 2340,
    extension: 'webp'
  },
  {
    id: 16,
    slug: "cute-cartoon-cat-peace-sign",
    title: "Cute Cartoon Cat Peace Sign",
    description: "A cute grey cartoon cat showing a peace sign. Fun and playful wallpaper for kids' phones.",
    imageUrl: `${R2_BASE_URL}/Phone/Kids/cute-grey-cartoon-cat-peace-sign.webp`,
    category: 'Phone',
    subCategory: 'Kids',
    width: 1080,
    height: 2340,
    extension: 'webp'
  },
  {
    id: 17,
    slug: "mountain-cabin-lake-reflection",
    title: "Mountain Cabin Lake Reflection",
    description: "Serene mountain cabin with a perfect lake reflection in the Dolomites. Beautiful 4K Nature tablet wallpaper.",
    imageUrl: `${R2_BASE_URL}/Tablet/Nature/mountain-cabin-lake-reflection-dolomites.webp`,
    category: 'Tablet',
    subCategory: 'Nature',
    width: 2048,
    height: 2732,
    extension: 'webp'
  },
  {
    id: 18,
    slug: "saturn-rings-minimalist-bw",
    title: "Saturn Rings Minimalist B&W",
    description: "Minimalist black and white view of Saturn's rings in space. Clean aesthetic for tablet screens.",
    imageUrl: `${R2_BASE_URL}/Tablet/Space/saturn-rings-minimalist-bw-space.webp`,
    category: 'Tablet',
    subCategory: 'Space',
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