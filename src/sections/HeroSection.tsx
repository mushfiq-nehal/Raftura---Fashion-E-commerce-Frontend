import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="hero-section w-full" style={{ paddingTop: '0px' }}>
      {/* Main Hero Area — no gap after banner */}
      <div className="relative w-full" style={{ backgroundColor: '#E0DFDD' }}>
        <div className="mx-auto w-full flex flex-col lg:flex-row" style={{ maxWidth: '1200px' }}>
          {/* Left: Fashion Image */}
          <div className="relative w-full lg:w-[55%] flex items-end justify-center lg:justify-end overflow-hidden lg:overflow-visible">
            <div
              className="relative w-full flex items-end justify-center lg:justify-end"
              style={{ height: 'clamp(240px, 45vw, 760px)' }}
            >
              <img
                src="/images/hero-model.png"
                alt="Fashion model in winter fur coat and stylish dress"
                className="w-auto h-full object-contain object-bottom transition-transform duration-500 lg:[transform:translateX(30px)] lg:[max-width:120%]"
              />
            </div>
            {/* Bottom Fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to top, #E0DFDD, transparent)' }}
            />
          </div>

          {/* Right: Offer Text */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center items-start px-6 sm:px-8 lg:px-12 py-8 lg:py-0 relative z-10">
            <h1
              className="font-heading leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#2D2D2D' }}
            >
              Flat 50% Off on{' '}
              <span
                className="block font-heading italic mt-1"
                style={{ color: '#C4956A', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
              >
                Customization
              </span>
            </h1>
            <p className="font-body text-sm mb-8" style={{ color: '#555', fontStyle: 'italic' }}>
              Valid till 31st Jan only
            </p>
            <Link
              to="/customize"
              className="group inline-flex items-center gap-3 px-8 py-3.5 border-2 transition-all duration-300 hover:bg-[#C4956A] hover:text-white hover:border-[#C4956A]"
              style={{
                borderColor: '#2D2D2D',
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
              }}
            >
              CUSTOMIZE NOW
              <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
 
      {/* Category Cards */}
      <div className="w-full relative z-10" style={{ backgroundColor: '#E0DFDD', marginTop: '-20px' }}>
        <div className="content-max-width px-5 lg:px-8 pt-0 pb-12 lg:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {/* FOR MEN */}
            <Link
              to="/shop?category=men"
              className="group relative overflow-hidden rounded-sm"
              style={{ aspectRatio: '22 / 10' }}
            >
              <img
                src="/images/hero-men.png"
                alt="Men's fashion"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 lg:p-6">
                <h3
                  className="text-white font-heading uppercase mb-2"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', letterSpacing: '0.02em' }}
                >
                  FOR MEN
                </h3>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 text-white transition-all duration-300 bg-white/15 backdrop-blur-sm group-hover:bg-[#C4956A] group-hover:text-white"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  SHOP NOW <ArrowRight size={12} strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* FOR WOMEN */}
            <Link
              to="/shop?category=women"
              className="group relative overflow-hidden rounded-sm"
              style={{ aspectRatio: '22 / 10' }}
            >
              <img
                src="/images/hero-women.png"
                alt="Women's fashion"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 lg:p-6">
                <h3
                  className="text-white font-heading uppercase mb-2"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', letterSpacing: '0.02em' }}
                >
                  FOR WOMEN
                </h3>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 text-white transition-all duration-300 bg-white/15 backdrop-blur-sm group-hover:bg-[#C4956A] group-hover:text-white"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  SHOP NOW <ArrowRight size={12} strokeWidth={2} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
