import React from 'react';
import { type Wallpaper } from '../types.ts';
import WallpaperCard from './WallpaperCard.tsx';
import { WALLPAPER_DATA } from '../constants.ts';

interface PhoneWallpaperSlideshowProps {
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const PhoneWallpaperSlideshow: React.FC<PhoneWallpaperSlideshowProps> = ({ onWallpaperSelect }) => {
  const wallpapers = WALLPAPER_DATA['Phone'].slice(0, 4);

  return (
    <div className="mt-8 relative px-4 max-w-7xl mx-auto">
      <div className="flex gap-4 overflow-x-auto pb-8 pt-2 px-2 snap-x snap-mandatory no-scrollbar">
        {wallpapers.map((wallpaper) => (
            <div key={wallpaper.id} className="min-w-[180px] sm:min-w-[220px] max-w-[220px] snap-center">
                <WallpaperCard 
                  wallpaper={wallpaper} 
                  onSelect={() => onWallpaperSelect(wallpaper)}
                />
            </div>
        ))}
      </div>
    </div>
  );
};

export default PhoneWallpaperSlideshow;