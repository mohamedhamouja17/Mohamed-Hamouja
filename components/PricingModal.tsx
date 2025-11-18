
import React from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { KeyIcon } from './icons/KeyIcon';
import { DiamondIcon } from './icons/DiamondIcon';
import { DevicesIcon } from './icons/DevicesIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface PricingModalProps {
  onClose: () => void;
}

const subscriptionFeatures = [
  { icon: KeyIcon, text: "Full Year of Unlimited Access (365 Days)" },
  { icon: DiamondIcon, text: "Exclusive Wallpaper Vault (Up to 8K)" },
  { icon: DevicesIcon, text: "Integrated Icon Bundle (All OS)" },
  { icon: SparklesIcon, text: "Brand-new designs added every week" },
  { icon: ShieldCheckIcon, text: "Fast and Secure high-speed downloads" },
];

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
      <div className="bg-amber-50 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 text-gray-900 relative animate-fade-in-scale max-h-[90vh] overflow-y-auto custom-scrollbar border-4 border-yellow-400">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-800 transition-colors z-10"
          aria-label="Close modal"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
            <h2 
              className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
                The Golden Annual Subscription Offer
            </h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
            Are you ready to personalize every device you own with exclusive, ultra-high-quality content?
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-yellow-200 flex flex-col items-center shadow-sm">
            <ul className="space-y-4 mb-8 text-sm sm:text-base w-full">
              {subscriptionFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <feature.icon className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </li>
              ))}
            </ul>
            
            <div className="text-center mb-4">
                <p className="text-gray-500 text-sm mb-1">Subscribe now and get all this for:</p>
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">$12.40</span>
                    <span className="text-gray-500 font-medium">/ Year</span>
                </div>
                <p className="text-orange-600 text-xs sm:text-sm font-bold mt-2 bg-orange-50 px-3 py-1 rounded-full inline-block">
                    Less than $1.04 per month—massive savings!
                </p>
            </div>
            
            <button className="w-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-amber-500/30 uppercase tracking-wide text-sm sm:text-base">
                Subscribe Now
            </button>
        </div>

        <style>{`
          @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 0.2s ease-out forwards;
          }
           /* Custom scrollbar for webkit browsers */
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #fcd34d;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #fbbf24;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PricingModal;
