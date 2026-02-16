
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { TigerClawsIcon } from './icons/TigerClawsIcon.tsx';

/**
 * GEMINI AI SYSTEM INSTRUCTION:
 * When generating blog posts for Walzoo, use the following schema:
 * {
 *   "title": "...",
 *   "excerpt": "...",
 *   "device": "Desktop" | "Phone" | "Tablet",
 *   "tags": ["..."],
 *   "category": "Must match the primary device the images are intended for"
 * }
 * RULE: Tag the post as "Phone" if images are vertical (9:16), "Desktop" if horizontal (16:9), and "Tablet" for 3:4.
 */
export const BLOG_AI_PROMPT_GUIDE = "Always include a 'device' property (Desktop, Phone, or Tablet) in the JSON output. Tag as Phone if content is mobile-focused.";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Top 10 Wallpaper Trends for 2025",
    excerpt: "Discover the latest styles taking over screens everywhere, from minimalist 3D renders to retro vaporwave aesthetics.",
    date: "October 15, 2024",
    imageUrl: "https://picsum.photos/seed/blog1/800/450",
    author: "Alex Design",
    device: "Desktop"
  },
  {
    id: 2,
    title: "How to Customize Your Android Home Screen",
    excerpt: "A comprehensive guide to using our icon packs and widgets to create a truly unique mobile experience.",
    date: "October 22, 2024",
    imageUrl: "https://picsum.photos/seed/blog2/800/1422",
    author: "Sarah Tech",
    device: "Phone"
  },
  {
    id: 3,
    title: "The Psychology of Color in Desktop Backgrounds",
    excerpt: "Learn how the colors on your screen can affect your mood, productivity, and creativity throughout the day.",
    date: "November 5, 2024",
    imageUrl: "https://picsum.photos/seed/blog3/800/450",
    author: "Dr. Hue",
    device: "Desktop"
  },
  {
    id: 4,
    title: "The Ultimate Guide to Tablet Productivity",
    excerpt: "Transform your tablet into a powerhouse with these essential layout tips and wallpaper choices.",
    date: "November 12, 2024",
    imageUrl: "https://picsum.photos/seed/blog4/800/1066",
    author: "Walzoo Team",
    device: "Tablet"
  }
];

const BlogPage: React.FC = () => {
  const { device } = useParams<{ device: string }>();
  // Normalize the device string for comparison
  const activeDevice = device?.toLowerCase() || 'desktop';
  
  const filteredPosts = BLOG_POSTS.filter(post => post.device.toLowerCase() === activeDevice);

  const getPostAspectRatio = (deviceType: string) => {
    switch (deviceType) {
      case 'Phone': return 'aspect-[9/16]';
      case 'Tablet': return 'aspect-[3/4]';
      case 'Desktop': 
      default: return 'aspect-[16/9]';
    }
  };

  const getGridClasses = () => {
    switch (activeDevice) {
      case 'phone':
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8";
      case 'tablet':
        return "grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10";
      case 'desktop':
      default:
        return "grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12";
    }
  };

  return (
    <div className="mt-10 animate-fade-in max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Walzoo Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 px-4">
          Expert guides and inspiration tailored for your <span className="text-orange-500 font-bold capitalize">{activeDevice}</span> screens.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
            {[
                { label: 'Desktop', path: '/blog/desktop' },
                { label: 'Phone', path: '/blog/phone' },
                { label: 'Tablet', path: '/blog/tablet' }
            ].map((btn) => (
                <NavLink
                    key={btn.path}
                    to={btn.path}
                    className={({ isActive }) => `
                        px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                        ${isActive 
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-lg shadow-orange-500/25 scale-105' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500 shadow-sm'}
                    `}
                >
                    {btn.label}
                </NavLink>
            ))}
        </div>
      </div>

      <div className="px-4">
        {filteredPosts.length > 0 ? (
            <div className={getGridClasses()}>
                {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 group">
                    <div className={`overflow-hidden relative ${getPostAspectRatio(post.device)}`}>
                        <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg z-10">
                            {post.device}
                        </div>
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                        <div className="flex items-center text-[10px] sm:text-xs font-bold text-gray-400 mb-3 space-x-3 uppercase tracking-wider">
                            <span>{post.date}</span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                            <span>{post.author}</span>
                        </div>
                        <h2 className={`font-bold text-gray-800 mb-3 leading-tight group-hover:text-orange-500 transition-colors cursor-pointer ${activeDevice === 'phone' ? 'text-lg' : 'text-2xl'}`}>
                            {post.title}
                        </h2>
                        <p className={`text-gray-500 mb-6 leading-relaxed flex-grow line-clamp-3 ${activeDevice === 'phone' ? 'text-sm' : 'text-base'}`}>
                            {post.excerpt}
                        </p>
                        <button className="self-start text-orange-500 font-black text-xs uppercase tracking-widest hover:text-orange-600 transition-colors flex items-center gap-2 group-link">
                            Read More
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </article>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium italic">No articles found for {activeDevice} yet.</p>
            </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="mt-20 mx-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 -mt-10 -mr-10 text-gray-700 opacity-20 transform rotate-12">
             <TigerClawsIcon className="w-64 h-64" />
         </div>
         
         <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">Get the latest wallpapers, icon packs, and design tips delivered straight to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-6 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 flex-grow"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-lg">
                    Subscribe
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BlogPage;
