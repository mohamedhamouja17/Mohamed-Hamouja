
import React from 'react';

interface SubscriptionCTAProps {
  onSubscribeClick: () => void;
}

const SubscriptionCTA: React.FC<SubscriptionCTAProps> = ({ onSubscribeClick }) => {
  return (
    <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-2">Unlock All Premium Content</h2>
      <p className="text-blue-100 mb-6">Get unlimited access to our entire collection of 4K wallpapers and exclusive icon packs.</p>
      <button 
        onClick={onSubscribeClick}
        className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all transform hover:scale-105"
      >
        Subscribe Now
      </button>
    </section>
  );
};

export default SubscriptionCTA;
