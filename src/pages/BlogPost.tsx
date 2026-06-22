import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { blogPosts } from '@/data/products';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((b) => b.id === id);

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h2 className="font-heading text-2xl mb-4">Post not found</h2>
        <Link to="/blog" className="btn-primary">BACK TO BLOG</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header Image */}
      <div className="relative aspect-[21/9] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="content-max-width px-5 lg:px-8 pb-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 font-nav text-xs mb-4 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> BACK TO BLOG
            </Link>
            <p className="font-label text-white/70 mb-3">{post.category}</p>
            <h1 className="font-heading text-white text-3xl md:text-5xl uppercase max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-padding content-max-width max-w-3xl">
        <div className="flex items-center gap-6 mb-10 text-[#A09890]">
          <span className="flex items-center gap-2 font-body text-sm">
            <Calendar size={14} /> {post.date}
          </span>
          <span className="flex items-center gap-2 font-body text-sm">
            <Clock size={14} /> {post.readTime}
          </span>
        </div>

        <div className="prose-custom">
          <p className="font-body text-lg leading-relaxed mb-8 text-[#A09890]">{post.excerpt}</p>

          <p className="font-body leading-relaxed mb-6">
            At RAFTURA, we believe that fashion is more than just clothing — it&apos;s a form of self-expression,
            a way to tell your story without words. Our journey began with a simple question: what if every
            piece in your wardrobe could be as unique as you are?
          </p>

          <h2 className="font-heading text-2xl uppercase mt-12 mb-6">The Power of Personalization</h2>
          <p className="font-body leading-relaxed mb-6">
            In a world dominated by fast fashion and mass production, personalization offers something
            refreshingly different. When you customize a garment, you&apos;re not just buying clothing —
            you&apos;re creating a piece of wearable art that reflects your personality, values, and style.
          </p>
          <p className="font-body leading-relaxed mb-6">
            Our customization services range from subtle monogramming to elaborate embroidery designs.
            Whether you want to add a personal touch to a classic blazer or completely transform a piece
            with bespoke tailoring, our team of skilled artisans is here to bring your vision to life.
          </p>

          <h2 className="font-heading text-2xl uppercase mt-12 mb-6">Sustainability Through Customization</h2>
          <p className="font-body leading-relaxed mb-6">
            One of the most beautiful aspects of customized fashion is its inherent sustainability. When
            you invest in a piece that&apos;s been tailored specifically for you, you&apos;re more likely to cherish
            and care for it. This emotional connection leads to longer garment lifespans and less waste.
          </p>
          <p className="font-body leading-relaxed mb-6">
            We use only the finest organic and sustainable materials, sourced responsibly from trusted
            partners. Our production process minimizes waste, and our made-to-order approach means we
            never overproduce. Every stitch is a step toward a more conscious fashion industry.
          </p>

          <h2 className="font-heading text-2xl uppercase mt-12 mb-6">Getting Started</h2>
          <p className="font-body leading-relaxed mb-6">
            Ready to create something uniquely yours? Browse our collection of customizable pieces and
            start designing today. Our intuitive customization tool lets you preview your creations in
            real-time, and our team is always available to help bring your most ambitious ideas to life.
          </p>
        </div>

        {/* Back to Blog */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#8B9D83] font-nav hover:underline">
            <ArrowLeft size={14} /> BACK TO ALL POSTS
          </Link>
        </div>
      </div>
    </div>
  );
}
