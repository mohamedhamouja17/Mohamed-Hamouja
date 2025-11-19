
import React, { useState } from 'react';
import { UserIcon } from './icons/UserIcon';
import { AtIcon } from './icons/AtIcon';
import { LockIcon } from './icons/LockIcon';
import { CloseIcon } from './icons/CloseIcon';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, type AuthError } from 'firebase/auth';

interface AuthModalProps {
  onClose: () => void;
}

type AuthMode = 'login' | 'create';

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'create') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
          await updateProfile(userCredential.user, { displayName: name });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Close modal on success
      onClose();
    } catch (err: unknown) {
      console.error("Auth error:", err);
      const authError = err as AuthError;
      let errorMessage = 'An error occurred. Please try again.';
      
      if (authError.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (authError.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (authError.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password' || authError.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
  };
  
  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div 
          className="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
          onClick={handleBackdropClick}
        >
          <div className="relative transform overflow-hidden bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 text-left text-gray-900 animate-fade-in-scale transition-all">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-20"
              aria-label="Close modal"
            >
              <CloseIcon className="h-6 w-6" />
            </button>

            <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
              <button
                onClick={() => toggleMode('login')}
                className={`w-1/2 py-2.5 text-sm font-semibold rounded-md transition-colors ${
                  mode === 'login' ? 'bg-white shadow-md text-orange-600' : 'text-gray-500 hover:bg-white/50'
                }`}
                type="button"
              >
                Login
              </button>
              <button
                onClick={() => toggleMode('create')}
                className={`w-1/2 py-2.5 text-sm font-semibold rounded-md transition-colors ${
                  mode === 'create' ? 'bg-white shadow-md text-orange-600' : 'text-gray-500 hover:bg-white/50'
                }`}
                type="button"
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            {mode === 'login' ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Login</h2>
                <div>
                  <label htmlFor="login-email" className="sr-only">E-mail</label>
                  <div className="relative">
                    <AtIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      id="login-email" 
                      type="email" 
                      placeholder="E-mail" 
                      required 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="login-password" className="sr-only">Password</label>
                  <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      id="login-password" 
                      type="password" 
                      placeholder="Password" 
                      required 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Create Account</h2>
                 <div>
                  <label htmlFor="create-name" className="sr-only">Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      id="create-name" 
                      type="text" 
                      placeholder="Name" 
                      required 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="create-email" className="sr-only">E-mail</label>
                  <div className="relative">
                    <AtIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      id="create-email" 
                      type="email" 
                      placeholder="E-mail" 
                      required 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="create-password" className="sr-only">Password</label>
                  <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      id="create-password" 
                      type="password" 
                      placeholder="Password" 
                      required 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
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
      </div>
    </div>
  );
};

export default AuthModal;
