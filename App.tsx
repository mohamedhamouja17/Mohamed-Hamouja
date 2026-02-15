
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, useParams, Navigate, useNavigate, Link, useSearchParams } from 'react-router-dom';
import Header from './components/Header.tsx';
import CategoryNav from './components/CategoryNav.tsx';
import CategoriesCarousel from './components/CategoriesCarousel.tsx';
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
import { type Category } from './types.ts';
import { MY_IMAGES, SUB_CATEGORIES } from './constants.ts';
import WallpaperCard from './components/WallpaperCard.tsx';

// Helper to convert category name to slug and back
const getCategorySlug = (name: string) => name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
const getCategoryNameFromSlug = (slug: string) => 
  SUB_CATEGORIES.find(cat => getCategorySlug(cat) === slug) || 'All';

/**
 * Unified Gallery View Component
 */
const GalleryView = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { categoryName: subCategorySlug } = useParams<{ categoryName: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset pagination when any filter changes
  const topicQuery = searchParams.get('topic');
  useEffect(() => {
    setCurrentPage(1);
  }, [location.pathname, subCategorySlug, topicQuery]);

  const activeDeviceCategory: Category | 'All' = useMemo(() => {
    if (location.pathname.startsWith('/desktop')) return 'Desktop';
    if (location.pathname.startsWith('/phone')) return 'Phone';
    if (location.pathname.startsWith('/tablet')) return 'Tablet';
    return 'All';
  }, [location.pathname]);

  const activeSubCategory = useMemo(() => {
    // If we are on a dedicated category route: /category/nature
    if (subCategorySlug) return getCategoryNameFromSlug(subCategorySlug);
    // If we are on a device route with a query filter: /desktop?topic=nature
    if (topicQuery) return getCategoryNameFromSlug(topicQuery);
    return 'All';
  }, [subCategorySlug, topicQuery]);

  const filteredWallpapers = useMemo(() => {
    let result = [...MY_IMAGES].reverse();

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

  const seoTitle = useMemo(() => {
    if (activeSubCategory !== 'All') return `Free ${activeSubCategory} 4K Wallpapers`;
    if (activeDeviceCategory !== 'All') return `Free ${activeDeviceCategory} 4K Wallpapers`;
    return "Walzoo - Free 4K Wallpapers & Backgrounds";
  }, [activeDeviceCategory, activeSubCategory]);

  const isHomePage = location.pathname === '/';

  // Section Component for Home Page
  const HomeSection = ({ title, category, link }: { title: string, category: Category, link: string }) => {
    // Slice 8 items to perfectly fill 2 rows on a 4-column desktop grid
    const sectionItems = [...MY_IMAGES].reverse().filter(w => w.category === category).slice(0, 8);
    
    return (
      <section className="mb-32 last:mb-0">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight" style={{ fontFamily: "'Baloo 2', cursive" }}>
            {title}
          </h2>
        </div>
        
        {/* Uniform Grid: 2 columns on mobile, 4 columns on desktop for all sections */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {sectionItems.map(wallpaper => (
            <WallpaperCard key={`${wallpaper.id}-${wallpaper.slug}`} wallpaper={wallpaper} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link 
            to={link}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-orange-500 text-orange-600 font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-lg shadow-orange-500/10 active:scale-95 uppercase tracking-widest text-xs"
          >
            View All {title}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    );
  };

  return (
    <div className="animate-fade-in">
      <SEO 
        title={seoTitle} 
        description={`Download stunning 4K ${activeSubCategory !== 'All' ? activeSubCategory : 'wallpapers'} for ${activeDeviceCategory !== 'All' ? activeDeviceCategory : 'all your devices'} — 100% Free.`}
      />
      
      {isHomePage && <HomePageContent />}
      
      {/* Categories Carousel is removed from Home Page and only appears on deep routes */}
      {!isHomePage && <CategoriesCarousel />}
      
      <div className="min-h-[400px] mt-10">
        {isHomePage ? (
          <div className="space-y-32">
            <HomeSection title="Desktop Wallpapers" category="Desktop" link="/desktop" />
            <HomeSection title="Phone Wallpapers" category="Phone" link="/phone" />
            <HomeSection title="Tablet Wallpapers" category="Tablet" link="/tablet" />
          </div>
        ) : (
          <>
            {/* Show category title if filtering by carousel */}
            {activeSubCategory !== 'All' && (
              <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                {activeSubCategory} Wallpapers 
                <span className="text-gray-300 font-light ml-2">({filteredWallpapers.length})</span>
              </h2>
            )}

            {paginatedItems.length > 0 ? (
              <div className={`grid gap-4 sm:gap-6 lg:gap-8 animate-fade-in ${
                activeDeviceCategory === 'Desktop' 
                  ? 'grid-cols-1 lg:grid-cols-2' 
                  : 'grid-cols-2 lg:grid-cols-4'
              }`}>
                {paginatedItems.map(wallpaper => (
                  <WallpaperCard key={`${wallpaper.id}-${wallpaper.slug}`} wallpaper={wallpaper} />
                ))}
              </div>
            ) : (
              <div className="mt-20 text-center flex flex-col items-center">
                <div className="bg-orange-100/50 p-6 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">No Wallpapers Found</h3>
                <p className="text-gray-500 mt-2">We haven't added any wallpapers for this selection yet.</p>
              </div>
            )}
            
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const showNav = location.pathname === '/' || 
                 location.pathname.startsWith('/category/') || 
                 location.pathname.startsWith('/wallpaper/') ||
                 ['/desktop', '/phone', '/tablet'].includes(location.pathname);

  return (
    <div className="bg-sky-50 text-gray-800 min-h-screen font-sans selection:bg-orange-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col min-h-screen">
        <Header onSupportClick={() => setIsPricingModalOpen(true)} />
        
        <main className="mt-8 flex-grow">
          {showNav && <CategoryNav />}

          <Routes>
            <Route path="/" element={<GalleryView />} />
            <Route path="/desktop" element={<GalleryView />} />
            <Route path="/phone" element={<GalleryView />} />
            <Route path="/tablet" element={<GalleryView />} />
            <Route path="/category/:categoryName" element={<GalleryView />} />
            
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
