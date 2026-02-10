import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header.tsx';
import CategoryNav from './components/CategoryNav.tsx';
import SearchBar from './components/SearchBar.tsx';
import ContentGrid from './components/ContentGrid.tsx';
import Pagination from './components/Pagination.tsx';
import Footer from './components/Footer.tsx';
import PricingModal from './components/PricingModal.tsx';
import WallpaperPageView from './components/WallpaperPageView.tsx';
import BlogPage from './components/BlogPage.tsx';
import AboutPage from './components/AboutPage.tsx';
import PrivacyPage from './components/PrivacyPage.tsx';
import TermsPage from './components/TermsPage.tsx';
import ContactPage from './components/ContactPage.tsx';
import SEO from './components/SEO.tsx';
import HomePageContent from './components/HomePageContent.tsx';
import { type Category, type Wallpaper } from './types.ts';
import { WALLPAPER_DATA } from './constants.ts';

type View = Category | 'Wallpaper' | 'Blog' | 'About' | 'Privacy' | 'Terms' | 'Contact';

function App() {
  const [view, setView] = useState<View>('Home');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Open the pricing modal automatically on home page load if it's the first visit
  useEffect(() => {
    if (view === 'Home') {
      const timer = setTimeout(() => {
        const hasSeenModal = localStorage.getItem('hasSeenPricingModal');
        if (!hasSeenModal) {
          setIsPricingModalOpen(true);
          localStorage.setItem('hasSeenPricingModal', 'true');
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedWallpaper]);

  const itemsPerPage = useMemo(() => {
    return windowWidth >= 1024 ? 12 : 10;
  }, [windowWidth]);

  const handleCategoryChange = (cat: Category) => {
    setView(cat);
    setActiveSubCategory('All');
    setCurrentPage(1);
  };

  const handleWallpaperSelect = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setView('Wallpaper');
  };

  const totalPages = useMemo(() => {
    if (view === 'Wallpaper' || view === 'Blog' || view === 'About' || view === 'Privacy' || view === 'Terms' || view === 'Contact') return 1;
    const deviceWallpapers = WALLPAPER_DATA[view as Category] || [];
    const filteredCount = activeSubCategory === 'All' 
      ? deviceWallpapers.length 
      : deviceWallpapers.filter(w => w.subCategory === activeSubCategory).length;
    
    return Math.max(1, Math.ceil(filteredCount / itemsPerPage));
  }, [view, activeSubCategory, itemsPerPage]);

  const renderContent = () => {
    switch (view) {
      case 'Wallpaper':
        return selectedWallpaper ? (
          <WallpaperPageView 
            wallpaper={selectedWallpaper} 
            onBack={() => setView(selectedWallpaper.category)} 
          />
        ) : null;
      case 'Blog':
        return <BlogPage />;
      case 'About':
        return <AboutPage />;
      case 'Privacy':
        return <PrivacyPage />;
      case 'Terms':
        return <TermsPage />;
      case 'Contact':
        return <ContactPage />;
      case 'Home':
        return (
          <div className="animate-fade-in">
            <HomePageContent />
            <SearchBar 
              activeSubCategory={activeSubCategory} 
              onSubCategoryChange={(cat) => {
                setActiveSubCategory(cat);
                setCurrentPage(1);
              }} 
            />
            <ContentGrid 
              activeCategory="Home" 
              activeSubCategory={activeSubCategory}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onWallpaperSelect={handleWallpaperSelect}
            />
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage}
            />
          </div>
        );
      default:
        // Desktop, Phone, Tablet views
        return (
          <div className="animate-fade-in">
            <SearchBar 
              activeSubCategory={activeSubCategory} 
              onSubCategoryChange={(cat) => {
                setActiveSubCategory(cat);
                setCurrentPage(1);
              }} 
            />
            <ContentGrid 
              activeCategory={view as Category} 
              activeSubCategory={activeSubCategory}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onWallpaperSelect={handleWallpaperSelect}
            />
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage}
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-sky-50 text-gray-800 min-h-screen font-sans selection:bg-orange-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col min-h-screen">
        <Header 
          onLogoClick={() => handleCategoryChange('Home')}
          onSupportClick={() => setIsPricingModalOpen(true)} 
        />
        
        <main className="mt-8 flex-grow">
          <SEO title={view === 'Home' ? undefined : `${view} Wallpapers`} />
          <CategoryNav 
            activeCategory={view as Category} 
            onCategoryChange={handleCategoryChange} 
          />
          {renderContent()}
        </main>

        <Footer onNavigate={(v) => {
          setView(v as View);
          setCurrentPage(1);
        }} />
      </div>
      {isPricingModalOpen && <PricingModal onClose={() => setIsPricingModalOpen(false)} />}
    </div>
  );
}

export default App;