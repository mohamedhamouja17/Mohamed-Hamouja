import React from 'react';
import { type OperatingSystem, OPERATING_SYSTEMS } from '../types';

interface AppIconsSubNavProps {
  activeOs: OperatingSystem;
  setActiveOs: (os: OperatingSystem) => void;
}

const AppIconsSubNav: React.FC<AppIconsSubNavProps> = ({ activeOs, setActiveOs }) => {
  return (
    <nav className="mt-8">
      <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {OPERATING_SYSTEMS.map((os) => {
          const isActive = activeOs === os;
          return (
            <li key={os}>
              <button
                onClick={() => setActiveOs(os)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {os.toUpperCase()}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AppIconsSubNav;
