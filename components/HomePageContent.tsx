
import React, { useState } from 'react';
import SubscriptionCTA from './SubscriptionCTA';
import { type Wallpaper } from '../types';

interface HomePageContentProps {
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const HomePageContent: React.FC<HomePageContentProps> = ({ onWallpaperSelect }) => {
  const [bannerUrl, setBannerUrl] = useState("https://pub-92d8986bb0cc46a58160f8926467ee4e.r2.dev/desktop/Aesthetic/promo-banner.jpg");
  const [fallbackCount, setFallbackCount] = useState(0);

  const handleBannerError = () => {
    if (fallbackCount === 0) {
      // Try PNG version of promo banner
      setBannerUrl("https://pub-92d8986bb0cc46a58160f8926467ee4e.r2.dev/desktop/Aesthetic/promo-banner.png");
      setFallbackCount(1);
    } else if (fallbackCount === 1) {
      // Fallback to a known mock image
      setBannerUrl("https://pub-92d8986bb0cc46a58160f8926467ee4e.r2.dev/desktop/Aesthetic/desktop-v1.jpg");
      setFallbackCount(2);
    }
  };

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
        <div className="rounded-3xl overflow-hidden shadow-xl border border-white/50 transition-transform hover:scale-[1.01] duration-500 bg-gray-100">
          <img 
            src={bannerUrl} 
            alt="Walzoo Wallpaper Collection Preview" 
            className="w-full h-auto object-cover min-h-[200px]"
            onError={handleBannerError}
          />
        </div>
      </div>

      <SubscriptionCTA />
    </div>
  );
};

export default HomePageContent;
