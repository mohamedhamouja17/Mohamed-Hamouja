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
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-[#FFFBEB] rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-md relative animate-fade-in-scale overflow-hidden border-2 border-yellow-200">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-20 p-1 bg-white/50 rounded-full"
          aria-label="Close modal"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="pt-12 pb-8 px-6 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-orange-100/50 rounded-full mb-6">
               <SparklesIcon className="h-10 w-10 text-orange-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-500 leading-tight mb-4" style={{ fontFamily: "'Baloo 2', cursive" }}>
                Everything is Free!
            </h2>
            <p className="text-gray-600 text-base font-medium leading-relaxed px-4 max-w-[320px] mx-auto">
                We believe high-quality art should be accessible to everyone. There are no subscriptions, no hidden fees, and no premium tiers.
            </p>
        </div>

        <div className="mx-6 mb-8 bg-white rounded-3xl p-8 shadow-xl shadow-amber-900/5 border border-amber-100">
            <p className="text-gray-700 text-center mb-8 leading-relaxed font-medium">
                Enjoy unlimited downloads of our 4K wallpapers and icon packs. If you enjoy our content, sharing Walzoo with your friends is the best way to support us!
            </p>
            
            <div className="text-center">
                <button 
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-black py-4 rounded-2xl transition-all transform hover:scale-[1.03] active:scale-95 shadow-xl shadow-orange-500/30 uppercase tracking-[0.1em] text-sm sm:text-base flex items-center justify-center gap-3"
                >
                    <HeartIcon className="h-5 w-5" />
                    <span>Start Exploring</span>
                </button>
            </div>
        </div>

        <style>{`
          @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PricingModal;