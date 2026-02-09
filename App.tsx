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
import { type Category, type Wallpaper } from './types.ts';
import { WALLPAPER_DATA } from './constants.ts';

type View = 'Home' | 'Desktop' | 'Phone' | 'Tablet' | 'Privacy' | 'About' | 'Blog' | 'Contact' | 'Terms' | 'Detail';

function App() {
  const [view, setView] = useState<View>('Home');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const itemsPerPage = useMemo(() => {
    return windowWidth >= 1024 ? 12 : 10;
  }, [windowWidth]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedWallpaper]);

  const activeCategory: Category = useMemo(() => {
    if (['Home', 'Desktop', 'Phone', 'Tablet'].includes(view)) {
      return view as Category;
    }
    return 'Home';
  }, [view]);

  const handleNavigate = (newView: View) => {
    setView(newView);
    setSelectedWallpaper(null);
    setActiveSubCategory('All');
    setCurrentPage(1);
  };

  const handleWallpaperSelect = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setView('Detail');
  };

  const totalPages = useMemo(() => {
    const deviceWallpapers = WALLPAPER_DATA[activeCategory] || [];
    const filteredCount = activeSubCategory === 'All' 
      ? deviceWallpapers.length 
      : deviceWallpapers.filter(w => w.subCategory === activeSubCategory).length;
    
    return Math.max(1, Math.ceil(filteredCount / itemsPerPage));
  }, [activeCategory, activeSubCategory, itemsPerPage]);

  const renderContent = () => {
    switch (view) {
      case 'Privacy': return <PrivacyPage />;
      case 'About': return <AboutPage />;
      case 'Blog': return <BlogPage />;
      case 'Contact': return <ContactPage />;
      case 'Terms': return <TermsPage />;
      case 'Detail': 
        return selectedWallpaper ? (
          <WallpaperPageView 
            wallpaper={selectedWallpaper} 
            onBack={() => setView(selectedWallpaper.category)} 
          />
        ) : <NavigateToHome />;
      default:
        return (
          <>
            <CategoryNav activeCategory={activeCategory} onCategoryChange={handleNavigate} />
            {activeCategory !== 'Home' && (
              <SearchBar 
                activeSubCategory={activeSubCategory} 
                onSubCategoryChange={(cat) => {
                  setActiveSubCategory(cat);
                  setCurrentPage(1);
                }} 
              />
            )}
            <ContentGrid 
              activeCategory={activeCategory} 
              activeSubCategory={activeSubCategory}
              onWallpaperSelect={handleWallpaperSelect}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
            {activeCategory !== 'Home' && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage}
              />
            )}
          </>
        );
    }
  };

  return (
    <div className="bg-sky-50 text-gray-800 min-h-screen font-sans selection:bg-orange-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col min-h-screen">
        <Header 
          onSupportClick={() => setIsPricingModalOpen(true)} 
          onLogoClick={() => handleNavigate('Home')} 
        />
        
        <main className="mt-8 flex-grow">
          {renderContent()}
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>
      {isPricingModalOpen && <PricingModal onClose={() => setIsPricingModalOpen(false)} />}
    </div>
  );
}

const NavigateToHome = () => {
  useEffect(() => { window.location.reload(); }, []);
  return null;
};

export default App;