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
        aria-label="Walzoo Home"
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
            flex items-center gap-1.5 sm:gap-2.5 px-4 py-2 bg-gray-100/40 hover:bg-gray-200/50 
            border border-gray-200/50 rounded-full shadow-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-95
        "
      >
         <span className="font-bold text-xs sm:text-sm text-gray-700">Support</span>
         <HeartIcon className="h-4 w-4 text-rose-400" />
      </button>
    </header>
  );
};

export default Header;