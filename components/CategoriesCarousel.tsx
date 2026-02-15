import React from 'react';
import { NavLink } from 'react-router-dom';
import { SUB_CATEGORIES } from '../constants.ts';

/**
 * CategoriesCarousel
 * A horizontal scrolling list of category pills.
 * Updates the URL to /category/:slug when clicked.
 */

// Helper to convert category name to slug (consistent with App.tsx)
const getCategorySlug = (name: string) => name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');

const CategoriesCarousel: React.FC = () => {
  return (
    <div className="mt-8 relative w-full overflow-hidden">
      {/* Container with horizontal scroll and no scrollbar (class defined in index.html) */}
      <div className="flex overflow-x-auto no-scrollbar gap-2.5 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
        
        {/* "All" Pill - Links back to home */}
        <NavLink
          to="/"
          className={({ isActive }) => `
            px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border shadow-sm
            ${isActive 
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-orange-500/25 scale-105' 
              : 'bg-white text-gray-600 border-gray-100 hover:border-orange-300 hover:text-orange-500'}
          `}
        >
          All Wallpapers
        </NavLink>

        {/* 16 Category Pills */}
        {SUB_CATEGORIES.map((category) => (
          <NavLink
            key={category}
            to={`/category/${getCategorySlug(category)}`}
            className={({ isActive }) => `
              px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border shadow-sm
              ${isActive 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-orange-500/25 scale-105' 
                : 'bg-white text-gray-600 border-gray-100 hover:border-orange-300 hover:text-orange-500'}
            `}
          >
            {category}
          </NavLink>
        ))}
      </div>
      
      {/* Subtle fade effect on the right for desktop to indicate more items */}
      <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-sky-50 to-transparent pointer-events-none hidden sm:block"></div>
    </div>
  );
};

export default CategoriesCarousel;