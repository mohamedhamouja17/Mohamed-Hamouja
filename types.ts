
export const CATEGORIES = ['Home', 'Desktop', 'Phone', 'Tablet'] as const;
export type Category = typeof CATEGORIES[number];

export const OPERATING_SYSTEMS = ['Android', 'iOS', 'Windows', 'Mac'] as const;
export type OperatingSystem = typeof OPERATING_SYSTEMS[number];

export interface Wallpaper {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;      // Device Category (Desktop, Phone, etc.)
  subCategory: string;   // Folder Category (e.g., Aesthetic, Nature)
  width: number;
  height: number;
  extension: 'jpg' | 'png'; // Support for both formats
}

export interface IconPack {
  id: number;
  imageUrl: string;
  title: string;
  count: number;
  os: OperatingSystem;
}
