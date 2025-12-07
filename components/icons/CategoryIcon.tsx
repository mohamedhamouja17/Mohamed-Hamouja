
import React from 'react';

export const CategoryIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="14" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
  </svg>
);
