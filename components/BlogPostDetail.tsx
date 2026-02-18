import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Fix: Added Link to imports
import { ChevronDownIcon } from './icons/ChevronDownIcon.tsx';
import SEO from './SEO.tsx';

// Use Vite's glob import to read all .md files in the content/blog directory
// Fix: Cast import.meta to any to support Vite's glob feature in TypeScript
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
        <button onClick={() => navigate('/blog')} className="text-orange-500 font-bold hover:underline">
          Back to Blog
        </button>
      </div>
    );
  }

  const { metadata, content } = post;

  // Simple Markdown renderer (handles headers, lists, and paragraphs)
  const renderContent = (text: string) => {
    return text.split('\n\n').map((block, idx) => {
      if (block.startsWith('# ')) {
        return <h1 key={idx} className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">{block.replace('# ', '')}</h1>;
      }
      if (block.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl font-bold text-gray-800 mt-10 mb-4">{block.replace('## ', '')}</h2>;
      }
      if (block.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-bold text-gray-800 mt-8 mb-4">{block.replace('### ', '')}</h3>;
      }
      if (block.startsWith('* ') || block.startsWith('- ')) {
        return (
          <ul key={idx} className="space-y-3 mb-6 list-none">
            {block.split('\n').map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600">
                <span className="text-orange-500 mt-1">•</span>
                <span>{item.replace(/^[*|-]\s/, '')}</span>
              </li>
            ))}
          </ul>
        );
      }
      if (block.includes('**')) {
        // Handle bold CTA or links roughly
        return <p key={idx} className="text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap">{block.replace(/\*\*/g, '')}</p>;
      }
      return <p key={idx} className="text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap">{block}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SEO title={`${metadata.title} - Walzoo Blog`} description={metadata.excerpt} />
      
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors font-bold group"
      >
        <span className="rotate-90 group-hover:-translate-x-1 transition-transform">
          <ChevronDownIcon className="h-5 w-5" />
        </span>
        Back
      </button>

      <article className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="relative aspect-[16/9] overflow-hidden">
           <img 
             src={metadata.imageUrl} 
             alt={metadata.title} 
             className="w-full h-full object-cover"
             onContextMenu={(e) => e.preventDefault()}
             onDragStart={(e) => e.preventDefault()}
             style={{ WebkitTouchCallout: 'none', userSelect: 'none' }}
           />
           <div className="absolute top-6 left-6 bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
             {metadata.device}
           </div>
        </div>

        <div className="p-8 sm:p-12 lg:p-16">
          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">
            <span>{metadata.date}</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
            <span>{metadata.author}</span>
          </div>
          
          <div className="prose prose-orange max-w-none">
            {renderContent(content)}
          </div>
        </div>
      </article>

      {/* Quick CTA */}
      <div className="mt-12 text-center p-8 bg-orange-50 rounded-3xl border border-orange-100">
         <h4 className="text-lg font-bold text-gray-800 mb-4">Loved this wallpaper?</h4>
         <Link 
           to={`/category/${metadata.category.toLowerCase()}`}
           className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white font-black rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
         >
           Browse more in {metadata.category}
         </Link>
      </div>
    </div>
  );
};

export default BlogPostDetail;