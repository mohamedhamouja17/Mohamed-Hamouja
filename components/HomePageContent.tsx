import React from 'react';
import { WALLPAPER_DATA, ICON_PACK_DATA } from '../constants';
import WallpaperCard from './WallpaperCard';
import IconPackCard from './IconPackCard';
import SubscriptionCTA from './SubscriptionCTA';

interface HomePageContentProps {
  onSubscribeClick: () => void;
}

interface HomeSectionProps {
  title: string;
  children: React.ReactNode;
}

const HomeSection: React.FC<HomeSectionProps> = ({ title, children }) => (
  <section>
    <div className="text-center mb-6">
      <h2
        className="text-2xl sm:text-4xl text-gray-800"
        style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700 }}
      >
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const HomePageContent: React.FC<HomePageContentProps> = ({ onSubscribeClick }) => {
  return (
    <div className="mt-10 space-y-12">
      <HomeSection title="Phone Fun Wallpapers">
        <div className="flex overflow-x-auto space-x-6 pb-4 custom-scrollbar">
          {WALLPAPER_DATA['Phone Fun'].slice(0, 8).map(wallpaper => (
            <div key={wallpaper.id} className="w-40 sm:w-44 flex-shrink-0">
              <WallpaperCard wallpaper={wallpaper} showDownloadButton={false} />
            </div>
          ))}
        </div>
      </HomeSection>

      <HomeSection title="Desktop Fun Wallpapers">
        <div className="flex overflow-x-auto space-x-6 pb-4 custom-scrollbar">
          {WALLPAPER_DATA['Desktop Fun'].slice(0, 6).map(wallpaper => (
             <div key={wallpaper.id} className="w-72 sm:w-80 flex-shrink-0">
              <WallpaperCard wallpaper={wallpaper} showDownloadButton={false} />
            </div>
          ))}
        </div>
      </HomeSection>

      <HomeSection title="Big Screen Fun Wallpapers">
        <div className="flex overflow-x-auto space-x-6 pb-4 custom-scrollbar">
          {WALLPAPER_DATA['Big Screen Fun'].slice(0, 6).map(wallpaper => (
             <div key={wallpaper.id} className="w-80 sm:w-96 flex-shrink-0">
              <WallpaperCard wallpaper={wallpaper} showDownloadButton={false} />
            </div>
          ))}
        </div>
      </HomeSection>
      
      <HomeSection title="Tablet Fun Wallpapers">
        <div className="flex overflow-x-auto space-x-6 pb-4 custom-scrollbar">
          {WALLPAPER_DATA['Tablet Fun'].slice(0, 6).map(wallpaper => (
             <div key={wallpaper.id} className="w-60 sm:w-64 flex-shrink-0">
              <WallpaperCard wallpaper={wallpaper} showDownloadButton={false} />
            </div>
          ))}
        </div>
      </HomeSection>

      <HomeSection title="Cute Icons">
        <div className="flex overflow-x-auto space-x-6 pb-4 custom-scrollbar">
          {ICON_PACK_DATA.slice(0, 6).map(pack => (
             <div key={pack.id} className="w-64 sm:w-72 flex-shrink-0">
              <IconPackCard pack={pack} showDownloadButton={false} />
            </div>
          ))}
        </div>
      </HomeSection>

      <SubscriptionCTA onSubscribeClick={onSubscribeClick} />
    </div>
  );
};

export default HomePageContent;