
import React from 'react';
import { type Category, type Wallpaper } from '../types.ts';
import { WALLPAPER_DATA } from '../constants.ts';
import WallpaperCard from './WallpaperCard.tsx';

interface ContentGridProps {
  activeCategory: Category;
  activeSubCategory: string;
  currentPage: number;
  itemsPerPage: number;
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ 
  activeCategory, 
  activeSubCategory, 
  currentPage,
  itemsPerPage,
  onWallpaperSelect
}) => {
  if (activeCategory === 'Home') return null;

  const deviceWallpapers = WALLPAPER_DATA[activeCategory] || [];
  const filteredWallpapers = activeSubCategory === 'All' 
    ? deviceWallpapers 
    : deviceWallpapers.filter(w => w.subCategory === activeSubCategory);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWallpapers = filteredWallpapers.slice(startIndex, startIndex + itemsPerPage);

  const getGridClasses = () => {
    if (activeCategory === 'Desktop') {
      return "mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 animate-fade-in";
    }
    return "mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 animate-fade-in";
  };

  return (
    <div className="min-h-[400px]">
      {paginatedWallpapers.length > 0 ? (
        <div className={getGridClasses()}>
          {paginatedWallpapers.map(wallpaper => (
            <WallpaperCard 
              key={`${wallpaper.id}-${wallpaper.subCategory}-${wallpaper.category}`} 
              wallpaper={wallpaper} 
              onSelect={() => onWallpaperSelect(wallpaper)}
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
          <p className="text-gray-500 mt-2">We haven't added any {activeSubCategory} wallpapers for {activeCategory} yet on this page.</p>
        </div>
      )}
    </div>
  );
};

export default ContentGrid;
