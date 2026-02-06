
import React from 'react';
import { type Category, type Wallpaper } from '../types.ts';
import { WALLPAPER_DATA } from '../constants.ts';
import WallpaperCard from './WallpaperCard.tsx';
import HomePageContent from './HomePageContent.tsx';

interface ContentGridProps {
  activeCategory: Category;
  activeSubCategory: string;
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
  currentPage: number;
  itemsPerPage: number;
}

const ContentGrid: React.FC<ContentGridProps> = ({ 
  activeCategory, 
  activeSubCategory, 
  onWallpaperSelect,
  currentPage,
  itemsPerPage
}) => {
  if (activeCategory === 'Home') {
    return <HomePageContent onWallpaperSelect={onWallpaperSelect} />;
  }

  // 1. Get wallpapers for the current device category
  const deviceWallpapers = WALLPAPER_DATA[activeCategory] || [];

  // 2. Filter by subcategory theme (Nature, Space, etc.)
  const filteredWallpapers = activeSubCategory === 'All' 
    ? deviceWallpapers 
    : deviceWallpapers.filter(w => w.subCategory === activeSubCategory);

  // 3. Paginate the filtered results
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWallpapers = filteredWallpapers.slice(startIndex, startIndex + itemsPerPage);

  // Responsive Grid Logic based on Category
  const getGridClasses = () => {
    const baseClasses = "mt-10 grid";
    
    if (activeCategory === 'Phone') {
      // Per Requirement: Phone View strictly 5 columns (grid-cols-5) as shown in images
      return `${baseClasses} grid-cols-5 gap-2 sm:gap-4 lg:gap-6`;
    }
    
    if (activeCategory === 'Tablet') {
      // Tablet: 4 columns
      return `${baseClasses} grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8`;
    }
    
    // Desktop: 2 columns on large screens as per previous update
    return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-10`;
  };

  return (
    <div className="min-h-[400px]">
      {paginatedWallpapers.length > 0 ? (
        <div className={getGridClasses()}>
          {paginatedWallpapers.map(wallpaper => (
            <WallpaperCard 
              key={`${wallpaper.id}-${wallpaper.subCategory}-${wallpaper.category}`} 
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
          <p className="text-gray-500 mt-2">We haven't added any {activeSubCategory} wallpapers for {activeCategory} yet on this page.</p>
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
