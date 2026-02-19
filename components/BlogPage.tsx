
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
      case 'phone': return 'aspect-[9/16] max-w-[280px] mx-auto';
      case 'tablet': return 'aspect-[16/9]';
      case 'desktop': 
      default: return 'aspect-[16/9]';
    }
  };

  return (
    <div className="mt-10 animate-fade-in max-w-7xl mx-auto px-4 font-poppins pb-20">
      {/* Header Styled consistently with About Walzoo */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full mb-6 border border-gray-100 shadow-sm">
            <TigerClawsIcon className="h-10 w-10 text-orange-500" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 font-baloo tracking-tight">
          Walzoo Blog
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          The hub for digital curation. Insights for <span className="text-orange-500 font-bold capitalize font-baloo">{activeDevice}</span> screens.
        </p>

        {/* Category Navigation */}
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
                        px-7 py-2 rounded-xl text-[10px] font-black transition-all duration-300 border uppercase tracking-[0.2em] font-oswald
                        ${isActive 
                            ? 'bg-orange-500 text-white border-orange-500 shadow-lg' 
                            : 'bg-white text-gray-400 border-gray-100 hover:border-orange-200 hover:text-orange-500 shadow-sm'}
                    `}
                >
                    {btn.label}
                </NavLink>
            ))}
        </div>
      </div>

      <div>
        {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredPosts.map((post) => (
                <Link 
                  to={`/blog/post/${post.slug}`} 
                  key={post.slug} 
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full"
                >
                    {/* Device-Specific Aspect Ratio */}
                    <div className={`overflow-hidden relative bg-gray-50 ${getPostAspectRatio(post.device)}`}>
                        <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            loading="lazy"
                            onContextMenu={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                        />
                        <div className="absolute top-4 left-4 bg-orange-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] font-oswald shadow-md">
                            {post.device}
                        </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center text-[9px] font-bold text-gray-400 mb-4 space-x-3 uppercase tracking-[0.3em] font-oswald">
                            <span>{post.date}</span>
                        </div>
                        
                        {/* Title size restricted to text-lg */}
                        <h2 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-orange-500 transition-colors font-poppins">
                            {post.title}
                        </h2>
                        
                        <p className="text-gray-400 mb-8 leading-relaxed flex-grow line-clamp-3 font-light text-xs">
                            {post.excerpt}
                        </p>

                        <div className="pt-6 border-t border-gray-50">
                            <span className="text-orange-500 font-bold text-[9px] uppercase tracking-[0.3em] font-oswald inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                VIEW POST <span>→</span>
                            </span>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                <p className="text-gray-400 text-sm font-poppins">No content available for {activeDevice}.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
