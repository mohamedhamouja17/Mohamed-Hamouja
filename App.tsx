import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import SearchBar from './components/SearchBar';
import ContentGrid from './components/ContentGrid';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import PricingModal from './components/PricingModal';
import DownloadModal from './components/DownloadModal';
import BlogPage from './components/BlogPage';
import AboutPage from './components/AboutPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import ContactPage from './components/ContactPage';
import { type Category, type Wallpaper } from './types';
import { auth } from './firebase';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';

type View = 'gallery' | 'blog' | 'about' | 'privacy' | 'terms' | 'contact';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Home');
  const [currentView, setCurrentView] = useState<View>('gallery');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Download Modal State
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadItemUrl, setDownloadItemUrl] = useState<string>('');

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

  const handleOpenDownloadModal = (wallpaper: Wallpaper) => {
    setDownloadItemUrl(wallpaper.imageUrl);
    setIsDownloadModalOpen(true);
  };

  const handleCloseDownloadModal = () => {
    setIsDownloadModalOpen(false);
    setDownloadItemUrl('');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleNavigateToHome = () => {
    setCurrentView('gallery');
    setActiveCategory('Home');
    window.scrollTo(0, 0);
  };

  const handleNavigateToBlog = () => {
    setCurrentView('blog');
    window.scrollTo(0, 0);
  };

  const handleNavigateToContact = () => {
    setCurrentView('contact');
    window.scrollTo(0, 0);
  };

  const handleNavigateToAbout = () => {
    setCurrentView('about');
    window.scrollTo(0, 0);
  };

  const handleNavigateToPrivacy = () => {
    setCurrentView('privacy');
    window.scrollTo(0, 0);
  };

  const handleNavigateToTerms = () => {
    setCurrentView('terms');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'gallery':
      default:
        return (
          <>
            <CategoryNav 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory}
              onBlogClick={handleNavigateToBlog}
            />
            {activeCategory !== 'Home' && <SearchBar activeCategory={activeCategory} />}
            <ContentGrid 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
              onSubscribeClick={handlePricingModalToggle}
              onDownloadClick={handleOpenDownloadModal}
            />
            {activeCategory !== 'Home' && <Pagination />}
          </>
        );
    }
  };

  return (
    <div className="bg-sky-50 text-gray-800 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col min-h-screen">
        <Header 
          onLogoClick={handleNavigateToHome}
          onSupportClick={handlePricingModalToggle}
        />
        <main className="mt-8 flex-grow">
          {renderContent()}
        </main>
        <Footer 
          onBlogClick={handleNavigateToBlog} 
          onAboutClick={handleNavigateToAbout}
          onPrivacyClick={handleNavigateToPrivacy}
          onTermsClick={handleNavigateToTerms}
          onContactClick={handleNavigateToContact}
        />
      </div>
      {isAuthModalOpen && <AuthModal onClose={handleAuthModalToggle} />}
      {isPricingModalOpen && <PricingModal onClose={handlePricingModalToggle} />}
      <DownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={handleCloseDownloadModal} 
        imageUrl={downloadItemUrl} 
      />
    </div>
  );
}

export default App;