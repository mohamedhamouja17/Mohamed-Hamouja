import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SUB_CATEGORIES } from '../constants.ts';

/**
 * CategoriesCarousel
 * A premium horizontal scrolling carousel for thematic categories.
 * Features:
 * - Momentum scroll on mobile.
 * - Navigation arrows on desktop.
 * - Dynamic URL routing.
 * - Active state tracking.
 */

const getCategorySlug = (name: string) => name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');

const CategoriesCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const location = useLocation();

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="mt-8 relative group">
      {/* Left Navigation Arrow (Desktop Only) */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-orange-500 hover:scale-110 transition-all hidden lg:flex items-center justify-center -translate-x-4"
          aria-label="Scroll Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Main Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar gap-3 pb-2 px-2 -mx-2 scroll-smooth touch-pan-x"
      >
        {/* "All" Pill */}
        <NavLink
          to="/"
          className={({ isActive }) => `
            px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border flex-shrink-0
            ${isActive && location.pathname === '/'
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-lg shadow-orange-500/25 scale-105' 
              : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500 shadow-sm'}
          `}
        >
          All Wallpapers
        </NavLink>

        {/* Dynamic Category Pills */}
        {SUB_CATEGORIES.map((category) => (
          <NavLink
            key={category}
            to={`/category/${getCategorySlug(category)}`}
            className={({ isActive }) => `
              px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border flex-shrink-0
              ${isActive 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-lg shadow-orange-500/25 scale-105' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500 shadow-sm'}
            `}
          >
            {category}
          </NavLink>
        ))}
      </div>

      {/* Right Navigation Arrow (Desktop Only) */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-orange-500 hover:scale-110 transition-all hidden lg:flex items-center justify-center translate-x-4"
          aria-label="Scroll Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Edge Fades for visual affordance */}
      <div className={`absolute left-0 top-0 bottom-2 w-16 bg-gradient-to-r from-sky-50 to-transparent pointer-events-none transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-sky-50 to-transparent pointer-events-none transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
};

export default CategoriesCarousel;