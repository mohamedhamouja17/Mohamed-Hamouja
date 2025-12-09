
import React from 'react';

const SubscriptionCTA: React.FC = () => {
  return (
    <section className="mt-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-8 text-center shadow-2xl">
      <h2 
        className="text-2xl sm:text-3xl font-bold text-white mb-2"
        style={{ fontFamily: "'Baloo 2', cursive" }}
      >
        Everything on Walzoo is Completely Free!
      </h2>
      <p className="text-orange-100 text-lg font-medium max-w-2xl mx-auto">
        Get unlimited access to our entire collection of 4K wallpapers and exclusive icon packs. No subscriptions, no hidden fees—just pure creativity for your devices.
      </p>
    </section>
  );
};

export default SubscriptionCTA;
