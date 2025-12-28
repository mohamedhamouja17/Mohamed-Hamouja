
import React, { useRef } from 'react';
import { type Wallpaper } from '../types';
import WallpaperCard from './WallpaperCard';
import { WALLPAPER_DATA } from '../constants';

interface PhoneWallpaperSlideshowProps {
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const PhoneWallpaperSlideshow: React.FC<PhoneWallpaperSlideshowProps> = ({ onWallpaperSelect }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wallpapers = WALLPAPER_DATA['Phone'].slice(0, 10); // Show a few more

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = current.clientWidth * 0.8; 
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  };

  return (
    <div className="mt-12 relative px-4 max-w-7xl mx-auto">
      <div className="relative flex flex-col sm:flex-row items-center justify-between mb-8 px-2">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Baloo 2', cursive" }}>
           Phone Wallpapers
        </h2>
        <div className="flex gap-2 mt-4 sm:mt-0">
            <button onClick={() => scroll('left')} className="p-2 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-orange-50 hover:text-orange-500 transition-all text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => scroll('right')} className="p-2 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-orange-50 hover:text-orange-500 transition-all text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
      </div>
      <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-8 pt-2 px-2 snap-x snap-mandatory no-scrollbar">
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
