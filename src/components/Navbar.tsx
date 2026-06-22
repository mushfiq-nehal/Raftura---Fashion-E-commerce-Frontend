import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar({ bannerVisible = true }: { bannerVisible?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/shop', label: 'Shop' },
    { to: '/shop?sale=true', label: 'Deals' },
    { to: '/about', label: 'About us' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/account', label: 'Account' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-300"
        style={{
          top: bannerVisible && !scrolled ? '36px' : '0px',
          backgroundColor: isHomePage && !scrolled ? '#E0DFDD' : scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: isHomePage && !scrolled ? 'none' : 'blur(12px)',
          boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : isHomePage && !scrolled ? 'none' : '0 1px 0 rgba(0,0,0,0.04)',
          height: '64px',
        }}
      >
        <div className="content-max-width h-full grid items-center px-5 lg:px-8" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link
              to="/"
              className="hover:opacity-70 transition-opacity"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 600,
                fontSize: '1.35rem',
                letterSpacing: '0.04em',
                color: '#2D2D2D',
              }}
            >
              RAFTURA
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative group py-2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.85rem',
                  color: '#4A4A4A',
                  letterSpacing: '0.01em',
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C4956A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>

          {/* Search + Icons */}
          <div className="flex items-center justify-self-end gap-4">
            {/* Desktop Search Bar */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center gap-2 border border-gray-300 rounded-sm px-3 py-1.5 bg-gray-50/80 hover:border-gray-400 transition-colors"
              style={{ minWidth: '200px' }}
            >
              <Search size={15} className="text-gray-400" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search item here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none flex-1 font-body text-sm text-gray-600 placeholder:text-gray-400"
                style={{ fontSize: '0.8rem' }}
              />
            </form>

            {/* Mobile Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-1 hover:text-[#C4956A] transition-colors"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <Link to="/wishlist" className="p-1 hover:text-[#C4956A] transition-colors hidden sm:block" aria-label="Wishlist">
              <Heart size={18} strokeWidth={1.5} />
            </Link>
            <Link to="/account" className="p-1 hover:text-[#C4956A] transition-colors hidden sm:block" aria-label="Account">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <button
              onClick={toggleCart}
              className="p-1 hover:text-[#C4956A] transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C4956A] text-white flex items-center justify-center"
                  style={{ fontSize: '0.625rem', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-heading text-3xl tracking-tight"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-4">
              <Link to="/wishlist" className="font-body text-sm flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                <Heart size={18} strokeWidth={1.5} /> Wishlist
              </Link>
              <Link to="/account" className="font-body text-sm flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                <User size={18} strokeWidth={1.5} /> Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-32" onClick={() => setSearchOpen(false)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSearch}
            className="bg-white w-full max-w-2xl mx-4 p-6 shadow-2xl"
          >
            <div className="flex items-center gap-4 border-b border-[#A09890]">
              <Search size={20} className="text-[#A09890]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-3 bg-transparent outline-none font-body text-base"
                autoFocus
              />
              <button type="button" onClick={() => setSearchOpen(false)}>
                <X size={20} className="text-[#A09890] hover:text-black" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartDrawer />
    </>
  );
}

function CartDrawer() {
  const { items, isOpen, closeCart, totalPrice, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/30" onClick={closeCart} />
      <div className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-heading text-2xl">Your Cart</h2>
          <button onClick={closeCart} className="p-1 hover:text-[#C4956A] transition-colors">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={48} className="text-[#A09890] mb-4" strokeWidth={1} />
            <h3 className="font-heading text-xl mb-2">Your cart is empty</h3>
            <p className="font-body text-sm text-[#A09890] mb-6">Start shopping to fill it up</p>
            <button onClick={() => { closeCart(); navigate('/shop'); }} className="btn-outline">
              SHOP NOW
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex gap-4 pb-6 border-b border-gray-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-label text-[#C4956A] mb-1">{item.product.brand}</p>
                        <p className="font-body text-sm font-medium truncate">{item.product.name}</p>
                        <p className="font-body text-xs text-[#A09890] mt-1">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.color, item.size)}
                        className="p-1 text-[#A09890] hover:text-red-500 transition-colors ml-2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity - 1)}
                          className="px-3 py-1 text-sm hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity + 1)}
                          className="px-3 py-1 text-sm hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-price">BDT {(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="font-body text-sm">Subtotal</span>
                <span className="font-price">BDT {totalPrice.toLocaleString()}</span>
              </div>
              <button
                onClick={() => { closeCart(); navigate('/checkout'); }}
                className="btn-primary w-full"
              >
                PROCEED TO CHECKOUT
              </button>
              <button
                onClick={() => { closeCart(); navigate('/shop'); }}
                className="w-full text-center font-body text-xs text-[#A09890] hover:text-[#C4956A] mt-3 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
