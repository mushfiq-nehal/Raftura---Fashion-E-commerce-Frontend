import { Link } from 'react-router-dom';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <svg
            key={i}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={filled ? '#C9A96E' : half ? 'url(#half)' : 'none'}
            stroke="#C9A96E"
            strokeWidth="1.5"
          >
            {half && (
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="#C9A96E" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
            )}
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        );
      })}
    </div>
  );
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem, openCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors[0]?.name || '';
    const defaultSize = product.sizes[0] || '';
    addItem(product, defaultColor, defaultSize);
    openCart();
  };

  return (
    <div className={`group animate-item flex flex-col ${className}`}>
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-gray-100 mb-3" style={{ aspectRatio: '3/4' }}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#8B9D83] text-white text-[0.6rem] font-medium tracking-wider uppercase">
              {product.badge}
            </span>
          )}
          {product.isNew && !product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-black text-white text-[0.6rem] font-medium tracking-wider uppercase">
              NEW
            </span>
          )}
        </div>
      </Link>

      {/* Info — flex-col + flex-1 so button always sticks to bottom */}
      <div className="pt-1 flex flex-col flex-1">
        {/* Name + Stars */}
        <div className="flex items-start justify-between gap-1 mb-1">
          <Link
            to={`/product/${product.id}`}
            className="font-semibold text-xs sm:text-sm text-[#1A1A1A] leading-snug hover:text-[#8B9D83] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
          <div className="flex-shrink-0 pt-0.5">
            <StarRating rating={product.rating} />
          </div>
        </div>

        {/* Short feature tag — always 1 line, consistent height */}
        <p className="text-[0.65rem] sm:text-xs text-[#5C4F43] mb-3 truncate">
          {product.features[0]}
        </p>

        {/* Price + button on same row */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A] whitespace-nowrap">
              BDT {product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[0.6rem] text-[#7A6B5D] line-through whitespace-nowrap hidden sm:inline">
                BDT {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-shrink-0 px-2.5 py-1.5 bg-[#8B7355] text-white text-[0.55rem] font-medium tracking-widest uppercase hover:bg-[#7A6347] transition-colors whitespace-nowrap"
          >
            Add to Cart →
          </button>
        </div>
      </div>
    </div>
  );
}
