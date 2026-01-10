import React from 'react';
import SubscriptionCTA from './SubscriptionCTA.tsx';
import PhoneWallpaperSlideshow from './PhoneWallpaperSlideshow.tsx';
import DesktopWallpaperSlideshow from './DesktopWallpaperSlideshow.tsx';
import TabletWallpaperSlideshow from './TabletWallpaperSlideshow.tsx';
import { type Wallpaper } from '../types.ts';

interface HomePageContentProps {
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const HomePageContent: React.FC<HomePageContentProps> = ({ onWallpaperSelect }) => {
  return (
    <div className="mt-10 space-y-20 pb-20">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 mb-6 leading-tight" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Download Stunning 4K Wallpapers for All Your Devices
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
          Discover high-quality backgrounds for Mobile, Tablet, and Desktop — 100% Free.
        </p>
      </div>

      {/* Main CTA */}
      <SubscriptionCTA />

      {/* Section: Desktop */}
      <section>
        <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
                Desktop Backgrounds
            </h2>
            <p className="text-sm text-gray-400 font-semibold uppercase tracking-widest">Ultra HD 4K</p>
        </div>
        <DesktopWallpaperSlideshow onWallpaperSelect={onWallpaperSelect} />
      </section>

      {/* Section: Mobile */}
      <section>
        <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
                Phone Wallpapers
            </h2>
            <p className="text-sm text-gray-400 font-semibold uppercase tracking-widest">OLED Optimized</p>
        </div>
        <PhoneWallpaperSlideshow onWallpaperSelect={onWallpaperSelect} />
      </section>

      {/* Section: Tablet */}
      <section>
        <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
                Tablet Art
            </h2>
            <p className="text-sm text-gray-400 font-semibold uppercase tracking-widest">Hi-Res Displays</p>
        </div>
        <TabletWallpaperSlideshow onWallpaperSelect={onWallpaperSelect} />
      </section>
    </div>
  );
};

export default HomePageContent;