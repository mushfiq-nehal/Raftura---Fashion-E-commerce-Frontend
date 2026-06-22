import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const img = sectionRef.current.querySelector('.story-image');
    const texts = sectionRef.current.querySelectorAll('.story-text');

    if (!img) return;
    gsap.set(img, { x: -30, opacity: 0 });
    gsap.set(texts, { x: 30, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(img, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      gsap.to(texts, {
        x: 0,
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
    <section ref={sectionRef} className="brand-story-section" style={{ backgroundColor: '#D8CAB8' }}>
      <div className="section-padding content-max-width">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left - Image */}
          <div className="story-image lg:w-[45%]">
            <div className="aspect-[3/4] overflow-hidden rounded">
              <img
                src="/images/editorial-story.jpg"
                alt="RAFTURA brand story"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Text */}
          <div className="lg:w-[55%] lg:pl-8">
            <p className="story-text font-label text-[#8B9D83] mb-4">OUR STORY</p>
            <h2 className="story-text font-heading text-3xl md:text-4xl lg:text-5xl uppercase mb-8">
              WHERE STYLE MEETS PERSONALITY
            </h2>
            <p className="story-text font-body text-[#A09890] mb-6 leading-relaxed">
              At RAFTURA, we believe fashion should be as unique as the person wearing it. Founded in 2020,
              our mission is to bridge the gap between high-quality craftsmanship and individual expression.
              We started with a simple idea: what if everyone could have clothing that tells their story?
            </p>
            <p className="story-text font-body text-[#A09890] mb-8 leading-relaxed">
              Every piece in our collection is designed with customization in mind. From the initial sketch
              to the final stitch, we create garments that serve as a canvas for your creativity. Our team
              of skilled artisans combines traditional techniques with modern innovation to deliver pieces
              that are both timeless and uniquely yours.
            </p>
            <Link
              to="/about"
              className="story-text inline-flex items-center gap-2 text-[#8B9D83] font-nav hover:underline group"
            >
              ABOUT US
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
