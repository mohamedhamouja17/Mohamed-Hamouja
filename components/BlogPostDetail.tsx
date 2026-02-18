
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
        <h1 className="text-xl font-bold text-gray-800 mb-4 font-oswald uppercase tracking-wider">Post Not Found</h1>
        <button onClick={() => navigate('/blog')} className="text-orange-500 font-bold hover:underline">
          Back to Blog
        </button>
      </div>
    );
  }

  const { metadata, content } = post;

  // Modern Markdown renderer with refined typography and feature cards
  const renderContent = (text: string) => {
    return text.split('\n\n').map((block, idx) => {
      // H1 Header - Refined to text-2xl
      if (block.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight font-oswald uppercase tracking-wider">
            {block.replace('# ', '')}
          </h1>
        );
      }
      
      // H2 Header - Refined to text-xl
      if (block.startsWith('## ')) {
        return (
          <div key={idx} className="mt-12 mb-6 flex items-center gap-4">
             <h2 className="text-xl font-bold text-gray-800 font-oswald uppercase tracking-wide">
               {block.replace('## ', '')}
             </h2>
             <div className="flex-grow h-[1px] bg-gray-100 rounded-full"></div>
          </div>
        );
      }
      
      // H3 Header - Refined to text-lg
      if (block.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg font-bold text-orange-600 mt-8 mb-4 font-oswald uppercase tracking-normal">
            {block.replace('### ', '')}
          </h3>
        );
      }
      
      // Feature List Cards (Bullets) - Compact Professional Version
      if (block.startsWith('* ') || block.startsWith('- ')) {
        const items = block.split('\n').filter(i => i.trim().length > 0);
        return (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 my-8">
            {items.map((item, i) => (
              <div 
                key={i} 
                className="bg-gray-50/50 border border-gray-100 p-4 rounded-xl flex items-start gap-3 hover:bg-white hover:shadow-sm hover:border-orange-100 transition-all duration-300 group"
              >
                <div className="bg-orange-100 p-1.5 rounded-lg text-orange-500 flex-shrink-0 group-hover:scale-105 transition-transform">
                   <SparklesIcon className="h-4 w-4" />
                </div>
                <span className="text-gray-600 font-medium font-poppins text-xs sm:text-sm leading-relaxed">
                  {item.replace(/^[*|-]\s/, '')}
                </span>
              </div>
            ))}
          </div>
        );
      }
      
      // Formatted Paragraphs - text-base with breathable line height
      return (
        <p key={idx} className="text-gray-500 leading-relaxed mb-6 font-poppins font-light text-sm sm:text-base whitespace-pre-wrap max-w-3xl">
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
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors font-bold group uppercase tracking-widest text-[9px] font-oswald"
      >
        <div className="bg-white p-1.5 rounded-full border border-gray-100 shadow-sm group-hover:border-orange-200">
           <span className="block rotate-90 group-hover:-translate-x-0.5 transition-transform">
             <ChevronDownIcon className="h-3 w-3" />
           </span>
        </div>
        Back to listing
      </button>

      <article className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
        <div className="relative aspect-[21/9] overflow-hidden group border-b border-gray-50">
           <img 
             src={metadata.imageUrl} 
             alt={metadata.title} 
             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             onContextMenu={(e) => e.preventDefault()}
             onDragStart={(e) => e.preventDefault()}
             style={{ WebkitTouchCallout: 'none', userSelect: 'none' }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
           <div className="absolute top-6 left-6 bg-orange-500 text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] font-oswald shadow-lg">
             {metadata.device}
           </div>
        </div>

        <div className="p-8 sm:p-12 md:px-16 md:py-14">
          <div className="flex items-center gap-5 text-[9px] font-bold text-gray-400 mb-10 uppercase tracking-[0.4em] font-oswald border-b border-gray-50 pb-5">
            <span>{metadata.date}</span>
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
            <span>{metadata.author}</span>
          </div>
          
          <div className="max-w-none article-body">
            {renderContent(content)}
          </div>
        </div>
      </article>

      {/* Simplified Footer CTA */}
      <div className="mt-16 text-center p-12 sm:p-16 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
         <Link 
           to="/wallpaper/ronin-samurai-sunset-red-sun"
           className="inline-flex items-center justify-center px-14 py-4 bg-[#0F172A] text-white font-bold rounded-full hover:bg-black transition-all shadow-2xl shadow-gray-900/20 font-oswald uppercase tracking-[0.25em] text-[11px] hover:scale-[1.03] active:scale-95 group"
         >
           Open
         </Link>
      </div>
      
      <style>{`
        .article-body p:last-child {
          margin-bottom: 0;
        }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BlogPostDetail;
