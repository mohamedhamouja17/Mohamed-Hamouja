
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, useParams, Navigate, useNavigate } from 'react-router-dom';
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
import DesktopWallpaperSlideshow from './components/DesktopWallpaperSlideshow.tsx';
import PhoneWallpaperSlideshow from './components/PhoneWallpaperSlideshow.tsx';
import TabletWallpaperSlideshow from './components/TabletWallpaperSlideshow.tsx';
import { type Category, type Wallpaper } from './types.ts';
import { WALLPAPER_DATA, MY_IMAGES } from './constants.ts';

// Dedicated view for the home page with hero content and slideshows
const GalleryView = () => {
  const [activeSubCategory, setActiveSubCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = useMemo(() => {
    return windowWidth >= 1024 ? 12 : 10;
  }, [windowWidth]);

  const totalPages = useMemo(() => {
    const deviceWallpapers = WALLPAPER_DATA['Home'] || [];
    const filteredCount = activeSubCategory === 'All' 
      ? deviceWallpapers.length 
      : deviceWallpapers.filter(w => w.subCategory === activeSubCategory).length;
    
    return Math.max(1, Math.ceil(filteredCount / itemsPerPage));
  }, [activeSubCategory, itemsPerPage]);

  return (
    <div className="animate-fade-in">
      <HomePageContent />
      
      <div className="space-y-16 my-16">
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8" style={{ fontFamily: "'Baloo 2', cursive" }}>Latest Desktop Wallpapers</h2>
          <DesktopWallpaperSlideshow onWallpaperSelect={() => {}} />
        </section>
        
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8" style={{ fontFamily: "'Baloo 2', cursive" }}>Latest Phone Wallpapers</h2>
          <PhoneWallpaperSlideshow onWallpaperSelect={() => {}} />
        </section>
        
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8" style={{ fontFamily: "'Baloo 2', cursive" }}>Latest Tablet Wallpapers</h2>
          <TabletWallpaperSlideshow onWallpaperSelect={() => {}} />
        </section>
      </div>

      <div className="pt-8 border-t border-sky-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8" style={{ fontFamily: "'Baloo 2', cursive" }}>Browse All Collections</h2>
        <SearchBar 
          activeSubCategory={activeSubCategory} 
          onSubCategoryChange={setActiveSubCategory} 
        />
        <ContentGrid 
          activeCategory="Home" 
          activeSubCategory={activeSubCategory}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onWallpaperSelect={() => {}} 
        />
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

// Component to handle category-specific views (Desktop, Phone, Tablet)
const CategoryView = ({ category }: { category: Category }) => {
  const [activeSubCategory, setActiveSubCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = useMemo(() => {
    return windowWidth >= 1024 ? 12 : 10;
  }, [windowWidth]);

  const totalPages = useMemo(() => {
    const deviceWallpapers = WALLPAPER_DATA[category] || [];
    const filteredCount = activeSubCategory === 'All' 
      ? deviceWallpapers.length 
      : deviceWallpapers.filter(w => w.subCategory === activeSubCategory).length;
    
    return Math.max(1, Math.ceil(filteredCount / itemsPerPage));
  }, [category, activeSubCategory, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, activeSubCategory]);

  return (
    <div className="animate-fade-in">
      <SearchBar 
        activeSubCategory={activeSubCategory} 
        onSubCategoryChange={setActiveSubCategory} 
      />
      <ContentGrid 
        activeCategory={category} 
        activeSubCategory={activeSubCategory}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onWallpaperSelect={() => {}} 
      />
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

// Component to find wallpaper by slug from URL using react-router-dom useParams
const WallpaperDetailWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const wallpaper = MY_IMAGES.find(w => w.slug === slug);
  
  if (!wallpaper) {
    return <Navigate to="/" replace />;
  }

  return (
    <WallpaperPageView 
      wallpaper={wallpaper} 
      onBack={() => navigate(-1)} 
    />
  );
};

function App() {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const location = useLocation();

  // Open pricing modal on first visit to Home
  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        const hasSeenModal = localStorage.getItem('hasSeenPricingModal');
        if (!hasSeenModal) {
          setIsPricingModalOpen(true);
          localStorage.setItem('hasSeenPricingModal', 'true');
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-sky-50 text-gray-800 min-h-screen font-sans selection:bg-orange-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col min-h-screen">
        <Header onSupportClick={() => setIsPricingModalOpen(true)} />
        
        <main className="mt-8 flex-grow">
          <SEO title={location.pathname === '/' ? undefined : `${location.pathname.split('/').pop()?.replace(/-/g, ' ')} Wallpapers`} />
          
          {/* Main Category Navigation shows on all browsable routes */}
          {(location.pathname === '/' || ['/desktop', '/phone', '/tablet'].includes(location.pathname)) && (
             <CategoryNav />
          )}

          <Routes>
            <Route path="/" element={<GalleryView />} />
            <Route path="/desktop" element={<CategoryView category="Desktop" />} />
            <Route path="/phone" element={<CategoryView category="Phone" />} />
            <Route path="/tablet" element={<CategoryView category="Tablet" />} />
            <Route path="/wallpaper/:slug" element={<WallpaperDetailWrapper />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
      {isPricingModalOpen && <PricingModal onClose={() => setIsPricingModalOpen(false)} />}
    </div>
  );
}

export default App;
