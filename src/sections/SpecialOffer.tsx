import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SpecialOffer() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const img = sectionRef.current.querySelector('.offer-image');
    const text = sectionRef.current.querySelector('.offer-text');

    if (!img || !text) return;
    gsap.set(img, { x: -50, opacity: 0 });
    gsap.set(text, { x: 50, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(img, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
      gsap.to(text, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="special-offer-section w-full">
      <div className="flex flex-col lg:flex-row">
        {/* Left - Image */}
        <div className="offer-image lg:w-1/2 aspect-square lg:aspect-auto">
          <img
            src="/images/offer-img.jpg"
            alt="Customization offer"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Right - Content */}
        <div
          className="offer-text lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24"
          style={{ backgroundColor: '#8B9D83' }}
        >
          <p className="font-label text-white/70 mb-4">LIMITED TIME</p>
          <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl uppercase mb-6">
            FLAT 50% OFF ON CUSTOMIZATION
          </h2>
          <p className="font-body text-white/85 mb-8 max-w-md">
            Transform your wardrobe with our expert customization services. From bespoke tailoring
            to personalized embroidery, make every piece uniquely yours.
          </p>
          <Link
            to="/customize"
            className="inline-flex items-center gap-2 text-white font-nav hover:underline group"
          >
            CUSTOMIZE NOW
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
