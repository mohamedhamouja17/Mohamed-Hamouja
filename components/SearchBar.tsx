
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { type Category } from '../types';

const filterCategories = [
  'All',
  'Space',
  'Nature',
  'Cities & Landmarks',
  'Abstract',
  'Minimalist',
  'Digital Art',
  'Animals',
  'Cars',
  'Gaming',
  'Anime',
  'Sports',
  'Culture & Heritage',
  'Seasons & Holidays',
  'Technology',
];

interface SearchBarProps {
  activeCategory: Category;
}

const SearchBar: React.FC<SearchBarProps> = ({ activeCategory }) => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
      <div className="relative flex-grow">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by style, theme, subject..."
          className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow"
        />
      </div>
      {activeCategory !== 'App Icons' && (
        <div className="relative">
          <select className="appearance-none w-full sm:w-auto bg-white border border-gray-200 rounded-lg py-3 pl-4 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer">
            {filterCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;