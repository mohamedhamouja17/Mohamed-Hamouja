import React, { useState, useEffect, useRef } from 'react';
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
  const [isBlobReady, setIsBlobReady] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('Detecting node...');
  const [error, setError] = useState<string | null>(null);
  
  const fetchInitiated = useRef(false);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTimerFinished(true);
    }
  }, [timeLeft]);

  // Pre-fetch logic: Start fetching as soon as the component mounts
  useEffect(() => {
    if (fetchInitiated.current) return;
    fetchInitiated.current = true;

    const folder = deviceType === 'Home' ? 'Desktop' : deviceType;
    const cleanImageName = imageName.trim();
    const cleanCategory = categoryName.trim();
    const finalUrl = `${R2_BASE_URL}/${folder}/${cleanCategory}/${cleanImageName}.${extension}`;

    const fetchImageAsBlob = async () => {
      try {
        const response = await fetch(finalUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setBlobUrl(url);
        setIsBlobReady(true);
      } catch (err) {
        console.error("Failed to pre-fetch wallpaper blob:", err);
        setError("Direct link secured. Ready for standard download.");
        // Fallback: we'll use the direct URL if blob pre-fetch fails
        setBlobUrl(finalUrl);
        setIsBlobReady(true);
      }
    };

    fetchImageAsBlob();

    // Cleanup object URL on unmount to prevent memory leaks
    return () => {
      if (blobUrl && blobUrl.startsWith('blob:')) {
        window.URL.revokeObjectURL(blobUrl);
      }
    };
  }, [deviceType, categoryName, imageName, extension]);

  // Node detection logic
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

  const handleDownloadClick = () => {
    if (!isTimerFinished || !blobUrl) return;

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${imageName.trim()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    
    // Minimal cleanup delay
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 100);
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
            {isTimerFinished && isBlobReady 
              ? `Your 4K ${extension.toUpperCase()} is Ready!` 
              : isBlobReady ? "Preparing high-quality file..." : "Securing direct link..."}
          </h3>
          <p className="text-gray-500 text-sm">
            {isTimerFinished && isBlobReady 
              ? `Verified download node: ${location}` 
              : error ? error : `Securing direct link... ${timeLeft}s remaining.`}
          </p>
        </div>

        <div className="w-full flex flex-col items-center">
          {(!isTimerFinished || !isBlobReady) ? (
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-400 font-bold py-5 px-8 rounded-2xl border border-gray-200">
                <div className="h-5 w-5 border-2 border-gray-300 border-t-gray-500 animate-spin rounded-full"></div>
                <span>Download Locked ({timeLeft}s)</span>
              </div>
              
              {/* Progress feedback */}
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-orange-400 h-full transition-all duration-500 ease-linear"
                  style={{ width: `${((COUNTDOWN_SECONDS - timeLeft) / COUNTDOWN_SECONDS) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest text-center">
                {isBlobReady ? "Pre-fetch Complete" : "Caching assets..."}
              </p>
            </div>
          ) : (
            <button
              onClick={handleDownloadClick}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-5 px-8 rounded-2xl shadow-2xl shadow-orange-500/30 transition-all transform hover:scale-[1.02] active:scale-95 text-lg"
            >
              <DownloadIcon className="h-7 w-7" />
              <span>Download Instant 4K {extension.toUpperCase()}</span>
            </button>
          )}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full border border-green-100">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Secured via Walzoo CDN</span>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;