
import React from 'react';

interface SubscriptionCTAProps {
  onSubscribeClick: () => void;
}

const SubscriptionCTA: React.FC<SubscriptionCTAProps> = ({ onSubscribeClick }) => {
  return (
    <section className="mt-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-8 text-center shadow-2xl">
      <h2 
        className="text-3xl font-bold text-white mb-2"
        style={{ fontFamily: "'Baloo 2', cursive" }}
      >
        Get All The Fun Stuff!
      </h2>
      <p className="text-orange-100 mb-6">Get unlimited access to our entire collection of 4K wallpapers and exclusive icon packs.</p>
      <button 
        onClick={onSubscribeClick}
        className="bg-white text-orange-600 font-bold px-8 py-3 rounded-lg shadow-md hover:bg-yellow-50 transition-all transform hover:scale-105"
      >
        Get Your Fun Pass
      </button>
    </section>
  );
};

export default SubscriptionCTA;