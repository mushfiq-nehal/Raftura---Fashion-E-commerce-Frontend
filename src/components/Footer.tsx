import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#F5F0EB' }}>
      <div className="content-max-width px-5 lg:px-8 pt-20 pb-10">
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="font-label tracking-[0.12em] text-sm inline-block mb-4">
              RAFTURA
            </Link>
            <p className="font-body text-sm text-[#A09890] leading-relaxed">
              Customize your style. Express, evolve, reimagine — where fashion meets personality.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#A09890] hover:text-[#8B9D83] transition-colors">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#A09890] hover:text-[#8B9D83] transition-colors">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-[#A09890] hover:text-[#8B9D83] transition-colors text-sm font-medium">
                P
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-label mb-5">SHOP</h4>
            <ul className="space-y-3">
              {['Men', 'Women', 'Accessories', 'New Arrivals', 'Sale'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/shop${item === 'Sale' ? '?sale=true' : item === 'New Arrivals' ? '?new=true' : `?category=${item.toLowerCase()}`}`}
                    className="font-body text-sm text-[#A09890] hover:text-[#8B9D83] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-label mb-5">HELP</h4>
            <ul className="space-y-3">
              {[
                { label: 'Contact Us', to: '/contact' },
                { label: 'FAQs', to: '/faqs' },
                { label: 'Shipping & Returns', to: '/shipping' },
                { label: 'Size Guide', to: '/size-guide' },
                { label: 'Track Order', to: '/track' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="font-body text-sm text-[#A09890] hover:text-[#8B9D83] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-label mb-5">CONNECT</h4>
            <p className="font-body text-sm text-[#A09890] mb-4">
              Subscribe to receive exclusive offers, early access to new collections, and styling inspiration.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83] transition-colors"
              />
              <button type="submit" className="px-4 py-2 bg-[#8B9D83] text-white font-label text-xs hover:bg-[#7A8D73] transition-colors">
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-[#A09890]">
              &copy; 2026 RAFTURA. All rights reserved.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
              <img src="/images/Logo/bkash-logo-png_seeklogo-471379.png" alt="bKash" className="h-6 w-auto object-contain" />
              <img src="/images/Logo/Nagad-Logo.wine.svg" alt="Nagad" className="h-6 w-auto object-contain" />
              <img src="/images/Logo/Visa_Inc.-Logo.wine.svg" alt="Visa" className="h-6 w-auto object-contain" />
              <img src="/images/Logo/Mastercard-Logo.wine.png" alt="Mastercard" className="h-6 w-auto object-contain" />
              <img src="/images/Logo/5515f6a04a78f503b468579be923b6.webp" alt="American Express" className="h-6 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
