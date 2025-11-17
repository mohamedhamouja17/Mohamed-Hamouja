
import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
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
        <LogoIcon className="h-8 w-8 text-blue-400" />
        <span className="text-lg sm:text-2xl font-bold tracking-wider text-gray-200">WALZOO</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={onRegisterClick}
          className="flex items-center justify-center sm:gap-2 text-sm text-gray-400 hover:text-white transition-colors rounded-full sm:rounded-none w-10 h-10 sm:w-auto"
          aria-label="Open registration or login modal"
        >
          <UserIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Register</span>
        </button>
        <button 
          onClick={onSubscribeClick}
          className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-full sm:rounded-lg transition-colors w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2"
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
