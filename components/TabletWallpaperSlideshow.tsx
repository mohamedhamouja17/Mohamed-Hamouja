import React from 'react';
import { type Wallpaper } from '../types.ts';
import WallpaperCard from './WallpaperCard.tsx';
import { WALLPAPER_DATA } from '../constants.ts';

interface TabletWallpaperSlideshowProps {
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const TabletWallpaperSlideshow: React.FC<TabletWallpaperSlideshowProps> = ({ onWallpaperSelect }) => {
  const wallpapers = WALLPAPER_DATA['Tablet'].slice(0, 2); // Limited to 2 images

  return (
    <div className="mt-12 relative px-4 max-w-7xl mx-auto">
      <div className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 snap-x snap-mandatory no-scrollbar justify-start">
        {wallpapers.map((wallpaper) => (
            <div key={wallpaper.id} className="min-w-[280px] sm:min-w-[400px] snap-center">
                <WallpaperCard wallpaper={wallpaper} onViewClick={onWallpaperSelect} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default TabletWallpaperSlideshow;