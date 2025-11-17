
import React from 'react';
import { EmailIcon } from './icons/EmailIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { BlogIcon } from './icons/BlogIcon';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pt-8 border-t border-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="text-sm">
          <h3 className="font-bold text-base text-gray-200 mb-4">About the Site</h3>
          <p className="text-gray-400 leading-relaxed">Your site for downloading high-quality wallpapers for all devices.</p>
        </div>
        
        {/* Quick Links */}
        <div className="text-sm">
          <h3 className="font-bold text-base text-gray-200 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Use</a></li>
          </ul>
        </div>
        
        {/* Contact */}
        <div className="text-sm">
          <h3 className="font-bold text-base text-gray-200 mb-4">Contact</h3>
          <ul className="space-y-3">
             <li className="flex items-center gap-3">
               <EmailIcon className="h-4 w-4 text-gray-500" />
               <a href="#" className="text-gray-400 hover:text-white transition-colors">Email</a>
             </li>
             <li className="flex items-center gap-3">
               <TwitterIcon className="h-4 w-4 text-gray-500" />
               <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
             </li>
             <li className="flex items-center gap-3">
               <InstagramIcon className="h-4 w-4 text-gray-500" />
               <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
             </li>
             <li className="flex items-center gap-3">
               <FacebookIcon className="h-4 w-4 text-gray-500" />
               <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
             </li>
             <li className="flex items-center gap-3">
               <BlogIcon className="h-4 w-4 text-gray-500" />
               <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
             </li>
          </ul>
        </div>
        
        {/* Legal */}
        <div className="text-sm">
          <h3 className="font-bold text-base text-gray-200 mb-4">Legal</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">© 2025 WALZOO, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
