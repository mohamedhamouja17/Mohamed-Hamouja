
import React from 'react';
import SubscriptionCTA from './SubscriptionCTA';
import PhoneWallpaperSlideshow from './PhoneWallpaperSlideshow';
import DesktopWallpaperSlideshow from './DesktopWallpaperSlideshow';
import { type Wallpaper } from '../types';

interface HomePageContentProps {
  onSubscribeClick: () => void;
  onDownloadClick: (wallpaper: Wallpaper) => void;
}

const HomePageContent: React.FC<HomePageContentProps> = ({ onSubscribeClick, onDownloadClick }) => {
  return (
    <div className="mt-10">
      <div className="text-center mb-12 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 mb-4 leading-tight" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Download Stunning 4K Wallpapers for All Your Devices
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Discover high-quality backgrounds for Mobile, Tablet, and Desktop — updated daily.
        </p>
      </div>

      <PhoneWallpaperSlideshow onDownloadClick={onDownloadClick} />
      
      <DesktopWallpaperSlideshow onDownloadClick={onDownloadClick} />

      <SubscriptionCTA onSubscribeClick={onSubscribeClick} />
    </div>
  );
};

export default HomePageContent;
