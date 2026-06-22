import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { products } from '@/data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NewArrivals() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.animate-item');
    gsap.set(items, { y: 30, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="new-arrivals-section" style={{ backgroundColor: '#D8CAB8' }}>
      <div className="section-padding content-max-width">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="font-label text-[#8B9D83] mb-4">JUST DROPPED</p>
            <h2 className="font-heading text-4xl md:text-5xl uppercase">NEW ARRIVALS</h2>
          </div>
          <Link to="/shop?new=true" className="font-nav text-[#8B9D83] hover:underline hidden sm:block">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop?new=true" className="font-nav text-[#8B9D83] hover:underline">
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="animate-item group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded bg-gray-100 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-400 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-[#8B9D83] text-white font-label text-[0.6rem] rounded-full">
            {product.badge}
          </span>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={14} strokeWidth={1.5} />
        </button>
      </div>
      <p className="font-label text-[#A09890] mb-1">{product.brand}</p>
      <p className="font-body text-sm font-medium truncate mb-1">{product.name}</p>
      <div className="flex items-center gap-2">
        <span className="font-price">Rs. {product.price.toLocaleString()}</span>
        {product.originalPrice > product.price && (
          <span className="font-price text-[#A09890] line-through text-xs">
            Rs. {product.originalPrice.toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  );
}
