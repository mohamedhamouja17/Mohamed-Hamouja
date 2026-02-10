
import React from 'react';
import { Link } from 'react-router-dom';
import { EmailIcon } from './icons/EmailIcon.tsx';
import { TwitterIcon } from './icons/TwitterIcon.tsx';
import { InstagramIcon } from './icons/InstagramIcon.tsx';
import { FacebookIcon } from './icons/FacebookIcon.tsx';
import { TikTokIcon } from './icons/TikTokIcon.tsx';
import { YouTubeIcon } from './icons/YouTubeIcon.tsx';
import { PinterestIcon } from './icons/PinterestIcon.tsx';
import { BlueskyIcon } from './icons/BlueskyIcon.tsx';
import { ThreadsIcon } from './icons/ThreadsIcon.tsx';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pt-8 border-t border-sky-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-sm">
          <h3 className="font-bold text-base text-gray-800 mb-4">About the Site</h3>
          <p className="text-gray-600 leading-relaxed">Your site for downloading high-quality wallpapers for all devices.</p>
        </div>
        
        <div className="text-sm">
          <h3 className="font-bold text-base text-gray-800 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors text-left font-medium block">About</Link></li>
            <li><Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors text-left font-medium block">Blog</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors text-left font-medium block">Contact</Link></li>
          </ul>
        </div>
        
        <div className="text-sm">
          <h3 className="font-bold text-base text-gray-800 mb-4">Follow Us</h3>
          <ul className="space-y-2.5">
             <li className="flex items-center gap-3">
               <EmailIcon className="h-4 w-4 text-gray-500" />
               <a href="mailto:walzoo@hotmail.com" className="text-gray-600 hover:text-gray-900 transition-colors">walzoo@hotmail.com</a>
             </li>
             <li className="flex items-center gap-3">
               <FacebookIcon className="h-4 w-4 text-gray-500" />
               <a href="https://www.facebook.com/profile.php?id=61587330201337&sk=directory_contact_info" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Facebook</a>
             </li>
             <li className="flex items-center gap-3">
               <TwitterIcon className="h-4 w-4 text-gray-500" />
               <a href="https://x.com/WalzooWallpaper" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">X (Twitter)</a>
             </li>
             <li className="flex items-center gap-3">
               <InstagramIcon className="h-4 w-4 text-gray-500" />
               <a href="https://www.instagram.com/walzoo_wallpapers" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Instagram</a>
             </li>
             <li className="flex items-center gap-3">
               <ThreadsIcon className="h-4 w-4 text-gray-500" />
               <a href="https://www.threads.com/@walzoo_wallpapers" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Threads</a>
             </li>
             <li className="flex items-center gap-3">
               <TikTokIcon className="h-4 w-4 text-gray-500" />
               <a href="https://www.tiktok.com/@walzoo_wallpapers?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">TikTok</a>
             </li>
             <li className="flex items-center gap-3">
               <YouTubeIcon className="h-4 w-4 text-gray-500" />
               <a href="https://www.youtube.com/channel/UCraHPPThK39ceCb_jNcKyHA" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">YouTube</a>
             </li>
             <li className="flex items-center gap-3">
               <PinterestIcon className="h-4 w-4 text-gray-500" />
               <a href="https://www.pinterest.com/Walzoo_Wallpapers" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Pinterest</a>
             </li>
             <li className="flex items-center gap-3">
               <BlueskyIcon className="h-4 w-4 text-gray-500" />
               <a href="https://bsky.app/profile/walzoo-wallpaper.bsky.social" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Bluesky</a>
             </li>
          </ul>
        </div>
        
        <div className="text-sm">
          <h3 className="font-bold text-base text-gray-800 mb-4">Legal</h3>
          <ul className="space-y-3">
            <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors text-left font-medium block">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-gray-600 hover:text-gray-900 transition-colors text-left font-medium block">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-sky-200 text-center">
        <p className="text-gray-500 text-sm">© 2026 WALZOO, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
