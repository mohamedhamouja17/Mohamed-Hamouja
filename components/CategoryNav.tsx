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
  'Desktop Fun': DesktopIcon,
  'Phone Fun': PhoneIcon,
  'Tablet Fun': TabletIcon,
  'Big Screen Fun': TvIcon,
  'Cute Icons': AppIcon,
};

const categoryStyles: Record<Exclude<Category, 'Home'>, { active: string; inactive: string; icon: string; }> = {
    'Desktop Fun': {
      active: 'bg-sky-500 text-white shadow-sky-500/40',
      inactive: 'bg-white text-gray-700 hover:bg-sky-100',
      icon: 'text-sky-500'
    },
    'Phone Fun': {
      active: 'bg-green-500 text-white shadow-green-500/40',
      inactive: 'bg-white text-gray-700 hover:bg-green-100',
      icon: 'text-green-500'
    },
    'Tablet Fun': {
      active: 'bg-purple-500 text-white shadow-purple-500/40',
      inactive: 'bg-white text-gray-700 hover:bg-purple-100',
      icon: 'text-purple-500'
    },
    'Big Screen Fun': {
      active: 'bg-red-500 text-white shadow-red-500/40',
      inactive: 'bg-white text-gray-700 hover:bg-red-100',
      icon: 'text-red-500'
    },
    'Cute Icons': {
      active: 'bg-pink-500 text-white shadow-pink-500/40',
      inactive: 'bg-white text-gray-700 hover:bg-pink-100',
      icon: 'text-pink-500'
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
              ? 'bg-orange-500 text-white shadow-orange-500/40'
              : 'bg-white text-gray-700 hover:bg-orange-100'
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