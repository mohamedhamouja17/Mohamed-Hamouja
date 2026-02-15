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
import HomePageContent from './components/HomePageContent.tsx';
import SEO from './components/SEO.tsx';
import { type Category, type Wallpaper } from './types.ts';
import { MY_IMAGES, SUB_CATEGORIES } from './constants.ts';

// Helper to convert category name to slug and back
const getCategorySlug = (name: string) => name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
const getCategoryNameFromSlug = (slug: string) => 
  SUB_CATEGORIES.find(cat => getCategorySlug(cat) === slug) || 'All';

/**
 * Unified Gallery View Component
 * Handles Home, Device Categories (Desktop, Phone, Tablet), 
 * and Thematic Categories (Nature, Space, etc.)
 */
const GalleryView = () => {
  const location = useLocation();
  const { categoryName: subCategorySlug } = useParams<{ categoryName: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset pagination on route change
  useEffect(() => {
    setCurrentPage(1);
  }, [location.pathname]);

  // Determine active filters from URL
  const activeDeviceCategory: Category | 'All' = useMemo(() => {
    if (location.pathname === '/desktop') return 'Desktop';
    if (location.pathname === '/phone') return 'Phone';
    if (location.pathname === '/tablet') return 'Tablet';
    return 'All';
  }, [location.pathname]);

  const activeSubCategory = useMemo(() => {
    return subCategorySlug ? getCategoryNameFromSlug(subCategorySlug) : 'All';
  }, [subCategorySlug]);

  // Filter Logic
  const filteredWallpapers = useMemo(() => {
    let result = [...MY_IMAGES].reverse(); // Newest first

    if (activeDeviceCategory !== 'All') {
      result = result.filter(w => w.category === activeDeviceCategory);
    }

    if (activeSubCategory !== 'All') {
      result = result.filter(w => w.subCategory === activeSubCategory);
    }

    return result;
  }, [activeDeviceCategory, activeSubCategory]);

  const itemsPerPage = windowWidth >= 1024 ? 12 : 10;
  const totalPages = Math.max(1, Math.ceil(filteredWallpapers.length / itemsPerPage));
  const paginatedItems = filteredWallpapers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // SEO Title Logic
  const seoTitle = useMemo(() => {
    if (activeSubCategory !== 'All') return `Free ${activeSubCategory} 4K Wallpapers`;
    if (activeDeviceCategory !== 'All') return `Free ${activeDeviceCategory} 4K Wallpapers`;
    return "Walzoo - Free 4K Wallpapers & Backgrounds";
  }, [activeDeviceCategory, activeSubCategory]);

  const isHomePage = location.pathname === '/';

  return (
    <div className="animate-fade-in">
      <SEO 
        title={seoTitle} 
        description={`Download stunning 4K ${activeSubCategory !== 'All' ? activeSubCategory : 'wallpapers'} for ${activeDeviceCategory !== 'All' ? activeDeviceCategory : 'all your devices'} — 100% Free.`}
      />
      
      {isHomePage && <HomePageContent />}
      
      <SearchBar 
        activeSubCategory={activeSubCategory} 
        onSubCategoryChange={() => {}} // Navigation handled by component internally
      />
      
      <div className="min-h-[400px]">
        {paginatedItems.length > 0 ? (
          <div className={`mt-10 grid gap-4 sm:gap-6 lg:gap-8 animate-fade-in ${
            activeDeviceCategory === 'Desktop' 
              ? 'grid-cols-1 lg:grid-cols-2' 
              : 'grid-cols-2 lg:grid-cols-4'
          }`}>
            {paginatedItems.map(wallpaper => (
              <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-800">No Wallpapers Found</h3>
            <p className="text-gray-500 mt-2">We haven't added any wallpapers for this selection yet.</p>
          </div>
        )}
      </div>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

import WallpaperCard from './components/WallpaperCard.tsx';

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

  const showNav = location.pathname === '/' || 
                 location.pathname.startsWith('/category/') || 
                 ['/desktop', '/phone', '/tablet'].includes(location.pathname);

  return (
    <div className="bg-sky-50 text-gray-800 min-h-screen font-sans selection:bg-orange-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col min-h-screen">
        <Header onSupportClick={() => setIsPricingModalOpen(true)} />
        
        <main className="mt-8 flex-grow">
          {showNav && <CategoryNav />}

          <Routes>
            {/* Unified Listing Routes */}
            <Route path="/" element={<GalleryView />} />
            <Route path="/desktop" element={<GalleryView />} />
            <Route path="/phone" element={<GalleryView />} />
            <Route path="/tablet" element={<GalleryView />} />
            <Route path="/category/:categoryName" element={<GalleryView />} />
            
            {/* Other Pages */}
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