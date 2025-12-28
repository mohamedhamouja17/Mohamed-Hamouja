
import React from 'react';
import { type Wallpaper } from '../types';
import WallpaperCard from './WallpaperCard';
import { WALLPAPER_DATA } from '../constants';

interface DesktopWallpaperSlideshowProps {
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const DesktopWallpaperSlideshow: React.FC<DesktopWallpaperSlideshowProps> = ({ onWallpaperSelect }) => {
  const wallpapers = WALLPAPER_DATA['Desktop'].slice(0, 2); // Limited to 2 images

  return (
    <div className="mt-12 relative px-4 max-w-[1600px] mx-auto">
      <div className="flex gap-8 overflow-x-auto pb-8 pt-2 px-2 snap-x snap-mandatory no-scrollbar justify-start">
        {wallpapers.map((wallpaper) => (
            <div key={wallpaper.id} className="min-w-[300px] sm:min-w-[600px] snap-center">
                <WallpaperCard wallpaper={wallpaper} onViewClick={onWallpaperSelect} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopWallpaperSlideshow;
