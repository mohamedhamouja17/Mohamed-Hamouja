
import React from 'react';
import { type Category, type Wallpaper } from '../types';
import { WALLPAPER_DATA } from '../constants';
import WallpaperCard from './WallpaperCard';
import HomePageContent from './HomePageContent';

const ContentGrid: React.FC<ContentGridProps> = ({ activeCategory, onWallpaperSelect }) => {
  if (activeCategory === 'Home') {
    return <HomePageContent onWallpaperSelect={onWallpaperSelect} />;
  }

  let gridClasses: string;
  // Columns perfectly synced with the user's reference images
  if (activeCategory === 'Desktop') {
    // 2 columns for landscape as shown in the desktop reference
    gridClasses = "mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10";
  } else if (activeCategory === 'Tablet') {
    // 4 columns for portrait as shown in the tablet reference
    gridClasses = "mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
  } else { // For 'Phone'
    // 5 columns for tall cards as shown in the phone reference
    gridClasses = "mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6";
  }
  
  const wallpapers = WALLPAPER_DATA[activeCategory];

  return (
    <div className={gridClasses}>
      {wallpapers.map(wallpaper => (
        <WallpaperCard 
          key={wallpaper.id} 
          wallpaper={wallpaper} 
          onViewClick={onWallpaperSelect}
        />
      ))}
    </div>
  );
};

interface ContentGridProps {
  activeCategory: Category;
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

export default ContentGrid;
