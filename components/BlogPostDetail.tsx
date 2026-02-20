
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const isPhone = metadata.device?.toLowerCase() === 'phone';

  // Professional renderer with typography controls
  const renderContent = (text: string) => {
    return text.split('\n\n').map((block, idx) => {
      // H1 Header - Restricted to text-2xl
      if (block.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-2xl font-bold text-gray-900 mb-6 leading-tight font-oswald uppercase tracking-wider">
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
      
      // Feature List Cards
      if (block.startsWith('* ') || block.startsWith('- ')) {
        const items = block.split('\n').filter(i => i.trim().length > 0);
        return (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {items.map((item, i) => (
              <div 
                key={i} 
                className="bg-gray-50/50 border border-gray-100 p-5 rounded-2xl flex items-start gap-3"
              >
                <div className="bg-orange-100 p-1.5 rounded-lg text-orange-500 flex-shrink-0">
                   <SparklesIcon className="h-4 w-4" />
                </div>
                <span className="text-gray-600 font-medium font-poppins text-xs leading-relaxed">
                  {item.replace(/^[*|-]\s/, '')}
                </span>
              </div>
            ))}
          </div>
        );
      }
      
      // Body text - Set to text-base
      return (
        <p key={idx} className="text-gray-500 leading-relaxed mb-6 font-poppins font-light text-base whitespace-pre-wrap max-w-3xl">
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
        {/* Device-Specific Aspect Ratio Container */}
        <div className={`relative overflow-hidden group border-b border-gray-50 ${isPhone ? 'aspect-[9/16] max-w-sm mx-auto mt-8' : 'aspect-[16/9]'}`}>
           <img 
             src={metadata.imageUrl} 
             alt={metadata.title} 
             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             onContextMenu={(e) => e.preventDefault()}
             onDragStart={(e) => e.preventDefault()}
           />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-8 leading-tight font-oswald uppercase tracking-wider">
              {metadata.title}
            </h1>
            {renderContent(content)}
          </div>
        </div>
      </article>

      {/* Large Rounded Orange 'OPEN' Button linking to Wallpaper page */}
      <div className="mt-16 text-center">
         <a 
           href={`https://www.walzoo.com/wallpaper/${slug}`}
           className="inline-flex items-center justify-center px-24 py-5 bg-orange-500 text-white font-black rounded-full shadow-2xl shadow-orange-500/40 hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all duration-300 font-oswald uppercase tracking-[0.3em] text-[14px]"
         >
           OPEN
         </a>
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
