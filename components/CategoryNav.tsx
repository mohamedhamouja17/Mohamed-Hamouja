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

const categoryStyles: Record<Exclude<Category, 'Home'>, { active: string; inactive: string; icon: string; }> = {
    'PC': {
      active: 'bg-blue-500 text-white shadow-blue-500/30',
      inactive: 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] hover:text-white',
      icon: 'text-blue-400'
    },
    'Phone': {
      active: 'bg-indigo-500 text-white shadow-indigo-500/30',
      inactive: 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] hover:text-white',
      icon: 'text-indigo-400'
    },
    'Tablet': {
      active: 'bg-purple-500 text-white shadow-purple-500/30',
      inactive: 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] hover:text-white',
      icon: 'text-purple-400'
    },
    'TV': {
      active: 'bg-red-500 text-white shadow-red-500/30',
      inactive: 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] hover:text-white',
      icon: 'text-red-400'
    },
    'App Icons': {
      active: 'bg-orange-500 text-white shadow-orange-500/30',
      inactive: 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] hover:text-white',
      icon: 'text-orange-400'
    },
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

      <ul className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 md:gap-5">
        {otherCategories.map((category) => {
          const IconComponent = categoryIcons[category];
          const isActive = activeCategory === category;
          const styles = categoryStyles[category as Exclude<Category, 'Home'>];
          return (
            <li key={category}>
              <button
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-all duration-300 rounded-lg px-4 py-2 transform hover:scale-105 shadow-lg ${
                  isActive
                    ? styles.active
                    : styles.inactive
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <IconComponent className={`h-4 w-4 transition-colors ${!isActive ? styles.icon : ''}`} />
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
