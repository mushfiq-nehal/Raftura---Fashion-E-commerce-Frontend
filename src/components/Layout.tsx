import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {bannerVisible && (
        <div
          className="relative flex items-center justify-center py-2 px-4 z-[60]"
          style={{ backgroundColor: '#C4956A', height: '36px' }}
        >
          <p className="text-white text-xs md:text-sm font-body tracking-wide text-center">
            Flat 50% on first order, <span className="font-semibold underline underline-offset-2 cursor-pointer">Offer closes soon!</span>
          </p>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            aria-label="Close banner"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      )}
      <Navbar bannerVisible={bannerVisible} />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
