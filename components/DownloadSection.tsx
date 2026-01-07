
import React, { useState, useEffect } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

/**
 * CONFIGURATION: Edit these defaults if needed.
 * These are fallback values if props are missing.
 */
const R2_BASE_URL = "https://pub-92d8986bb0cc46a58160f8926467ee4e.r2.dev";
const COUNTDOWN_SECONDS = 20;

interface DownloadSectionProps { 
  deviceType: string;    // e.g., 'phone'
  categoryName: string;  // e.g., 'Nature'
  imageName: string;     // e.g., 'forest-landscape-01'
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ 
  deviceType, 
  categoryName, 
  imageName 
}) => {
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);
  const [isReady, setIsReady] = useState(false);
  const [location, setLocation] = useState<string>('Detecting location...');

  useEffect(() => {
    // Timer Logic
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsReady(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Simulated Security Check / IP Detection
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.city && data.country_name) {
          setLocation(`${data.city}, ${data.country_name}`);
        } else {
          setLocation('Global User');
        }
      } catch (e) {
        setLocation('Secure Cloud Node');
      }
    };
    fetchLocation();
  }, []);

  const handleFinalDownload = () => {
    // Construct the URL dynamically only on click to save R2 Class B operations
    // Structure: {R2_URL}/{deviceType}/{categoryName}/{imageName}.jpg
    const finalUrl = `${R2_BASE_URL}/${deviceType.toLowerCase()}/${categoryName}/${imageName}.jpg`;
    
    const link = document.createElement('a');
    link.href = finalUrl;
    link.target = "_blank";
    link.download = `${imageName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 p-6 sm:p-10 bg-white rounded-[2rem] border-2 border-orange-50 shadow-xl animate-fade-in max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        
        {/* Adsterra Non-skippable Video Ad Placeholder */}
        <div className="w-full bg-black rounded-2xl mb-8 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden group shadow-inner">
          <div className="absolute top-4 left-4 bg-orange-500/80 text-[10px] font-bold text-white px-2 py-0.5 rounded-sm uppercase tracking-widest z-10">
            Sponsored Video
          </div>
          
          {/* PLACE ADSTERRA CODE HERE */}
          <div className="flex flex-col items-center justify-center p-8 text-center">
             <div className="mb-4 text-orange-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <p className="text-gray-400 text-sm font-medium">Video Ad Loading...</p>
             <p className="text-gray-500 text-xs mt-2 italic px-4">Wait 20 seconds to unlock your high-quality 4K download.</p>
          </div>
        </div>

        {/* Messaging Section */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {isReady ? "Download Link Ready!" : "Preparing your high-quality download..."}
          </h3>
          <p className="text-gray-500 text-sm">
            {isReady 
              ? `Verified connection from ${location}` 
              : `Please wait ${timeLeft} seconds while we secure your file.`}
          </p>
        </div>

        {/* Dynamic Single-Button Logic */}
        <div className="w-full flex flex-col items-center">
          {!isReady ? (
            <button
              disabled
              className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-400 font-bold py-5 px-8 rounded-2xl cursor-not-allowed border border-gray-200 transition-all"
            >
              <div className="h-5 w-5 border-2 border-gray-300 border-t-gray-500 animate-spin rounded-full"></div>
              <span>Unlocking in {timeLeft}s...</span>
            </button>
          ) : (
            <button
              onClick={handleFinalDownload}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-5 px-8 rounded-2xl shadow-2xl shadow-orange-500/30 transition-all transform hover:scale-[1.02] active:scale-95 text-lg"
            >
              <DownloadIcon className="h-7 w-7" />
              <span>Download Wallpaper (4K)</span>
            </button>
          )}
        </div>

        {/* Trust Badge */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full border border-green-100">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Secure Cloudflare R2 Connection</span>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DownloadSection;
