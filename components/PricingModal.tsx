
import React from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { KeyIcon } from './icons/KeyIcon';
import { DiamondIcon } from './icons/DiamondIcon';
import { FilesIcon } from './icons/FilesIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface PricingModalProps {
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-[#FFFBEB] rounded-3xl shadow-2xl w-full max-w-md relative animate-fade-in-scale overflow-hidden border-2 border-yellow-200">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close modal"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="pt-10 pb-6 px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-500 leading-tight mb-3">
                The Golden Annual Subscription Offer
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed px-2">
                Are you ready to personalize every device you own with exclusive, ultra-high-quality content?
            </p>
        </div>

        <div className="mx-4 sm:mx-6 mb-6 bg-white rounded-2xl p-6 shadow-sm border border-yellow-100">
            <ul className="space-y-5 text-gray-700 mb-8">
                <li className="flex items-center gap-4">
                    <KeyIcon className="h-6 w-6 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">Full Year of Unlimited Access (365 Days)</span>
                </li>
                <li className="flex items-center gap-4">
                    <DiamondIcon className="h-6 w-6 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">Exclusive Wallpaper Vault (Up to 4K)</span>
                </li>
                <li className="flex items-center gap-4">
                    <FilesIcon className="h-6 w-6 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">Integrated Icon Bundle (All OS)</span>
                </li>
                <li className="flex items-center gap-4">
                    <SparklesIcon className="h-6 w-6 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">Brand-new designs added every week</span>
                </li>
                <li className="flex items-center gap-4">
                    <ShieldCheckIcon className="h-6 w-6 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">Fast and Secure high-speed downloads</span>
                </li>
            </ul>
            
            <div className="text-center">
                <p className="text-gray-500 text-sm mb-2 font-medium">Subscribe now and get all this for:</p>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-5xl font-extrabold text-gray-900">$12.40</span>
                    <span className="text-gray-500 text-lg font-medium">/ Year</span>
                </div>
                
                <div className="inline-block bg-orange-50 px-4 py-2 rounded-full mb-6 border border-orange-100">
                    <p className="text-orange-600 text-xs sm:text-sm font-bold">
                        Less than $1.04 per month—massive savings!
                    </p>
                </div>

                <button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-md uppercase tracking-wider text-sm sm:text-base">
                    SUBSCRIBE NOW
                </button>
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
        `}</style>
      </div>
    </div>
  );
};

export default PricingModal;
