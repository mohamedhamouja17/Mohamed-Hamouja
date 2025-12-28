
import React, { useState } from 'react';
import { type Wallpaper } from '../types';
import DownloadSection from './DownloadSection';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface WallpaperPageViewProps {
  wallpaper: Wallpaper;
  onBack: () => void;
}

const WallpaperPageView: React.FC<WallpaperPageViewProps> = ({ wallpaper, onBack }) => {
  const [showDownload, setShowDownload] = useState(false);

  // Determine aspect ratio based on category to match device types
  const getAspectRatioClass = () => {
    switch (wallpaper.category) {
      case 'Phone':
        return 'aspect-[9/19.5] max-w-[320px] mx-auto'; // Tall vertical ratio
      case 'Tablet':
        return 'aspect-[3/4] max-w-[480px] mx-auto';    // Tablet portrait ratio
      case 'Desktop':
      case 'Home':
      default:
        return 'aspect-[16/9] w-full';                // Widescreen landscape
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors font-semibold group"
      >
        <span className="rotate-90 group-hover:-translate-x-1 transition-transform">
          <ChevronDownIcon className="h-5 w-5" />
        </span>
        Back to Gallery
      </button>

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
        <div className="bg-gray-50 p-4 sm:p-8 flex justify-center items-center min-h-[40vh]">
          <div className={`relative shadow-2xl rounded-2xl overflow-hidden border-4 border-white transition-all duration-500 ${getAspectRatioClass()}`}>
            <img 
              src={wallpaper.imageUrl} 
              alt={wallpaper.title}
              className="w-full h-full object-cover block"
              loading="lazy"
            />
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
              {wallpaper.width >= 3840 || wallpaper.height >= 3840 ? '4K Ultra HD' : 'HD Ready'}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {wallpaper.title}
            </h1>
            <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
               <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
               <span className="text-xs font-bold text-orange-700 uppercase tracking-widest">{wallpaper.category}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {wallpaper.description}
          </p>

          {!showDownload ? (
            <button
              onClick={() => setShowDownload(true)}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-5 px-8 rounded-2xl shadow-xl shadow-orange-500/20 transition-all transform hover:scale-[1.01] active:scale-95 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4-4v12" />
              </svg>
              <span>Download Free Wallpaper</span>
            </button>
          ) : (
            <DownloadSection imageUrl={wallpaper.imageUrl} />
          )}

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-100 pt-8 text-center">
            <div className="p-2">
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Dimensions</p>
              <p className="font-bold text-gray-800 text-sm sm:text-base">{wallpaper.width} x {wallpaper.height}</p>
            </div>
            <div className="p-2">
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Format</p>
              <p className="font-bold text-gray-800 text-sm sm:text-base">Ultra HD WebP</p>
            </div>
            <div className="p-2">
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">DPI</p>
              <p className="font-bold text-gray-800 text-sm sm:text-base">300 Optimized</p>
            </div>
            <div className="p-2">
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Usage</p>
              <p className="font-bold text-green-600 text-sm sm:text-base">Commercial Free</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperPageView;
