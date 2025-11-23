import React from 'react';
import { TigerClawsIcon } from './icons/TigerClawsIcon';

const AboutPage: React.FC = () => {
  return (
    <div className="mt-10 animate-fade-in max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
            <TigerClawsIcon className="h-20 w-20 text-orange-500" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'Baloo 2', cursive" }}>
          About Walzoo
        </h1>
        <div className="prose prose-lg mx-auto text-gray-600 bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
          <p className="mb-6 leading-relaxed">
            Welcome to <span className="font-bold text-orange-500">Walzoo</span>, your ultimate destination for transforming digital screens into personal masterpieces. 
            We are a team of designers, developers, and customization enthusiasts dedicated to bringing you the highest quality wallpapers and icon packs available on the web.
          </p>
          <p className="mb-6 leading-relaxed">
            Our mission is simple: <strong>No more boring screens.</strong> Whether you're rocking the latest smartphone, a high-end desktop rig, or a smart TV, 
            we believe your display should be a reflection of your personality and style.
          </p>
          <p className="leading-relaxed">
            From 4K landscapes to minimalist vector art, our curated collection is updated weekly to ensure you never run out of fresh inspiration. 
            Thank you for being part of the Walzoo community!
          </p>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;