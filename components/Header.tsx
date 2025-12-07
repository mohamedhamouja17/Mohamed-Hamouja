
import React from 'react';
import { TigerClawsIcon } from './icons/TigerClawsIcon';

interface HeaderProps {
  onLogoClick: () => void;
  onBlogClick: () => void;
  onContactClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onBlogClick, onContactClick }) => {
  return (
    <header className="flex justify-between items-center">
      <button 
        onClick={onLogoClick}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Go to Home"
      >
        <TigerClawsIcon className="h-8 w-8 text-yellow-500" />
        <span 
          className="text-lg sm:text-2xl font-bold tracking-wider text-orange-500" 
          style={{ fontFamily: "'Baloo 2', cursive" }}
        >
          WALZOO
        </span>
      </button>

      <nav className="flex items-center gap-4 sm:gap-8">
        <button 
          onClick={onBlogClick}
          className="text-gray-600 hover:text-orange-500 font-semibold transition-colors text-base sm:text-lg"
        >
          Blog
        </button>
        <button 
          onClick={onContactClick}
          className="text-gray-600 hover:text-orange-500 font-semibold transition-colors text-base sm:text-lg"
        >
          Contact
        </button>
      </nav>
    </header>
  );
};

export default Header;
