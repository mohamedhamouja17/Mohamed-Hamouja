
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

  return (
    <nav className="mt-10 lg:mt-14 flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-6 lg:mb-10 relative z-30">
        
        {/* Home Button */}
        <button
          onClick={() => setActiveCategory(homeCategory)}
          className={`flex items-center gap-2.5 lg:gap-3 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-3 rounded-xl shadow-lg transform hover:scale-105 ${
            isHomeActive
              ? 'bg-orange-500 text-white shadow-orange-500/40'
              : 'bg-white text-gray-700 hover:bg-orange-100'
          }`}
        >
          <HomeIconComponent className="h-5 w-5 lg:h-6 lg:w-6" />
          <span>{homeCategory.toUpperCase()}</span>
        </button>

        {/* Category Dropdown Wrapper */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2.5 lg:gap-3 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-3 rounded-xl shadow-lg transform hover:scale-105 ${
                !isHomeActive ? 'bg-orange-100 text-orange-600' : 'bg-white text-gray-700 hover:bg-orange-100'
            }`}
          >
            <CategoryIcon className="h-5 w-5 lg:h-6 lg:w-6" />
            <span>CATEGORY</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2 animate-fade-in">
              <ul className="flex flex-col">
                {otherCategories.map((category) => {
                  const IconComponent = categoryIcons[category];
                  const isActive = activeCategory === category;
                  return (
                    <li key={category}>
                      <button
                        onClick={() => {
                          setActiveCategory(category);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50 ${
                            isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
                        }`}
                      >
                        <IconComponent className={`h-5 w-5 ${isActive ? 'text-orange-500' : 'text-gray-400'}`} />
                        <span className={`text-lg font-medium ${isActive ? 'font-bold' : ''}`}>{category}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Blog Button */}
        <button
          onClick={onBlogClick}
          className="flex items-center gap-2.5 lg:gap-3 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-3 rounded-xl shadow-lg transform hover:scale-105 bg-white text-gray-700 hover:bg-orange-100"
        >
          <BlogIcon className="h-5 w-5 lg:h-6 lg:w-6" />
          <span>BLOG</span>
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default CategoryNav;
