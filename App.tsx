
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import SearchBar from './components/SearchBar';
import ContentGrid from './components/ContentGrid';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import PricingModal from './components/PricingModal';
import { type Category } from './types';
import { auth } from './firebase';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthModalToggle = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
  };
  
  const handlePricingModalToggle = () => {
    setIsPricingModalOpen(!isPricingModalOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="bg-sky-50 text-gray-800 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col min-h-screen">
        <Header 
          user={user}
          onRegisterClick={handleAuthModalToggle} 
          onSubscribeClick={handlePricingModalToggle}
          onLogoutClick={handleLogout}
        />
        <main className="mt-8 flex-grow">
          <CategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          {activeCategory !== 'Home' && activeCategory !== 'App Icons' && <SearchBar activeCategory={activeCategory} />}
          <ContentGrid 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
            onSubscribeClick={handlePricingModalToggle} 
          />
          {activeCategory !== 'Home' && <Pagination />}
        </main>
        <Footer />
      </div>
      {isAuthModalOpen && <AuthModal onClose={handleAuthModalToggle} />}
      {isPricingModalOpen && <PricingModal onClose={handlePricingModalToggle} />}
    </div>
  );
}

export default App;