
export const CATEGORIES = ['Home', 'Desktop', 'Phone', 'Tablet'] as const;
export type Category = typeof CATEGORIES[number];

export const OPERATING_SYSTEMS = ['Android', 'iOS', 'Windows', 'Mac'] as const;
export type OperatingSystem = typeof OPERATING_SYSTEMS[number];

export interface Wallpaper {
  id: number;
  imageUrl: string;
}

export interface IconPack {
  id: number;
  imageUrl: string;
  title: string;
  count: number;
  os: OperatingSystem;
}
