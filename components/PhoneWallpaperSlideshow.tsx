
import React from 'react';
import { type Wallpaper } from '../types';
import WallpaperCard from './WallpaperCard';
import { WALLPAPER_DATA } from '../constants';

interface PhoneWallpaperSlideshowProps {
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const PhoneWallpaperSlideshow: React.FC<PhoneWallpaperSlideshowProps> = ({ onWallpaperSelect }) => {
  const wallpapers = WALLPAPER_DATA['Phone'].slice(0, 4); // Limited to 4 images

  return (
    <div className="mt-12 relative px-4 max-w-7xl mx-auto">
      <div className="relative flex items-center mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-orange-500 rounded-full shadow-sm"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Baloo 2', cursive" }}>
             Phone Wallpapers
          </h2>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-8 pt-2 px-2 snap-x snap-mandatory no-scrollbar">
        {wallpapers.map((wallpaper) => (
            <div key={wallpaper.id} className="min-w-[180px] sm:min-w-[220px] max-w-[220px] snap-center">
                <WallpaperCard wallpaper={wallpaper} onViewClick={onWallpaperSelect} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default PhoneWallpaperSlideshow;
