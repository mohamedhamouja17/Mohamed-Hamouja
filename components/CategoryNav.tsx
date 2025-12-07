
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
    <nav className="mt-6 sm:mt-10 flex flex-col items-center w-full z-40">
      {/* Main Navigation Row */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
        
        {/* Home Button */}
        <button
          onClick={() => {
            setActiveCategory(homeCategory);
            setIsDropdownOpen(false);
          }}
          className={`
            flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105
            ${isHomeActive 
              ? 'bg-orange-500 text-white shadow-orange-500/30' 
              : 'bg-white text-gray-700 hover:bg-orange-50'}
          `}
        >
          <HomeIconComponent className="h-5 w-5" />
          <span className="font-bold text-sm sm:text-base">HOME</span>
        </button>

        {/* Category Toggle Button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`
            flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105
            ${(isSubCategoryActive || isDropdownOpen)
              ? 'bg-orange-100 text-orange-600 ring-2 ring-orange-200' 
              : 'bg-white text-gray-700 hover:bg-orange-50'}
          `}
        >
          <CategoryIcon className="h-5 w-5" />
          <span className="font-bold text-sm sm:text-base">CATEGORY</span>
        </button>

        {/* Blog Button */}
        <button
          onClick={onBlogClick}
          className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 bg-white text-gray-700 hover:bg-orange-50"
        >
          <BlogIcon className="h-5 w-5" />
          <span className="font-bold text-sm sm:text-base">BLOG</span>
        </button>
      </div>

      {/* Expandable Categories Panel (Appears at the bottom) */}
      <div 
        className={`
          w-full max-w-2xl overflow-hidden transition-all duration-500 ease-in-out
          ${isDropdownOpen ? 'max-h-48 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}
        `}
      >
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white p-3 sm:p-5 mx-auto w-[95%] sm:w-full">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {otherCategories.map((category) => {
                  const IconComponent = categoryIcons[category];
                  const isActive = activeCategory === category;
                  return (
                      <button
                        key={category}
                        onClick={() => {
                          setActiveCategory(category);
                          setIsDropdownOpen(false); // Close panel after selection
                        }}
                        className={`
                            flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-all duration-300
                            ${isActive 
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                                : 'bg-white text-gray-600 hover:bg-orange-50 shadow-sm border border-gray-100'}
                        `}
                      >
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="font-semibold text-sm sm:text-base">{category.toUpperCase()}</span>
                      </button>
                  );
                })}
            </div>
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
