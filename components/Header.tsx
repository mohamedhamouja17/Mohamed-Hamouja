import React from 'react';
import { TigerClawsIcon } from './icons/TigerClawsIcon.tsx';
import { HeartIcon } from './icons/HeartIcon.tsx';

interface HeaderProps {
  onLogoClick: () => void;
  onSupportClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onSupportClick }) => {
  return (
    <header className="flex justify-between items-center">
      <button 
        onClick={onLogoClick}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Go to Home"
      >
        <TigerClawsIcon className="h-8 w-8 text-yellow-500" />
        <span 
          className="text-xl sm:text-2xl font-bold tracking-wider text-orange-500" 
          style={{ fontFamily: "'Baloo 2', cursive" }}
        >
          WALZOO
        </span>
      </button>

      <button
        onClick={onSupportClick}
        className="
            group flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 sm:px-6 sm:py-2.5 
            bg-white hover:bg-rose-50
            border-2 border-rose-100 hover:border-rose-200
            rounded-full shadow-sm hover:shadow-lg hover:shadow-rose-100
            transition-all duration-300 ease-in-out transform hover:-translate-y-0.5
        "
      >
         <span className="font-bold text-xs sm:text-sm md:text-base text-gray-700 group-hover:text-rose-600 transition-colors">Support</span>
         <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-rose-400 group-hover:text-rose-500 group-hover:scale-110 transition-transform duration-300" />
      </button>
    </header>
  );
};

export default Header;