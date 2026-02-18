
import React, { useMemo } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import { TigerClawsIcon } from './icons/TigerClawsIcon.tsx';

// Simple parser for Markdown Frontmatter
const parsePost = (filename: string, rawContent: string) => {
  const slug = filename.split('/').pop()?.replace('.md', '') || '';
  const frontmatterMatch = rawContent.match(/^---([\s\S]*?)---/);
  const metadata: any = {};
  
  if (frontmatterMatch) {
    frontmatterMatch[1].split('\n').forEach(line => {
      const [key, ...value] = line.split(':');
      if (key && value.length) {
        metadata[key.trim()] = value.join(':').trim();
      }
    });
  }

  return {
    slug,
    title: metadata.title || 'Untitled Post',
    excerpt: metadata.excerpt || '',
    date: metadata.date || 'Recent',
    imageUrl: metadata.imageUrl || 'https://picsum.photos/seed/walzoo/800/450',
    author: metadata.author || 'Walzoo Team',
    device: metadata.device || 'Desktop',
    category: metadata.category || 'General'
  };
};

// Use Vite's glob import to read all .md files in the content/blog directory
// Fix: Cast import.meta to any to support Vite's glob feature in TypeScript
const modules = (import.meta as any).glob('/content/blog/*.md', { eager: true, as: 'raw' });

const ALL_POSTS = Object.entries(modules).map(([path, content]) => 
  parsePost(path, content as string)
);

const BlogPage: React.FC = () => {
  const { device } = useParams<{ device: string }>();
  const activeDevice = device?.toLowerCase() || 'desktop';
  
  const filteredPosts = useMemo(() => 
    ALL_POSTS.filter(post => post.device.toLowerCase() === activeDevice),
    [activeDevice]
  );

  const getPostAspectRatio = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case 'phone': return 'aspect-[9/16]';
      case 'tablet': return 'aspect-[3/4]';
      case 'desktop': 
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
    <div className="mt-10 animate-fade-in max-w-7xl mx-auto px-4 font-poppins">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 font-baloo">
          Walzoo Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tailored inspiration for your <span className="text-orange-500 font-bold capitalize font-baloo">{activeDevice}</span> screens.
        </p>

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
                        px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border uppercase tracking-widest
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

      <div>
        {filteredPosts.length > 0 ? (
            <div className={getGridClasses()}>
                {filteredPosts.map((post) => (
                <Link to={`/blog/post/${post.slug}`} key={post.slug} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 group">
                    <div className={`overflow-hidden relative ${getPostAspectRatio(post.device)}`}>
                        <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            onContextMenu={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            style={{ WebkitTouchCallout: 'none', userSelect: 'none' }}
                        />
                        <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg z-10 font-oswald">
                            {post.device}
                        </div>
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                        <div className="flex items-center text-[10px] sm:text-xs font-bold text-gray-400 mb-4 space-x-3 uppercase tracking-[0.2em]">
                            <span>{post.date}</span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                            <span>{post.author}</span>
                        </div>
                        <h2 className={`font-bold text-gray-800 mb-3 leading-tight group-hover:text-orange-500 transition-colors font-oswald uppercase tracking-wide ${activeDevice === 'phone' ? 'text-xl' : 'text-2xl'}`}>
                            {post.title}
                        </h2>
                        <p className={`text-gray-500 mb-6 leading-relaxed flex-grow line-clamp-3 font-light ${activeDevice === 'phone' ? 'text-sm' : 'text-base'}`}>
                            {post.excerpt}
                        </p>
                        <div className="self-start text-orange-500 font-bold text-xs uppercase tracking-widest hover:text-orange-600 transition-colors flex items-center gap-2 font-oswald">
                            Read More
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium italic">No articles found for {activeDevice} yet.</p>
            </div>
        )}
      </div>

      <div className="mt-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 -mt-10 -mr-10 text-gray-700 opacity-20 transform rotate-12">
             <TigerClawsIcon className="w-64 h-64" />
         </div>
         
         <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 font-baloo">Stay in the loop</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto font-poppins font-light leading-relaxed">Get the latest wallpapers and design tips delivered straight to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-6 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 flex-grow font-poppins"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-lg font-oswald uppercase tracking-widest">
                    Subscribe
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BlogPage;
