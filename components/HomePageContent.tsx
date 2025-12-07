import React from 'react';
import SubscriptionCTA from './SubscriptionCTA';
import { type Wallpaper } from '../types';

interface HomePageContentProps {
  onSubscribeClick: () => void;
  onDownloadClick: (wallpaper: Wallpaper) => void;
}

const HomePageContent: React.FC<HomePageContentProps> = ({ onSubscribeClick }) => {
  return (
    <div className="mt-10">
      <SubscriptionCTA onSubscribeClick={onSubscribeClick} />
    </div>
  );
};

export default HomePageContent;