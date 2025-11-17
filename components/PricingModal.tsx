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

const goldenFeatures = [
  { icon: KeyIcon, text: "Full Year of Unlimited Access" },
  { icon: DiamondIcon, text: "Exclusive Wallpapers up to 8K" },
  { icon: DevicesIcon, text: "Optimized for PC, TV, Mobile & Tablet" },
  { icon: SparklesIcon, text: "Universal Icons for All Operating Systems" },
  { icon: ShieldCheckIcon, text: "New Exclusive Content Weekly" },
];

const PricingModal: React.FC<PricingModalProps> = ({ onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-[#1f1f1f] rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 text-white relative animate-fade-in-scale max-h-[90vh] overflow-y-auto custom-scrollbar border border-yellow-500/30">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-500 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                The Golden Annual Subscription
            </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Personalize every device with exclusive, ultra-high-quality content.</p>
        </div>

        <div className="bg-[#2a2a2a] p-6 rounded-lg border border-yellow-500/50 flex flex-col items-center">
            <ul className="space-y-4 mb-8 text-base w-full">
              {goldenFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <feature.icon className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature.text}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-gray-400 text-sm">Subscribe now and get all this for:</p>
            <p className="my-2">
                <span className="text-4xl sm:text-5xl font-bold text-white">$12.40</span>
                <span className="text-gray-400 text-lg"> / Annually</span>
            </p>
            <p className="text-yellow-400 text-sm font-semibold mb-6">(That's less than $1.04 per month!)</p>
            
            <button className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold py-3.5 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20">
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
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4a4a4a;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #5a5a5a;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PricingModal;