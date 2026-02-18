import React from 'react';
import { Link } from 'react-router-dom';
import { type Wallpaper } from '../types.ts';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onSelect?: () => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper }) => {
  const getAspectRatioClass = () => {
    switch (wallpaper.category) {
      case 'Phone':
        return 'aspect-[9/16]'; // Real phone screen ratio
      case 'Tablet':
        return 'aspect-[3/4]';  // Standard tablet ratio
      case 'Desktop':
      case 'Home':
      default:
        return 'aspect-[16/9]'; // Wide desktop ratio
    }
  };

  return (
    <Link 
      to={`/wallpaper/${wallpaper.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 flex flex-col h-full animate-fade-in block w-full text-left"
    >
      <div className={`overflow-hidden relative ${getAspectRatioClass()} rounded-xl`}>
        <img
          src={wallpaper.imageUrl}
          alt={wallpaper.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-gray-100"
          loading="lazy"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{ WebkitTouchCallout: 'none', userSelect: 'none' }}
        />
        {/* Anti-selection overlay */}
        <div className="absolute inset-0 z-10 bg-transparent select-none" aria-hidden="true"></div>

        {/* Hover action indicator */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </div>
        </div>
        
        {/* Subtle category badge on hover */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm text-[8px] text-white rounded font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity z-30">
            {wallpaper.subCategory}
        </div>
      </div>
    </Link>
  );
};

export default WallpaperCard;