
import React, { useState, useEffect } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface DownloadSectionProps {
  imageUrl: string;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ imageUrl }) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsReady(true);
    }
  }, [timeLeft]);

  const handleFinalDownload = () => {
    // In a real app, this calls your Secure Download Handler (Cloudflare Worker/PHP)
    // Example: fetch('/api/secure-download?img=' + imageUrl)
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'walzoo-wallpaper.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-2xl border-2 border-orange-100 shadow-inner animate-fade-in">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Preparing your high-quality wallpaper...
        </h3>

        {/* Ad Placeholder */}
        <div className="w-full max-w-lg aspect-video bg-gray-100 rounded-xl mb-6 flex flex-col items-center justify-center border border-dashed border-gray-300 relative overflow-hidden">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 absolute top-2">Advertisement</span>
          <div className="text-gray-400 text-sm px-10 text-center italic">
            Your download supports our free service. 
            <br />
            Please wait while the file is encrypted for security.
          </div>
          {/* Real ad scripts would be injected here */}
        </div>

        {!isReady ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40" cy="40" r="36"
                  stroke="currentColor" strokeWidth="4"
                  fill="transparent" className="text-gray-100"
                />
                <circle
                  cx="40" cy="40" r="36"
                  stroke="currentColor" strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={226}
                  strokeDashoffset={226 - (226 * (20 - timeLeft)) / 20}
                  className="text-orange-500 transition-all duration-1000 ease-linear"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-orange-600">
                {timeLeft}
              </span>
            </div>
            <p className="text-gray-500 font-medium animate-pulse">
              Your secure link will be ready in {timeLeft} seconds.
            </p>
          </div>
        ) : (
          <div className="w-full text-center animate-bounce-in">
             <p className="text-green-600 font-bold mb-4">Link Securely Generated!</p>
             <button
              onClick={handleFinalDownload}
              className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95"
            >
              <DownloadIcon className="h-6 w-6" />
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
