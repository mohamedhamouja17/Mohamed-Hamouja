
import React, { useRef } from 'react';
import { type Wallpaper } from '../types';
import WallpaperCard from './WallpaperCard';

const PHONE_WALLPAPERS: Wallpaper[] = [
  { id: 101, imageUrl: "https://img.sanishtech.com/u/1ce5cff40fdcdeadbfec17d0c4e7f960.png" },
  { id: 102, imageUrl: "https://img.sanishtech.com/u/ac6db561ec7f59fad27ffacd1a809970.png" },
  { id: 103, imageUrl: "https://img.sanishtech.com/u/1fca88d62f06407dc8830c1de6bbb54f.png" },
];

interface PhoneWallpaperSlideshowProps {
  onDownloadClick: (wallpaper: Wallpaper) => void;
}

const PhoneWallpaperSlideshow: React.FC<PhoneWallpaperSlideshowProps> = ({ onDownloadClick }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = 320; 
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  };

  return (
    <div className="mt-12 relative px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800" style={{ fontFamily: "'Baloo 2', cursive" }}>
           Phone Wallpapers
        </h2>
        {/* Navigation Arrows */}
        <div className="flex gap-2">
            <button 
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-white shadow hover:shadow-md border border-gray-100 hover:bg-orange-50 transition-colors group"
                aria-label="Scroll left"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button 
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white shadow hover:shadow-md border border-gray-100 hover:bg-orange-50 transition-colors group"
                aria-label="Scroll right"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PHONE_WALLPAPERS.map((wallpaper) => (
            <div key={wallpaper.id} className="min-w-[280px] sm:min-w-[320px] snap-center transform transition-transform duration-300 hover:scale-[1.01]">
                <WallpaperCard 
                    wallpaper={wallpaper} 
                    onDownloadClick={onDownloadClick} 
                />
            </div>
        ))}
        {/* Spacer for right padding visual */}
        <div className="min-w-[1px]"></div>
      </div>
    </div>
  );
};

export default PhoneWallpaperSlideshow;
