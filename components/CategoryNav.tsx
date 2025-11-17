import React from 'react';
import { type Category, CATEGORIES } from '../types';
import { DesktopIcon } from './icons/DesktopIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { TabletIcon } from './icons/TabletIcon';
import { TvIcon } from './icons/TvIcon';
import { AppIcon } from './icons/AppIcon';
import { HomeIcon } from './icons/HomeIcon';

interface CategoryNavProps {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
}

const categoryIcons: Record<Category, React.FC<{className: string}>> = {
  'Home': HomeIcon,
  'PC': DesktopIcon,
  'Phone': PhoneIcon,
  'Tablet': TabletIcon,
  'TV': TvIcon,
  'App Icons': AppIcon,
};

const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategory, setActiveCategory }) => {
  const homeCategory = CATEGORIES[0];
  const otherCategories = CATEGORIES.slice(1);
  const isHomeActive = activeCategory === homeCategory;
  const HomeIconComponent = categoryIcons[homeCategory];

  return (
    <nav className="mt-10">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveCategory(homeCategory)}
          className={`flex items-center gap-2.5 text-sm sm:text-base font-semibold transition-all duration-300 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg transform hover:scale-105 ${
            isHomeActive
              ? 'bg-blue-500 text-white'
              : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
          }`}
          aria-current={isHomeActive ? 'page' : undefined}
        >
          <HomeIconComponent className="h-5 w-5" />
          <span>{homeCategory.toUpperCase()}</span>
        </button>
      </div>

      <ul className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 border-b border-gray-700 pb-3">
        {otherCategories.map((category) => {
          const IconComponent = categoryIcons[category];
          const isActive = activeCategory === category;
          return (
            <li key={category}>
              <button
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors pb-3 border-b-2 ${
                  isActive
                    ? 'text-blue-400 border-blue-400'
                    : 'text-gray-400 hover:text-white border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <IconComponent className="h-4 w-4" />
                <span>{category.toUpperCase()}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoryNav;