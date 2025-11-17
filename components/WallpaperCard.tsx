import React from 'react';
import { type Wallpaper } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  showDownloadButton?: boolean;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper, showDownloadButton = true }) => {
  return (
    <div className="bg-[#2a2a2a] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 flex flex-col">
      <img
        src={wallpaper.imageUrl}
        alt="Wallpaper"
        className="w-full h-auto object-cover"
      />
      {showDownloadButton && (
        <div className="p-3">
          <button className="flex items-center justify-center gap-2 w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
            <DownloadIcon className="h-4 w-4" />
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default WallpaperCard;
