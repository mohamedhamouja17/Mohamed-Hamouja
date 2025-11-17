
import React, { useState } from 'react';

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2; // This would be dynamic in a real app

  return (
    <div className="flex justify-center items-center gap-4 my-10">
      <button 
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-[#2a2a2a] rounded-lg text-gray-300 hover:bg-[#3a3a3a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
      >
        &lt; Previous
      </button>
      <span className="text-gray-400 text-sm">Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-[#2a2a2a] rounded-lg text-gray-300 hover:bg-[#3a3a3a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
