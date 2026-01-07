
import React from 'react';
import SubscriptionCTA from './SubscriptionCTA';
import { type Wallpaper } from '../types';

interface HomePageContentProps {
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const HomePageContent: React.FC<HomePageContentProps> = ({ onWallpaperSelect }) => {
  // Constructed promo image using R2 rules
  const promoImageUrl = "https://pub-92d8986bb0cc46a58160f8926467ee4e.r2.dev/desktop/Aesthetic/promo-banner.jpg";

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
            src={promoImageUrl} 
            alt="Walzoo Wallpaper Collection Preview" 
            className="w-full h-auto object-cover min-h-[200px]"
            onError={(e) => {
              // Fallback if the specific promo banner doesn't exist yet in R2
              (e.target as HTMLImageElement).src = "https://pub-92d8986bb0cc46a58160f8926467ee4e.r2.dev/desktop/Aesthetic/desktop-v1.jpg";
            }}
          />
        </div>
      </div>

      <SubscriptionCTA />
    </div>
  );
};

export default HomePageContent;
