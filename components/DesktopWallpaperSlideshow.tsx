import React from 'react';
import { type Wallpaper } from '../types.ts';
import WallpaperCard from './WallpaperCard.tsx';
import { WALLPAPER_DATA } from '../constants.ts';

interface DesktopWallpaperSlideshowProps {
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const DesktopWallpaperSlideshow: React.FC<DesktopWallpaperSlideshowProps> = ({ onWallpaperSelect }) => {
  const wallpapers = WALLPAPER_DATA['Desktop'].slice(0, 2);

  return (
    <div className="mt-12 relative px-4 max-w-[1600px] mx-auto">
      <div className="flex gap-8 overflow-x-auto pb-8 pt-2 px-2 snap-x snap-mandatory no-scrollbar justify-start">
        {wallpapers.map((wallpaper) => (
            <div key={wallpaper.id} className="min-w-[300px] sm:min-w-[600px] snap-center">
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

export default DesktopWallpaperSlideshow;