import React from 'react';
import { type Category, CATEGORIES } from '../types.ts';
import { DesktopIcon } from './icons/DesktopIcon.tsx';
import { PhoneIcon } from './icons/PhoneIcon.tsx';
import { TabletIcon } from './icons/TabletIcon.tsx';

interface CategoryNavProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categoryIcons: Record<Exclude<Category, 'Home'>, React.FC<{className: string}>> = {
  'Desktop': DesktopIcon,
  'Phone': PhoneIcon,
  'Tablet': TabletIcon,
};

const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategory, onCategoryChange }) => {
  const mainCategories = CATEGORIES.filter(c => c !== 'Home') as Exclude<Category, 'Home'>[];

  return (
    <nav className="mt-8 flex flex-col items-center w-full z-40 relative">
      <div className="w-full flex justify-center">
        <div className="flex flex-nowrap items-center gap-2 sm:gap-4 bg-white/60 backdrop-blur-md p-2 sm:p-2.5 rounded-full border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-x-auto no-scrollbar max-w-full">
          {mainCategories.map((category) => {
            const IconComponent = categoryIcons[category];
            const isActive = activeCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`
                  group relative flex flex-shrink-0 items-center gap-1.5 sm:gap-2.5 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 overflow-hidden
                  ${isActive 
                    ? 'text-white shadow-lg shadow-orange-500/25 ring-2 ring-orange-500 ring-offset-2 ring-offset-sky-50' 
                    : 'bg-white text-gray-600 hover:text-orange-600 shadow-sm hover:shadow-md border border-gray-50'}
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500" />
                )}
                <div className="relative z-10 flex items-center gap-1.5 sm:gap-2.5">
                  <IconComponent className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="font-extrabold text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap">{category}</span>
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