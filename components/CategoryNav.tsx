
import React, { useState } from 'react';
import { type Category, CATEGORIES } from '../types';
import { DesktopIcon } from './icons/DesktopIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { TabletIcon } from './icons/TabletIcon';
import { HomeIcon } from './icons/HomeIcon';
import { CategoryIcon } from './icons/CategoryIcon';
import { BlogIcon } from './icons/BlogIcon';

interface CategoryNavProps {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
  onBlogClick: () => void;
}

const categoryIcons: Record<Category, React.FC<{className: string}>> = {
  'Home': HomeIcon,
  'Desktop': DesktopIcon,
  'Phone': PhoneIcon,
  'Tablet': TabletIcon,
};

const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategory, setActiveCategory, onBlogClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const homeCategory = CATEGORIES[0];
  const otherCategories = CATEGORIES.slice(1);
  const isHomeActive = activeCategory === homeCategory;
  const HomeIconComponent = categoryIcons[homeCategory];
  
  // Check if one of the sub-categories is currently active
  const isSubCategoryActive = otherCategories.includes(activeCategory);

  return (
    <nav className="mt-8 flex flex-col items-center w-full z-40 relative">
      {/* Main Navigation Row - Made horizontal on mobile using flex-nowrap and overflow-x-auto */}
      <div className="w-full flex justify-center">
        <div className="flex flex-nowrap items-center gap-2 sm:gap-6 bg-white/60 backdrop-blur-md p-2 sm:p-3 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-x-auto no-scrollbar max-w-full">
          
          {/* Home Button */}
          <button
            onClick={() => {
              setActiveCategory(homeCategory);
              setIsDropdownOpen(false);
            }}
            className={`
              group relative flex flex-shrink-0 items-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 overflow-hidden
              ${isHomeActive 
                ? 'text-white shadow-lg shadow-orange-500/25 ring-2 ring-orange-500 ring-offset-2 ring-offset-sky-50' 
                : 'bg-white text-gray-600 hover:text-orange-600 shadow-sm hover:shadow-md border border-gray-50'}
            `}
          >
            {isHomeActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500" />
            )}
            <div className="relative z-10 flex items-center gap-1.5 sm:gap-2.5">
              <HomeIconComponent className={`h-4 w-4 sm:h-5 sm:w-5 ${!isHomeActive && 'group-hover:scale-110 transition-transform'}`} />
              <span className="font-extrabold text-xs sm:text-base tracking-wide uppercase whitespace-nowrap">Home</span>
            </div>
          </button>

          {/* Category Toggle Button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`
              group relative flex flex-shrink-0 items-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all duration-300
              ${(isSubCategoryActive || isDropdownOpen)
                ? 'bg-white text-orange-600 shadow-lg shadow-orange-100 ring-2 ring-orange-400 ring-offset-2 ring-offset-sky-50' 
                : 'bg-white text-gray-600 hover:text-orange-600 shadow-sm hover:shadow-md border border-gray-50'}
            `}
          >
            <CategoryIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${!isSubCategoryActive && 'group-hover:scale-110 transition-transform'}`} />
            <span className="font-extrabold text-xs sm:text-base tracking-wide uppercase whitespace-nowrap">Category</span>
          </button>

          {/* Blog Button */}
          <button
            onClick={onBlogClick}
            className="group flex flex-shrink-0 items-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white text-gray-600 hover:text-orange-600 border border-gray-50"
          >
            <BlogIcon className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-xs sm:text-base tracking-wide uppercase whitespace-nowrap">Blog</span>
          </button>
        </div>
      </div>

      {/* Expandable Categories Panel - Updated to flex-nowrap and horizontal layout on mobile */}
      <div 
        className={`
          w-full flex justify-center
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${isDropdownOpen 
            ? 'max-h-40 opacity-100 mt-5 translate-y-0' 
            : 'max-h-0 opacity-0 mt-0 -translate-y-4 pointer-events-none'}
        `}
      >
        <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-xl shadow-orange-500/5 border border-orange-100/30 flex flex-nowrap items-center justify-center gap-1.5 sm:gap-3 max-w-full overflow-x-auto no-scrollbar mx-auto transform transition-transform">
            {otherCategories.map((category) => {
                const IconComponent = categoryIcons[category];
                const isActive = activeCategory === category;
                return (
                    <button
                    key={category}
                    onClick={() => {
                        setActiveCategory(category);
                        setIsDropdownOpen(false);
                    }}
                    className={`
                        relative flex flex-shrink-0 items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl transition-all duration-300 group
                        ${isActive 
                            ? 'text-white shadow-md shadow-orange-500/20' 
                            : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'}
                    `}
                    >
                    {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 rounded-xl" />
                    )}
                    <div className="relative z-10 flex items-center gap-2">
                        <IconComponent className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                        <span className="font-bold text-[10px] sm:text-sm tracking-widest uppercase whitespace-nowrap">{category}</span>
                    </div>
                    </button>
                );
            })}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
