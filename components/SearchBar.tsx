
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { SUB_CATEGORIES } from '../constants';

const filterCategories = ['All', ...SUB_CATEGORIES];

interface SearchBarProps {
  activeSubCategory: string;
  onSubCategoryChange: (category: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ activeSubCategory, onSubCategoryChange }) => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
      <div className="relative flex-grow">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by style, theme, subject..."
          className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow shadow-sm"
        />
      </div>
      <div className="relative min-w-[160px]">
        <select 
          value={activeSubCategory}
          onChange={(e) => onSubCategoryChange(e.target.value)}
          className="appearance-none w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-5 pr-12 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-sm font-semibold text-sm"
        >
          {filterCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default SearchBar;
