import React from 'react';
import { CloseIcon } from './icons/CloseIcon.tsx';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import { HeartIcon } from './icons/HeartIcon.tsx';

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
            <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4">
               <SparklesIcon className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-500 leading-tight mb-3">
                Everything is Free!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed px-4">
                We believe high-quality art should be accessible to everyone. There are no subscriptions, no hidden fees, and no premium tiers.
            </p>
        </div>

        <div className="mx-4 sm:mx-6 mb-6 bg-white rounded-2xl p-6 shadow-sm border border-yellow-100">
            <p className="text-gray-700 text-center mb-6 leading-relaxed">
                Enjoy unlimited downloads of our 4K wallpapers and icon packs. If you enjoy our content, sharing Walzoo with your friends is the best way to support us!
            </p>
            
            <div className="text-center">
                <button 
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-md uppercase tracking-wider text-sm sm:text-base flex items-center justify-center gap-2"
                >
                    <HeartIcon className="h-5 w-5" />
                    <span>Start Exploring</span>
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