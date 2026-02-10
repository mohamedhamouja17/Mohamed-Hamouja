import React from 'react';

const HomePageContent: React.FC = () => {
  return (
    <div className="mt-10 space-y-20 pb-20">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 mb-6 leading-tight" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Download Stunning 4K Wallpapers for All Your Devices
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
          Discover high-quality backgrounds for Mobile, Tablet, and Desktop — 100% Free.
        </p>
      </div>
    </div>
  );
};

export default HomePageContent;