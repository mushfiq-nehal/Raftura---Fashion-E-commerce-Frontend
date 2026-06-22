import { useRef, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  '/images/product-1.jpg',
  '/images/cat-women.jpg',
  '/images/product-4.jpg',
  '/images/editorial-story.jpg',
  '/images/cat-men.jpg',
  '/images/product-2.jpg',
];

export default function InstagramGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.animate-item');
    gsap.set(items, { y: 30, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 px-5 lg:px-8">
      <div className="content-max-width">
        <div className="text-center mb-10">
          <p className="font-label text-[#8B9D83] mb-2">@RAFTURA.FASHION</p>
          <h3 className="font-heading text-2xl uppercase">FOLLOW US ON INSTAGRAM</h3>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {images.map((img, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-item group relative aspect-square overflow-hidden"
            >
              <img
                src={img}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
