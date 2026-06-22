import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
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
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-2xl md:text-3xl">New Arrivals</h2>
          <Link
            to="/shop?new=true"
            className="text-[0.7rem] font-medium tracking-widest uppercase text-[#1A1A1A] hover:text-[#8B9D83] transition-colors flex items-center gap-1"
          >
            View More →
          </Link>
        </div>
        <hr className="border-[#1A1A1A]/20 mb-10" />

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
