
import React, { useState, useEffect } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface DownloadSectionProps { imageUrl: string; }

const DownloadSection: React.FC<DownloadSectionProps> = ({ imageUrl }) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [isReady, setIsReady] = useState(false);
  const [location, setLocation] = useState<string>('Detecting location...');

  useEffect(() => {
    // Timer set to 20 seconds
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsReady(true);
    }
  }, [timeLeft]);

  useEffect(() => {
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
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'walzoo-wallpaper.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // SVG Circle calculations
  const radius = 50;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - ((20 - timeLeft) / 20) * circumference;

  return (
    <div className="mt-8 p-4 sm:p-10 bg-[#FAFBFC] rounded-[2.5rem] border border-orange-100/50 shadow-sm animate-fade-in">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-700 mb-8">
          Preparing your high-quality wallpaper...
        </h3>

        {/* Ad Box */}
        <div className="w-full max-w-2xl bg-[#F3F4F6]/50 rounded-2xl mb-10 flex flex-col items-center justify-center border border-gray-200 py-12 relative overflow-hidden group">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 absolute top-4">ADVERTISEMENT</span>
          <div className="text-gray-400 text-sm px-10 text-center leading-relaxed">
            Your download supports our free service. 
            <br />
            <span className="italic text-xs">Please wait while the file is encrypted for security.</span>
          </div>
        </div>

        {!isReady ? (
          <div className="flex flex-col items-center gap-8">
            {/* Enhanced Counter UI */}
            <div className="relative inline-flex items-center justify-center">
              <svg 
                height={radius * 2} 
                width={radius * 2} 
                className="transform -rotate-90 drop-shadow-sm"
              >
                {/* Background Ring */}
                <circle
                  stroke="#F3F4F6"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                {/* Progress Ring with Gradient */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FB923C" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
                <circle
                  stroke="url(#gradient)"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset, strokeLinecap: 'round' }}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              {/* Central Number */}
              <span className="absolute text-4xl font-bold text-gray-800 tracking-tighter">
                {timeLeft}
              </span>
            </div>
            
            <div className="text-center">
              <p className="text-gray-500 font-bold text-base mb-3">
                Your secure link will be ready in {timeLeft} seconds.
              </p>
              {/* Location Display */}
              <div className="inline-flex items-center justify-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm transform hover:scale-105 transition-transform duration-300">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </div>
                <span className="text-[11px] font-extrabold text-gray-600 uppercase tracking-widest">
                  {location}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full text-center animate-bounce-in">
             <div className="mb-6 flex flex-col items-center">
                <div className="bg-green-100 p-4 rounded-full mb-3 shadow-inner">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <p className="text-green-600 font-extrabold text-2xl mb-1 tracking-tight">Link Securely Generated!</p>
                <p className="text-gray-400 text-sm font-medium">Verified from {location}</p>
             </div>
             
             <button
              onClick={handleFinalDownload}
              className="w-full max-w-sm mx-auto flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-5 px-8 rounded-2xl shadow-xl shadow-orange-500/20 transition-all transform hover:scale-[1.02] active:scale-95 text-lg"
            >
              <DownloadIcon className="h-7 w-7" />
              <span>Save Wallpaper Now</span>
            </button>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default DownloadSection;
