
import React, { useRef } from 'react';
import { type Wallpaper } from '../types';
import WallpaperCard from './WallpaperCard';
import { WALLPAPER_DATA } from '../constants';

interface TabletWallpaperSlideshowProps {
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const TabletWallpaperSlideshow: React.FC<TabletWallpaperSlideshowProps> = ({ onWallpaperSelect }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wallpapers = WALLPAPER_DATA['Tablet'].slice(0, 8); 

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = 450; 
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  };

  return (
    <div className="mt-16 relative px-4 max-w-7xl mx-auto">
      <div className="relative flex flex-col sm:flex-row items-center justify-center mb-10 px-2">
        <h2 className="text-4xl font-extrabold text-blue-600 text-center tracking-wide z-10" style={{ fontFamily: "'Baloo 2', cursive" }}>
           Tablet Wallpapers
        </h2>
        <div className="flex gap-3 mt-4 sm:mt-0 sm:absolute sm:right-0 z-20">
            <button onClick={() => scroll('left')} className="p-3 rounded-full bg-white shadow-md border border-gray-100 hover:bg-blue-50 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <button onClick={() => scroll('right')} className="p-3 rounded-full bg-white shadow-md border border-gray-100 hover:bg-blue-50 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></button>
        </div>
      </div>
      <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 snap-x snap-mandatory no-scrollbar">
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
