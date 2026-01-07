
import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, imageUrl }) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [canDownload, setCanDownload] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setTimeLeft(15);
      setCanDownload(false);
      setIsDownloading(false);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanDownload(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      // Use fetch to get the image as a blob
      // mode: 'cors' works because the R2 bucket has CORS '*' enabled
      const response = await fetch(imageUrl, {
        method: 'GET',
        mode: 'cors',
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Extract filename from URL or default
      const filename = imageUrl.split('/').pop() || 'walzoo-wallpaper.png';

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed, using fallback:", error);
      // Fallback: opens in a new tab if blob fetch fails
      window.open(imageUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Background */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-scale">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 p-1 bg-white/50 rounded-full"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="p-6 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-sans">
            Download Content
          </h2>

          {/* Ad Block */}
          <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center mb-6 relative overflow-hidden group">
            <span className="text-gray-400 font-semibold tracking-widest text-sm uppercase mb-2">Advertisement</span>
            <div className="text-xs text-gray-400 px-8">
              Support us by viewing this ad while we prepare your download.
            </div>
            {/* Simulation of ad content */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-gray-100 opacity-50 pointer-events-none"></div>
          </div>

          {/* Countdown / Download Section */}
          <div className="w-full min-h-[80px] flex flex-col items-center justify-center">
            {!canDownload ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-12 w-12 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin mx-auto mb-2"></div>
                <p className="text-gray-600 font-medium">
                  Please wait <span className="text-orange-600 font-bold text-xl mx-1">{timeLeft}</span> seconds...
                </p>
                <p className="text-xs text-gray-400">Preparing high-quality file</p>
              </div>
            ) : (
              <div className="w-full animate-fade-in">
                <p className="text-green-600 font-semibold mb-3">Your download is ready!</p>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-orange-500/30 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-75"
                >
                  {isDownloading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                  ) : (
                    <DownloadIcon className="h-5 w-5" />
                  )}
                  <span>{isDownloading ? 'Processing...' : 'Download Now'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
           <p className="text-xs text-gray-400">
             By downloading, you agree to our <span className="underline cursor-pointer hover:text-gray-600">Terms of Service</span>.
           </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out forwards;
        }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DownloadModal;
