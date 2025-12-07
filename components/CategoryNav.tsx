
import React from 'react';
import { type Category, CATEGORIES } from '../types';
import { DesktopIcon } from './icons/DesktopIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { TabletIcon } from './icons/TabletIcon';
import { HomeIcon } from './icons/HomeIcon';

interface CategoryNavProps {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
}

const categoryIcons: Record<Category, React.FC<{className: string}>> = {
  'Home': HomeIcon,
  'Desktop': DesktopIcon,
  'Phone': PhoneIcon,
  'Tablet': TabletIcon,
};

const categoryStyles: Record<Exclude<Category, 'Home'>, { active: string; inactive: string; icon: string; }> = {
    'Desktop': {
      active: 'bg-sky-500 text-white shadow-sky-500/40',
      inactive: 'bg-white text-gray-700 hover:bg-sky-100',
      icon: 'text-sky-500'
    },
    'Phone': {
      active: 'bg-green-500 text-white shadow-green-500/40',
      inactive: 'bg-white text-gray-700 hover:bg-green-100',
      icon: 'text-green-500'
    },
    'Tablet': {
      active: 'bg-purple-500 text-white shadow-purple-500/40',
      inactive: 'bg-white text-gray-700 hover:bg-purple-100',
      icon: 'text-purple-500'
    },
  };


const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategory, setActiveCategory }) => {
  const homeCategory = CATEGORIES[0];
  const otherCategories = CATEGORIES.slice(1);
  const isHomeActive = activeCategory === homeCategory;
  const HomeIconComponent = categoryIcons[homeCategory];

  return (
    <nav className="mt-10 lg:mt-14">
      <div className="flex justify-center mb-6 lg:mb-10">
        <button
          onClick={() => setActiveCategory(homeCategory)}
          className={`flex items-center gap-2.5 lg:gap-4 text-sm sm:text-base lg:text-2xl font-semibold transition-all duration-300 px-4 py-2 sm:px-6 sm:py-3 lg:px-12 lg:py-5 rounded-xl shadow-lg transform hover:scale-105 ${
            isHomeActive
              ? 'bg-orange-500 text-white shadow-orange-500/40'
              : 'bg-white text-gray-700 hover:bg-orange-100'
          }`}
          aria-current={isHomeActive ? 'page' : undefined}
        >
          <HomeIconComponent className="h-5 w-5 lg:h-8 lg:w-8" />
          <span>{homeCategory.toUpperCase()}</span>
        </button>
      </div>

      <ul className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 md:gap-5 lg:gap-8">
        {otherCategories.map((category) => {
          const IconComponent = categoryIcons[category];
          const isActive = activeCategory === category;
          const styles = categoryStyles[category as Exclude<Category, 'Home'>];
          return (
            <li key={category}>
              <button
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-1.5 lg:gap-3 text-xs sm:text-sm lg:text-lg font-medium transition-all duration-300 rounded-lg px-4 py-2 lg:px-8 lg:py-4 transform hover:scale-105 shadow-lg ${
                  isActive
                    ? styles.active
                    : styles.inactive
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <IconComponent className={`h-4 w-4 lg:h-6 lg:w-6 transition-colors ${!isActive ? styles.icon : ''}`} />
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
