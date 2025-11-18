
import React, { useState } from 'react';
import { UserIcon } from './icons/UserIcon';
import { AtIcon } from './icons/AtIcon';
import { LockIcon } from './icons/LockIcon';
import { CloseIcon } from './icons/CloseIcon';

interface AuthModalProps {
  onClose: () => void;
}

type AuthMode = 'login' | 'create';

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 text-gray-900 relative animate-fade-in-scale">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
          aria-label="Close modal"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
          <button
            onClick={() => setMode('login')}
            className={`w-1/2 py-2.5 text-sm font-semibold rounded-md transition-colors ${
              mode === 'login' ? 'bg-white shadow-md text-orange-600' : 'text-gray-500 hover:bg-white/50'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('create')}
            className={`w-1/2 py-2.5 text-sm font-semibold rounded-md transition-colors ${
              mode === 'create' ? 'bg-white shadow-md text-orange-600' : 'text-gray-500 hover:bg-white/50'
            }`}
          >
            Create Account
          </button>
        </div>

        {mode === 'login' ? (
          <form className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Login</h2>
            <div>
              <label htmlFor="login-email" className="sr-only">E-mail</label>
              <div className="relative">
                <AtIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="login-email" type="email" placeholder="E-mail" required className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"/>
              </div>
            </div>
            <div>
              <label htmlFor="login-password" className="sr-only">Password</label>
              <div className="relative">
                <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="login-password" type="password" placeholder="Password" required className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"/>
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105">
              Login
            </button>
          </form>
        ) : (
          <form className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Create Account</h2>
             <div>
              <label htmlFor="create-name" className="sr-only">Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="create-name" type="text" placeholder="Name" required className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"/>
              </div>
            </div>
            <div>
              <label htmlFor="create-email" className="sr-only">E-mail</label>
              <div className="relative">
                <AtIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="create-email" type="email" placeholder="E-mail" required className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"/>
              </div>
            </div>
            <div>
              <label htmlFor="create-password" className="sr-only">Password</label>
              <div className="relative">
                <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="create-password" type="password" placeholder="Password" required className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"/>
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105">
              Create Account
            </button>
          </form>
        )}
        <style>{`
          @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 0.2s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AuthModal;