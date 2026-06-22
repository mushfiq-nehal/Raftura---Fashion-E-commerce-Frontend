import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import gsap from 'gsap';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const gridRef = useRef<HTMLDivElement>(null);

  const urlCategory = searchParams.get('category');
  const urlNew = searchParams.get('new');
  const urlSearch = searchParams.get('search');
  const urlBestSeller = searchParams.get('bestseller');

  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory.toUpperCase());
    }
  }, [urlCategory]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (urlCategory) {
      result = result.filter((p) => p.category === urlCategory.toLowerCase());
    }
    if (urlNew === 'true') {
      result = result.filter((p) => p.isNew);
    }
    if (urlBestSeller === 'true') {
      result = result.filter((p) => p.isBestSeller);
    }
    if (urlSearch) {
      const q = urlSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'ALL') {
      result = result.filter((p) => p.category === activeCategory.toLowerCase());
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, sortBy, urlCategory, urlNew, urlSearch, urlBestSeller]);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.product-card');
    gsap.set(items, { y: 20, opacity: 0 });
    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.out',
    });
  }, [filteredProducts, viewMode]);

  const categories = ['ALL', 'MEN', 'WOMEN', 'ACCESSORIES'];

  return (
    <div>
      {/* Page Header */}
      <div style={{ backgroundColor: '#D8CAB8' }} className="py-5 px-5 lg:px-8">
        <div className="content-max-width flex items-center justify-between">
          <h1 className="font-heading text-xl md:text-2xl uppercase tracking-widest">Shop</h1>
          <p className="font-label text-xs text-[#A09890]">
            <Link to="/" className="hover:text-[#C4956A]">Home</Link>
            {' / '}
            <span className="text-[#8B9D83]">Shop</span>
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-black/5">
        <div className="content-max-width px-5 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-nav whitespace-nowrap relative py-1 ${
                  activeCategory === cat ? 'text-[#8B9D83]' : 'text-black/60 hover:text-[#C4956A]'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8B9D83]" />
                )}
              </button>
            ))}
          </div>

          {/* Sort & View */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-[#A09890]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-body text-xs bg-transparent outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="hidden sm:flex items-center gap-1 border-l border-gray-200 pl-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 ${viewMode === 'grid' ? 'text-black' : 'text-[#A09890]'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 ${viewMode === 'list' ? 'text-black' : 'text-[#A09890]'}`}
              >
                <LayoutList size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="section-padding content-max-width">
        <div
          ref={gridRef}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
              : 'flex flex-col gap-6'
          }
        >
          {filteredProducts.map((product) => (
            viewMode === 'grid' ? (
              <GridProductCard key={product.id} product={product} />
            ) : (
              <ListProductCard key={product.id} product={product} />
            )
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-heading text-xl text-[#A09890]">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function GridProductCard({ product }: { product: typeof products[0] }) {
  return <ProductCard product={product} className="product-card" />;
}

function ListProductCard({ product }: { product: typeof products[0] }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card group flex gap-6 p-4 border border-gray-100 rounded hover:border-[#C4956A]/30 transition-colors">
      <div className="relative w-32 h-40 flex-shrink-0 overflow-hidden rounded bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-400 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex-1 py-2">
        <p className="font-label text-[#A09890] mb-1">{product.brand}</p>
        <p className="font-body font-medium mb-2">{product.name}</p>
        <p className="font-body text-xs text-[#A09890] mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2">
          <span className="font-price">BDT {product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="font-price text-[#A09890] line-through text-xs">
              BDT {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
