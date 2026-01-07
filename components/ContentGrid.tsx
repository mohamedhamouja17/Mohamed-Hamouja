
import React from 'react';
import { type Category, type Wallpaper } from '../types';
import { WALLPAPER_DATA } from '../constants';
import WallpaperCard from './WallpaperCard';
import HomePageContent from './HomePageContent';

interface ContentGridProps {
  activeCategory: Category;
  activeSubCategory: string;
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ 
  activeCategory, 
  activeSubCategory, 
  onWallpaperSelect 
}) => {
  if (activeCategory === 'Home') {
    return <HomePageContent onWallpaperSelect={onWallpaperSelect} />;
  }

  // 1. Get wallpapers for the current device folder
  const deviceWallpapers = WALLPAPER_DATA[activeCategory] || [];

  // 2. Filter by theme (Nature, Space, etc.) if one is selected
  const filteredWallpapers = activeSubCategory === 'All' 
    ? deviceWallpapers 
    : deviceWallpapers.filter(w => w.subCategory === activeSubCategory);

  let gridClasses: string;
  if (activeCategory === 'Desktop') {
    gridClasses = "mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10";
  } else if (activeCategory === 'Tablet') {
    gridClasses = "mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
  } else { // For 'Phone'
    gridClasses = "mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6";
  }

  return (
    <div className="min-h-[400px]">
      {filteredWallpapers.length > 0 ? (
        <div className={gridClasses}>
          {filteredWallpapers.map(wallpaper => (
            <WallpaperCard 
              key={`${wallpaper.id}-${wallpaper.subCategory}`} 
              wallpaper={wallpaper} 
              onViewClick={onWallpaperSelect}
            />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center flex flex-col items-center">
          <div className="bg-orange-50 p-6 rounded-full mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">No Wallpapers Found</h3>
          <p className="text-gray-500 mt-2">We haven't added any {activeSubCategory} wallpapers for {activeCategory} yet.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 text-orange-500 font-bold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentGrid;
