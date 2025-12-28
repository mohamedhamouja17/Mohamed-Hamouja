
import React from 'react';
import SubscriptionCTA from './SubscriptionCTA';
import { type Wallpaper } from '../types';

interface HomePageContentProps {
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const HomePageContent: React.FC<HomePageContentProps> = ({ onWallpaperSelect }) => {
  return (
    <div className="mt-10">
      <div className="text-center mb-8 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 mb-4 leading-tight" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Download Stunning 4K Wallpapers for All Your Devices
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Discover high-quality backgrounds for Mobile, Tablet, and Desktop — 100% Free.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-white/50 transition-transform hover:scale-[1.01] duration-500">
          <img 
            src="https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/WALZOO-WALLPAPER-imagetourl.cloud-1766944607220-9ks1r4.png" 
            alt="Walzoo Wallpaper Collection Preview" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <SubscriptionCTA />
    </div>
  );
};

export default HomePageContent;
