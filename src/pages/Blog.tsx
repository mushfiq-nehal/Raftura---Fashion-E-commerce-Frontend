import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/data/products';

export default function Blog() {
  return (
    <div>
      {/* Header */}
      <div style={{ backgroundColor: '#D8CAB8' }} className="pt-32 pb-16 px-5 lg:px-8 text-center">
        <p className="font-label text-[#8B9D83] mb-4">JOURNAL</p>
        <h1 className="font-display uppercase text-5xl md:text-6xl lg:text-7xl mb-4">THE BLOG</h1>
        <p className="font-body text-[#A09890] max-w-md mx-auto">
          Stories, style guides, and behind-the-scenes insights from the world of RAFTURA.
        </p>
      </div>

      {/* Featured Post */}
      <div className="section-padding content-max-width">
        <Link to={`/blog/${blogPosts[0].id}`} className="group block mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[60%] aspect-[16/9] overflow-hidden rounded">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
              />
            </div>
            <div className="lg:w-[40%] flex flex-col justify-center">
              <p className="font-label text-[#8B9D83] mb-3">{blogPosts[0].category}</p>
              <h2 className="font-heading text-3xl md:text-4xl uppercase mb-4 group-hover:text-[#8B9D83] transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="font-body text-[#A09890] mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-[#A09890]">
                <span className="font-body text-xs">{blogPosts[0].date}</span>
                <span className="flex items-center gap-1 font-body text-xs">
                  <Clock size={12} /> {blogPosts[0].readTime}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 text-[#8B9D83] font-nav mt-6 group-hover:underline">
                READ MORE <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group">
              <div className="aspect-[16/10] overflow-hidden rounded mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
              </div>
              <p className="font-label text-[#8B9D83] mb-2">{post.category}</p>
              <h3 className="font-heading text-xl uppercase mb-3 group-hover:text-[#8B9D83] transition-colors">
                {post.title}
              </h3>
              <p className="font-body text-sm text-[#A09890] mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-[#A09890]">
                <span className="font-body text-xs">{post.date}</span>
                <span className="flex items-center gap-1 font-body text-xs">
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
