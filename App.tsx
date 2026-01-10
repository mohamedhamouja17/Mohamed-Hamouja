import React, { useState } from 'react';
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

type View = 'gallery' | 'blog' | 'about' | 'privacy' | 'terms' | 'contact' | 'wallpaper-detail';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Home');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('All');
  const [currentView, setCurrentView] = useState<View>('gallery');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  // Reset sub-category when changing device type
  const handleSetCategory = (cat: Category) => {
    setActiveCategory(cat);
    setActiveSubCategory('All');
    setCurrentView('gallery');
  };

  const handleNavigateToHome = () => {
    setCurrentView('gallery');
    setActiveCategory('Home');
    setActiveSubCategory('All');
    setSelectedWallpaper(null);
    window.scrollTo(0, 0);
  };

  const handleSelectWallpaper = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setCurrentView('wallpaper-detail');
    window.scrollTo(0, 0);
  };

  const navigateToView = (view: View) => {
    setCurrentView(view);
    setSelectedWallpaper(null);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'wallpaper-detail':
        return selectedWallpaper ? (
          <WallpaperPageView 
            wallpaper={selectedWallpaper} 
            onBack={() => setCurrentView('gallery')} 
          />
        ) : <p>Error loading wallpaper.</p>;
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
              setActiveCategory={handleSetCategory}
              onBlogClick={() => navigateToView('blog')}
            />
            {activeCategory !== 'Home' && (
              <SearchBar 
                activeSubCategory={activeSubCategory} 
                onSubCategoryChange={setActiveSubCategory} 
              />
            )}
            <ContentGrid 
              activeCategory={activeCategory} 
              activeSubCategory={activeSubCategory}
              onWallpaperSelect={handleSelectWallpaper}
            />
            {activeCategory !== 'Home' && <Pagination />}
          </>
        );
    }
  };

  return (
    <div className="bg-sky-50 text-gray-800 min-h-screen font-sans selection:bg-orange-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col min-h-screen">
        <Header 
          onLogoClick={handleNavigateToHome}
          onSupportClick={() => setIsPricingModalOpen(true)}
        />
        <main className="mt-8 flex-grow">
          {renderContent()}
        </main>
        <Footer 
          onBlogClick={() => navigateToView('blog')} 
          onAboutClick={() => navigateToView('about')}
          onPrivacyClick={() => navigateToView('privacy')}
          onTermsClick={() => navigateToView('terms')}
          onContactClick={() => navigateToView('contact')}
        />
      </div>
      {isPricingModalOpen && <PricingModal onClose={() => setIsPricingModalOpen(false)} />}
    </div>
  );
}

export default App;