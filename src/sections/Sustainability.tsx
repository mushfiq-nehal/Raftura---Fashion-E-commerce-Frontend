import { useRef, useEffect, useState } from 'react';
import { Leaf, Recycle, Users } from 'lucide-react';
import { stats } from '@/data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Sustainability() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const heading = sectionRef.current.querySelector('.sustain-heading');

    const ctx = gsap.context(() => {
      if (heading) {
        gsap.set(heading, { perspective: 400 });
        gsap.from(heading, {
          rotationX: -30,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;
          stats.forEach((stat, index) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                setCounters((prev) => {
                  const next = [...prev];
                  next[index] = Math.round(obj.val);
                  return next;
                });
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const icons = [Leaf, Recycle, Users];

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F5F0EB' }} className="section-padding">
      <div className="content-max-width text-center">
        <p className="font-label text-[#8B9D83] mb-4">OUR COMMITMENT</p>
        <h2 className="sustain-heading font-heading text-3xl md:text-4xl lg:text-5xl uppercase mb-6">
          SUSTAINABLE FASHION
        </h2>
        <p className="font-body text-[#A09890] max-w-2xl mx-auto mb-16 leading-relaxed">
          We are committed to reducing our environmental impact through responsible sourcing,
          ethical production practices, and sustainable materials. Every garment we create is
          a step toward a more conscious fashion industry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = icons[index];
            return (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#8B9D83]/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-[#8B9D83]" strokeWidth={1.5} />
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-heading text-4xl md:text-5xl">
                    {counters[index]}{stat.suffix}
                  </span>
                </div>
                <h3 className="font-body text-sm font-medium mb-1">{stat.label}</h3>
                <p className="font-body text-xs text-[#A09890]">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
