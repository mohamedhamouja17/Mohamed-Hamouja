
import React from 'react';
import { type Category } from '../types';
import { WALLPAPER_DATA } from '../constants';
import WallpaperCard from './WallpaperCard';
import HomePageContent from './HomePageContent';

interface ContentGridProps {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
  onSubscribeClick: () => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ activeCategory, setActiveCategory, onSubscribeClick }) => {
  if (activeCategory === 'Home') {
    return <HomePageContent onSubscribeClick={onSubscribeClick} />;
  }

  let gridClasses: string;
  if (activeCategory === 'Desktop') {
    gridClasses = "mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6";
  } else if (activeCategory === 'Tablet') {
    gridClasses = "mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
  } else { // For 'Phone'
    gridClasses = "mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6";
  }
  
  const wallpapers = WALLPAPER_DATA[activeCategory as Exclude<Category, 'Home'>];

  return (
    <div className={gridClasses}>
      {wallpapers.map(wallpaper => <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />)}
    </div>
  );
};

export default ContentGrid;
