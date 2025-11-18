
import React from 'react';
import { KidsIcon } from './icons/KidsIcon';
import { UserIcon } from './icons/UserIcon';
import { SubscribeIcon } from './icons/SubscribeIcon';

interface HeaderProps {
  onRegisterClick: () => void;
  onSubscribeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRegisterClick, onSubscribeClick }) => {
  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <KidsIcon className="h-8 w-8 text-yellow-500" />
        <span 
          className="text-lg sm:text-2xl font-bold tracking-wider text-orange-500" 
          style={{ fontFamily: "'Baloo 2', cursive" }}
        >
          WALZOO
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          onClick={onRegisterClick}
          className="flex items-center justify-center sm:gap-2 text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors rounded-full sm:rounded-xl w-10 h-10 sm:w-auto sm:px-4 sm:py-2"
          aria-label="Open registration or login modal"
        >
          <UserIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Register</span>
        </button>
        <button 
          onClick={onSubscribeClick}
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-full sm:rounded-xl transition-colors w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 shadow-lg shadow-orange-500/30 transform hover:scale-105"
          aria-label="Subscribe"
        >
          <SubscribeIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Subscribe</span>
        </button>
      </div>
    </header>
  );
};

export default Header;