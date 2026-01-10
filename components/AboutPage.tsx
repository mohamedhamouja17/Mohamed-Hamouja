import React from 'react';
import { TigerClawsIcon } from './icons/TigerClawsIcon.tsx';
import { DiamondIcon } from './icons/DiamondIcon.tsx';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import { DesktopIcon } from './icons/DesktopIcon.tsx';
import { PhoneIcon } from './icons/PhoneIcon.tsx';

const AboutPage: React.FC = () => {
  return (
    <div className="mt-10 animate-fade-in max-w-5xl mx-auto px-4 pb-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-orange-50 rounded-full mb-6 shadow-sm">
            <TigerClawsIcon className="h-16 w-16 text-orange-500" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight" style={{ fontFamily: "'Baloo 2', cursive" }}>
          About Walzoo
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
          We are the premier destination for digital customization, helping you transform your screens into stunning works of art.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Our Story */}
        <div className="p-8 sm:p-12 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-4">
              Walzoo started with a simple idea: <strong>your device is an extension of yourself.</strong> What started as a small collection of curated backgrounds has grown into a massive library of high-definition digital art, serving thousands of users across the globe.
            </p>
            <p>
              We are obsessed with quality. In a world of low-res images and generic stock photos, Walzoo stands out by offering only the crispest, most creative, and visually striking content for your Phone, Tablet, and Desktop.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 divide-y md:divide-y-0 md:divide-x divide-gray-200">
           <div className="p-8 text-center hover:bg-white transition-colors duration-300 group">
              <DiamondIcon className="h-12 w-12 text-blue-500 mx-auto mb-4 transform group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">Premium Quality</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Every wallpaper is hand-picked and optimized for up to 4K resolution to ensure pixel-perfect clarity.
              </p>
           </div>
           <div className="p-8 text-center hover:bg-white transition-colors duration-300 group">
              <div className="flex justify-center gap-2 mb-4 text-purple-500 transform group-hover:scale-110 transition-transform">
                 <PhoneIcon className="h-12 w-12" />
                 <DesktopIcon className="h-12 w-12" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Multi-Device</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Seamlessly sized backgrounds for your Desktop, Tablet, and Mobile devices. One ecosystem, perfect harmony.
              </p>
           </div>
           <div className="p-8 text-center hover:bg-white transition-colors duration-300 group">
              <SparklesIcon className="h-12 w-12 text-amber-500 mx-auto mb-4 transform group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">Fresh Daily</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our library never gets stale. We add new, exclusive designs every single week to keep your screens looking fresh.
              </p>
           </div>
        </div>

        {/* Call to Action */}
        <div className="p-8 sm:p-12 text-center bg-gradient-to-r from-orange-500 to-amber-600 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join the Walzoo Community</h2>
            <p className="text-orange-100 mb-8 max-w-xl mx-auto text-lg">
               Unlock the full potential of your devices with our massive library. Everything is completely free—unlimited downloads, no hidden fees.
            </p>
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/30">
               <p className="font-bold text-xl">100% Free for Everyone</p>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;