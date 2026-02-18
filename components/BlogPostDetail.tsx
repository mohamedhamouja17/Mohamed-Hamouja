
import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronDownIcon } from './icons/ChevronDownIcon.tsx';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import SEO from './SEO.tsx';

// Use Vite's glob import to read all .md files in the content/blog directory
const modules = (import.meta as any).glob('/content/blog/*.md', { eager: true, as: 'raw' });

const parseMarkdown = (raw: string) => {
  const frontmatterMatch = raw.match(/^---([\s\S]*?)---/);
  const metadata: any = {};
  let content = raw;

  if (frontmatterMatch) {
    frontmatterMatch[1].split('\n').forEach(line => {
      const [key, ...value] = line.split(':');
      if (key && value.length) {
        metadata[key.trim()] = value.join(':').trim();
      }
    });
    content = raw.replace(/^---[\s\S]*?---/, '').trim();
  }

  return { metadata, content };
};

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = useMemo(() => {
    const path = `/content/blog/${slug}.md`;
    const raw = modules[path] as string;
    if (!raw) return null;
    return parseMarkdown(raw);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 font-poppins">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 font-oswald uppercase tracking-wider">Post Not Found</h1>
        <button onClick={() => navigate('/blog')} className="text-orange-500 font-bold hover:underline">
          Back to Blog
        </button>
      </div>
    );
  }

  const { metadata, content } = post;

  // Modern Markdown renderer with feature-card support for lists
  const renderContent = (text: string) => {
    return text.split('\n\n').map((block, idx) => {
      // H1 Header
      if (block.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-12 leading-tight font-oswald uppercase tracking-tight">
            {block.replace('# ', '')}
          </h1>
        );
      }
      
      // H2 Header
      if (block.startsWith('## ')) {
        return (
          <div key={idx} className="mt-16 mb-8 flex items-center gap-4">
             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-oswald uppercase tracking-wide">
               {block.replace('## ', '')}
             </h2>
             <div className="flex-grow h-1 bg-gradient-to-r from-orange-100 to-transparent rounded-full"></div>
          </div>
        );
      }
      
      // H3 Header
      if (block.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-orange-600 mt-12 mb-6 font-oswald uppercase tracking-normal">
            {block.replace('### ', '')}
          </h3>
        );
      }
      
      // Feature List Cards (Bullets)
      if (block.startsWith('* ') || block.startsWith('- ')) {
        const items = block.split('\n').filter(i => i.trim().length > 0);
        return (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
            {items.map((item, i) => (
              <div 
                key={i} 
                className="bg-gray-50 border border-gray-100 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 group"
              >
                <div className="bg-orange-100 p-2.5 rounded-xl text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                   <SparklesIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                   <span className="text-gray-700 font-semibold font-poppins text-sm leading-relaxed">
                     {item.replace(/^[*|-]\s/, '')}
                   </span>
                </div>
              </div>
            ))}
          </div>
        );
      }
      
      // Formatted Paragraphs
      return (
        <p key={idx} className="text-gray-600 leading-[1.8] mb-10 font-poppins font-light text-lg whitespace-pre-wrap">
          {block.replace(/\*\*/g, '').replace(/\*/g, '')}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in font-poppins">
      <SEO title={`${metadata.title} - Walzoo Blog`} description={metadata.excerpt} />
      
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors font-bold group uppercase tracking-widest text-[10px] font-oswald"
      >
        <div className="bg-white p-2 rounded-full border border-gray-100 shadow-sm group-hover:border-orange-200">
           <span className="block rotate-90 group-hover:-translate-x-1 transition-transform">
             <ChevronDownIcon className="h-4 w-4" />
           </span>
        </div>
        Back to list
      </button>

      <article className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="relative aspect-[16/9] overflow-hidden group">
           <img 
             src={metadata.imageUrl} 
             alt={metadata.title} 
             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             onContextMenu={(e) => e.preventDefault()}
             onDragStart={(e) => e.preventDefault()}
             style={{ WebkitTouchCallout: 'none', userSelect: 'none' }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
           <div className="absolute top-8 left-8 bg-orange-500 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.3em] font-oswald shadow-xl">
             {metadata.device}
           </div>
        </div>

        <div className="p-8 sm:p-14 md:p-20">
          <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 mb-12 uppercase tracking-[0.4em] font-oswald border-b border-gray-50 pb-6">
            <span>{metadata.date}</span>
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span>{metadata.author}</span>
          </div>
          
          <div className="max-w-none article-body">
            {renderContent(content)}
          </div>
        </div>
      </article>

      {/* Modern Footer CTA */}
      <div className="mt-20 text-center p-12 bg-gradient-to-br from-white to-orange-50 rounded-[3rem] border border-orange-100 shadow-xl relative overflow-hidden">
         <div className="absolute -top-10 -right-10 text-orange-100 opacity-50 rotate-12">
            <SparklesIcon className="w-48 h-48" />
         </div>
         
         <div className="relative z-10">
            <h4 className="text-3xl font-bold text-gray-800 mb-6 font-oswald uppercase tracking-wider">Love this aesthetic?</h4>
            <p className="text-gray-500 mb-10 max-w-md mx-auto font-poppins font-light text-lg">Download this wallpaper and thousands more in crisp 4K, absolutely free.</p>
            <Link 
              to={`/category/${metadata.category.toLowerCase()}`}
              className="inline-flex items-center gap-3 px-12 py-5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-2xl shadow-gray-900/40 font-oswald uppercase tracking-[0.2em] text-sm hover:scale-105 active:scale-95"
            >
              Discover {metadata.category}
              <span>→</span>
            </Link>
         </div>
      </div>
      
      <style>{`
        .article-body p:last-child {
          margin-bottom: 0;
        }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BlogPostDetail;
