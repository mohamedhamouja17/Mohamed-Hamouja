import React from 'react';
import { type OperatingSystem, OPERATING_SYSTEMS } from '../types';

interface AppIconsSubNavProps {
  activeOs: OperatingSystem;
  setActiveOs: (os: OperatingSystem) => void;
}

const osStyles: Record<OperatingSystem, { active: string }> = {
    'Android': {
      active: 'bg-green-500 text-white shadow-green-500/30',
    },
    'iOS': {
      active: 'bg-slate-500 text-white shadow-slate-500/30',
    },
    'Windows': {
      active: 'bg-sky-500 text-white shadow-sky-500/30',
    },
    'Mac': {
      active: 'bg-indigo-500 text-white shadow-indigo-500/30',
    },
};


const AppIconsSubNav: React.FC<AppIconsSubNavProps> = ({ activeOs, setActiveOs }) => {
  return (
    <nav className="mt-8">
      <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {OPERATING_SYSTEMS.map((os) => {
          const isActive = activeOs === os;
          const styles = osStyles[os];
          return (
            <li key={os}>
              <button
                onClick={() => setActiveOs(os)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isActive
                    ? styles.active
                    : 'bg-white text-gray-700 hover:bg-gray-100'
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