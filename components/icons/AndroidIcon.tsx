
import React from 'react';

export const AndroidIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.5 8.5c0-2-1.5-3.5-3.5-3.5s-3.5 1.5-3.5 3.5" />
    <path d="M4 14.5c0-2 2-3.5 4-3.5h8c2 0 4 1.5 4 3.5v2c0 1.5-1.5 3-3.5 3h-9C5.5 19.5 4 18 4 16.5v-2z" />
    <line x1="7.5" y1="6" x2="9" y2="7.5" />
    <line x1="16.5" y1="6" x2="15" y2="7.5" />
  </svg>
);
