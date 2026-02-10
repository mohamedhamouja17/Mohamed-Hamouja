
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
import { type Category } from './types.ts';
import { WALLPAPER_DATA, MY_IMAGES, SUB_CATEGORIES } from './constants.ts';

// Helper to handle slug transformations for subcategories
const slugify = (text: string) => text.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
const unslugify = (slug: string) => {
  if (slug === 'cities-landmarks') return 'Cities & Landmarks';
  const found = SUB_CATEGORIES.find(cat => slugify(cat) === slug);
  return found || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const GalleryView = ({ itemsPerPage }: { itemsPerPage: number }) => {
  const { categorySlug, subCategorySlug } = useParams<{ categorySlug?: string; subCategorySlug?: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  const activeCategory: Category = useMemo(() => {
    if (!categorySlug) return 'Home';
    const normalized = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).toLowerCase();
    const valid: Category[] = ['Desktop', 'Phone', 'Tablet'];
    return (valid.includes(normalized as any)) ? normalized as Category : 'Home';
  }, [categorySlug]);

  const activeSubCategory = useMemo(() => {
    return subCategorySlug ? unslugify(subCategorySlug) : 'All';
  }, [subCategorySlug]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug, subCategorySlug]);

  const handleSubCategoryChange = (cat: string) => {
    const devicePart = activeCategory === 'Home' ? 'desktop' : activeCategory.toLowerCase();
    const base = `/category/${devicePart}`;
    if (cat === 'All') {
      navigate(base);
    } else {
      navigate(`${base}/${slugify(cat)}`);
    }
  };

  const totalPages = useMemo(() => {
    const deviceWallpapers = WALLPAPER_DATA[activeCategory] || [];
    const filteredCount = activeSubCategory === 'All' 
      ? deviceWallpapers.length 
      : deviceWallpapers.filter(w => w.subCategory === activeSubCategory).length;
    
    return Math.max(1, Math.ceil(filteredCount / itemsPerPage));
  }, [activeCategory, activeSubCategory, itemsPerPage]);

  return (
    <>
      <SEO title={activeCategory === 'Home' ? undefined : `${activeCategory} Wallpapers`} />
      <CategoryNav activeCategory={activeCategory} />
      
      {activeCategory === 'Home' ? (
        <div className="space-y-12 mb-12 animate-fade-in text-center">
          <HomePageContent /> 
        </div>
      ) : (
        <div className="animate-fade-in">
          <SearchBar 
            activeSubCategory={activeSubCategory} 
            onSubCategoryChange={handleSubCategoryChange} 
          />
          <ContentGrid 
            activeCategory={activeCategory} 
            activeSubCategory={activeSubCategory}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

const WallpaperDetailWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const wallpaper = MY_IMAGES.find(img => img.slug === slug);
  
  if (!wallpaper) return <Navigate to="/" replace />;
  
  return <WallpaperPageView wallpaper={wallpaper} onBack={() => navigate(-1)} />;
};

function App() {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const itemsPerPage = useMemo(() => {
    return windowWidth >= 1024 ? 12 : 10;
  }, [windowWidth]);

  return (
    <div className="bg-sky-50 text-gray-800 min-h-screen font-sans selection:bg-orange-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col min-h-screen">
        <Header onSupportClick={() => setIsPricingModalOpen(true)} />
        
        <main className="mt-8 flex-grow">
          <Routes>
            <Route path="/" element={<GalleryView itemsPerPage={itemsPerPage} />} />
            <Route path="/category/:categorySlug" element={<GalleryView itemsPerPage={itemsPerPage} />} />
            <Route path="/category/:categorySlug/:subCategorySlug" element={<GalleryView itemsPerPage={itemsPerPage} />} />
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
