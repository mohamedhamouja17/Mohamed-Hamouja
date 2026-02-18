
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

  return (
    <div className="mt-10 animate-fade-in max-w-7xl mx-auto px-4 font-poppins pb-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-orange-50 rounded-full mb-6">
            <TigerClawsIcon className="h-10 w-10 text-orange-500" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-baloo">
          Walzoo Blog
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          The intersection of art and utility. Curated insights for your <span className="text-orange-500 font-bold capitalize font-baloo">{activeDevice}</span> environment.
        </p>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
            {[
                { label: 'Desktop', path: '/blog/desktop' },
                { label: 'Phone', path: '/blog/phone' },
                { label: 'Tablet', path: '/blog/tablet' }
            ].map((btn) => (
                <NavLink
                    key={btn.path}
                    to={btn.path}
                    className={({ isActive }) => `
                        px-8 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border uppercase tracking-[0.2em]
                        ${isActive 
                            ? 'bg-gray-900 text-white border-gray-900 shadow-xl scale-105' 
                            : 'bg-white text-gray-400 border-gray-100 hover:border-orange-300 hover:text-orange-500 shadow-sm'}
                    `}
                >
                    {btn.label}
                </NavLink>
            ))}
        </div>
      </div>

      <div>
        {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {filteredPosts.map((post) => (
                <Link 
                  to={`/blog/post/${post.slug}`} 
                  key={post.slug} 
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                >
                    {/* Image Container */}
                    <div className={`overflow-hidden relative ${getPostAspectRatio(post.device)}`}>
                        <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            loading="lazy"
                            onContextMenu={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            style={{ WebkitTouchCallout: 'none', userSelect: 'none' }}
                        />
                        <div className="absolute top-4 left-4 bg-orange-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg z-10 font-oswald">
                            {post.device}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-7 sm:p-9 flex flex-col flex-grow">
                        <div className="flex items-center text-[9px] font-bold text-gray-400 mb-4 space-x-3 uppercase tracking-[0.3em] font-oswald">
                            <span>{post.date}</span>
                            <span className="w-1 h-1 bg-orange-200 rounded-full"></span>
                            <span>{post.author}</span>
                        </div>
                        
                        <h2 className="font-semibold text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors font-poppins text-lg lg:text-xl">
                            {post.title}
                        </h2>
                        
                        <p className="text-gray-500 mb-8 leading-[1.8] flex-grow line-clamp-2 font-light text-sm">
                            {post.excerpt}
                        </p>

                        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                            <span className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.2em] font-oswald group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                                Read Post <span>→</span>
                            </span>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-medium font-poppins">No inspiration found for {activeDevice} yet.</p>
            </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="mt-24 bg-gray-900 rounded-[3rem] p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 -mt-10 -mr-10 text-white/5 transform rotate-12">
             <TigerClawsIcon className="w-80 h-80" />
         </div>
         
         <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 font-baloo">Beyond the Screen</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto font-poppins font-light text-base leading-loose">
              Join the Walzoo inner circle. Get high-resolution exclusives and design trends delivered monthly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                    type="email" 
                    placeholder="E-mail address" 
                    className="px-6 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 flex-grow font-poppins text-sm backdrop-blur-md"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-xl font-oswald uppercase tracking-widest text-xs hover:scale-105 active:scale-95">
                  Join Now
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BlogPage;
