import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BestSellers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bestProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.animate-item');
    gsap.set(items, { x: 100, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
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
    <section ref={sectionRef} className="best-sellers-section bg-white section-padding">
      <div className="content-max-width">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-2xl md:text-3xl">Best Sellers</h2>
          <Link
            to="/shop?bestseller=true"
            className="text-[0.7rem] font-medium tracking-widest uppercase text-[#1A1A1A] hover:text-[#8B9D83] transition-colors flex items-center gap-1"
          >
            View More →
          </Link>
        </div>
        <hr className="border-[#1A1A1A]/20 mb-10" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {bestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
