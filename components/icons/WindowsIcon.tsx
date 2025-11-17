
import React from 'react';

export const WindowsIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h8v8H3z"/>
    <path d="M13 3h8v8h-8z"/>
    <path d="M3 13h8v8H3z"/>
    <path d="M13 13h8v8h-8z"/>
  </svg>
);
