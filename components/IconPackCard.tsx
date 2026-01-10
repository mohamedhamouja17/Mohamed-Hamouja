import React from 'react';
import { type IconPack } from '../types.ts';
import { DownloadIcon } from './icons/DownloadIcon.tsx';

interface IconPackCardProps {
  pack: IconPack;
  showDownloadButton?: boolean;
}

const IconPackCard: React.FC<IconPackCardProps> = ({ pack, showDownloadButton = true }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 flex flex-col">
      <div className="aspect-square">
        <img
          src={pack.imageUrl}
          alt={pack.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-800">{pack.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{pack.count} icons</p>
        <div className="flex-grow"></div>
        {showDownloadButton && (
          <>
            <hr className="border-gray-200 my-4" />
            <button className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-lg transition-colors">
              <DownloadIcon className="h-5 w-5" />
              Download Pack
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default IconPackCard;