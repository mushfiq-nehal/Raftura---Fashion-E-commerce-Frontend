import { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.animate-item');
    gsap.set(items, { scale: 0.9, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
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
    <section ref={sectionRef} className="testimonials-section bg-white section-padding">
      <div className="content-max-width">
        <div className="text-center mb-14">
          <p className="font-label text-[#8B9D83] mb-4">REVIEWS</p>
          <h2 className="font-heading text-4xl md:text-5xl uppercase">WHAT OUR CUSTOMERS SAY</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="animate-item bg-white p-8 rounded"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-[#8B9D83] fill-[#8B9D83]" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-heading italic text-lg leading-relaxed mb-8 text-black/80">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-label">{t.name.toUpperCase()}</p>
                  <p className="font-body text-xs text-[#A09890]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
