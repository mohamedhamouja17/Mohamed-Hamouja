import React from 'react';
import { TigerClawsIcon } from './icons/TigerClawsIcon.tsx';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Top 10 Wallpaper Trends for 2025",
    excerpt: "Discover the latest styles taking over screens everywhere, from minimalist 3D renders to retro vaporwave aesthetics.",
    date: "October 15, 2024",
    imageUrl: "https://picsum.photos/seed/blog1/800/600",
    author: "Alex Design"
  },
  {
    id: 2,
    title: "How to Customize Your Android Home Screen",
    excerpt: "A comprehensive guide to using our icon packs and widgets to create a truly unique mobile experience.",
    date: "October 22, 2024",
    imageUrl: "https://picsum.photos/seed/blog2/800/600",
    author: "Sarah Tech"
  },
  {
    id: 3,
    title: "The Psychology of Color in Desktop Backgrounds",
    excerpt: "Learn how the colors on your screen can affect your mood, productivity, and creativity throughout the day.",
    date: "November 5, 2024",
    imageUrl: "https://picsum.photos/seed/blog3/800/600",
    author: "Dr. Hue"
  },
  {
    id: 4,
    title: "Interview with Featured Artist: PixelMaster",
    excerpt: "We sat down with one of our most popular creators to discuss inspiration, tools, and the future of digital art.",
    date: "November 12, 2024",
    imageUrl: "https://picsum.photos/seed/blog4/800/600",
    author: "Walzoo Team"
  }
];

const BlogPage: React.FC = () => {
  return (
    <div className="mt-10 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Walzoo Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          News, tips, and inspiration from the world of digital customization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
            <div className="h-48 sm:h-64 overflow-hidden relative">
                <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Article
                </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{post.author}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight hover:text-orange-500 transition-colors cursor-pointer">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                {post.excerpt}
              </p>
              <button className="self-start text-orange-500 font-bold hover:text-orange-600 transition-colors flex items-center gap-2 group">
                Read Article 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </article>
        ))}
      </div>

        {/* Newsletter Section */}
      <div className="mt-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
         {/* Decorative element */}
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
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;