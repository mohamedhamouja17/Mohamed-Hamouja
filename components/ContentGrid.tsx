import React, { useState } from 'react';
import { type Category, type OperatingSystem } from '../types';
import { WALLPAPER_DATA, ICON_PACK_DATA } from '../constants';
import WallpaperCard from './WallpaperCard';
import IconPackCard from './IconPackCard';
import HomePageContent from './HomePageContent';
import AppIconsSubNav from './AppIconsSubNav';

interface ContentGridProps {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
  onSubscribeClick: () => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ activeCategory, setActiveCategory, onSubscribeClick }) => {
  const [activeOs, setActiveOs] = useState<OperatingSystem>('Android');

  if (activeCategory === 'Home') {
    return <HomePageContent onSubscribeClick={onSubscribeClick} />;
  }

  if (activeCategory === 'App Icons') {
    const filteredPacks = ICON_PACK_DATA.filter(pack => pack.os === activeOs);
    return (
      <>
        <AppIconsSubNav activeOs={activeOs} setActiveOs={setActiveOs} />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPacks.map(pack => <IconPackCard key={pack.id} pack={pack} />)}
        </div>
      </>
    );
  }

  let gridClasses: string;
  if (activeCategory === 'PC') {
    gridClasses = "mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
  } else if (activeCategory === 'Tablet') {
    gridClasses = "mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
  } else if (activeCategory === 'TV') {
    gridClasses = "mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
  } else { // For 'Phone'
    gridClasses = "mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6";
  }
  
  const wallpapers = WALLPAPER_DATA[activeCategory as Exclude<Category, 'App Icons' | 'Home'>];

  return (
    <div className={gridClasses}>
      {wallpapers.map(wallpaper => <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />)}
    </div>
  );
};

export default ContentGrid;