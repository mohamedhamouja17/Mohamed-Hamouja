import React, { useState, useEffect } from 'react';
import { DownloadIcon } from './icons/DownloadIcon.tsx';

const R2_BASE_URL = "https://cdn.walzoo.com";
const COUNTDOWN_SECONDS = 20;

interface DownloadSectionProps { 
  deviceType: string;    
  categoryName: string;  
  imageName: string;     
  extension: string;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ 
  deviceType, 
  categoryName, 
  imageName,
  extension
}) => {
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [location, setLocation] = useState<string>('Detecting node...');

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTimerFinished(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setLocation(data.city ? `${data.city}, ${data.country_code}` : 'Secure Connection');
      } catch (e) {
        setLocation('Global Cloud Node');
      }
    };
    fetchLocation();
  }, []);

  const handleManualDownload = async () => {
    if (!isTimerFinished || isDownloading) return;
    
    const folder = deviceType === 'Home' ? 'Desktop' : deviceType;
    const cleanImageName = imageName.trim();
    const cleanCategory = categoryName.trim();
    
    // Construct URL with cache-busting to force fresh CORS evaluation
    const timestamp = new Date().getTime();
    const finalUrl = `${R2_BASE_URL}/${folder}/${cleanCategory}/${cleanImageName}.${extension}?download=true&t=${timestamp}`;
    
    setIsDownloading(true);
    
    try {
      // Fetch the asset as a blob. We remove 'mode: cors' to let the browser use defaults
      // which often resolves 'Failed to fetch' issues on misconfigured CDNs.
      const response = await fetch(finalUrl);
      
      if (!response.ok) throw new Error(`Fetch failed with status: ${response.status}`);
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${cleanImageName}.${extension}`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
      }, 100);

    } catch (error) {
      console.error("Manual download failed, falling back to new tab:", error);
      // Fallback: Open in new tab if CORS prevents Blob creation
      const fallbackLink = document.createElement('a');
      fallbackLink.href = finalUrl;
      fallbackLink.target = '_blank';
      fallbackLink.rel = 'noopener noreferrer';
      fallbackLink.click();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="mt-8 p-6 sm:p-10 bg-white rounded-[2rem] border-2 border-orange-50 shadow-xl animate-fade-in max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        
        {/* Ad Placeholder */}
        <div className="w-full bg-black rounded-2xl mb-8 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden group shadow-inner">
          <div className="absolute top-4 left-4 bg-orange-500/80 text-[10px] font-bold text-white px-2 py-0.5 rounded-sm uppercase tracking-widest z-10">
            Sponsored Content
          </div>
          
          <div className="flex flex-col items-center justify-center p-8 text-center">
             <div className="mb-4 text-orange-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <p className="text-gray-400 text-sm font-medium">Video Ad Loading...</p>
             <p className="text-gray-500 text-xs mt-2 italic px-4">Support us by viewing this ad while your high-quality download prepares.</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {isTimerFinished ? `Your 4K ${extension.toUpperCase()} is Ready!` : "Preparing high-quality file..."}
          </h3>
          <p className="text-gray-500 text-sm">
            {isTimerFinished 
              ? `Verified download node: ${location}` 
              : `Securing direct link... ${timeLeft}s remaining.`}
          </p>
        </div>

        <div className="w-full flex flex-col items-center">
          {!isTimerFinished ? (
            <div className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-400 font-bold py-5 px-8 rounded-2xl border border-gray-200">
              <div className="h-5 w-5 border-2 border-gray-300 border-t-gray-500 animate-spin rounded-full"></div>
              <span>Download Locked ({timeLeft}s)</span>
            </div>
          ) : (
            <button
              onClick={handleManualDownload}
              disabled={isDownloading}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-5 px-8 rounded-2xl shadow-2xl shadow-orange-500/30 transition-all transform hover:scale-[1.02] active:scale-95 text-lg"
            >
              {isDownloading ? (
                <div className="h-7 w-7 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
              ) : (
                <DownloadIcon className="h-7 w-7" />
              )}
              <span>{isDownloading ? 'Downloading...' : `Download ${extension.toUpperCase()}`}</span>
            </button>
          )}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full border border-green-100">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Secured via cdn.walzoo.com</span>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;