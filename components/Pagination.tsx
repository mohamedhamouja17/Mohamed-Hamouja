
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 my-10 animate-fade-in">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 disabled:hover:border-gray-200 transition-all text-sm font-bold shadow-sm flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Previous</span>
      </button>
      
      <div className="flex items-center bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mr-2">Page</span>
        <span className="text-orange-600 font-black text-sm">{currentPage}</span>
        <span className="text-gray-300 font-medium mx-2">/</span>
        <span className="text-gray-500 font-bold text-sm">{totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 disabled:hover:border-gray-200 transition-all text-sm font-bold shadow-sm flex items-center gap-2"
      >
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
