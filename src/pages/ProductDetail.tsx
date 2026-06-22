import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Minus, Plus, ChevronDown, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import gsap from 'gsap';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const [added, setAdded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.set(contentRef.current, { opacity: 0, y: 20 });
    gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  }, [id]);

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <h2 className="font-heading text-2xl mb-4">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="btn-primary">
          BACK TO SHOP
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, product.colors[selectedColor].name, product.sizes[selectedSize]);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const accordionItems = [
    {
      id: 'description',
      title: 'Description',
      content: product.description,
    },
    {
      id: 'customization',
      title: 'Customization Options',
      content: `Make this piece truly yours with our customization services. Add monogramming, choose from our embroidery designs, or work with our designers for a completely bespoke piece. Customization turnaround is typically 5-7 business days.`,
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: `Free shipping on orders over Rs. 5,000. Standard delivery: 3-5 business days. Express delivery: 1-2 business days. Easy 30-day returns on unworn items with original tags. Customized items are final sale unless defective.`,
    },
    {
      id: 'reviews',
      title: `Reviews (${product.reviewCount})`,
      content: `Rated ${product.rating} out of 5 stars by ${product.reviewCount} customers. Customers love the quality, fit, and customization options.`,
    },
  ];

  return (
    <div ref={contentRef}>
      {/* Breadcrumb */}
      <div className="pt-24 pb-8 px-5 lg:px-8 content-max-width">
        <p className="font-label text-[#A09890]">
          <Link to="/" className="hover:text-[#8B9D83]">HOME</Link>
          {' / '}
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#8B9D83]">
            {product.category.toUpperCase()}
          </Link>
          {' / '}
          <span className="text-black">{product.name.toUpperCase()}</span>
        </p>
      </div>

      {/* Product Section */}
      <div className="px-5 lg:px-8 content-max-width pb-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left - Image Gallery */}
          <div className="lg:w-[55%]">
            <div className="aspect-[3/4] overflow-hidden rounded bg-gray-100 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded border-2 transition-colors ${
                    selectedImage === index ? 'border-[#8B9D83]' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="lg:w-[45%] py-4">
            <p className="font-label text-[#8B9D83] mb-2">{product.brand}</p>
            <h1 className="font-heading text-3xl md:text-4xl uppercase mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'text-[#8B9D83] fill-[#8B9D83]' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="font-body text-xs text-[#A09890]">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-8">
              <span className="font-heading text-2xl">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="font-body text-[#A09890] line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <p className="font-label mb-3">COLOR: {product.colors[selectedColor].name}</p>
              <div className="flex items-center gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === index ? 'border-black scale-110' : 'border-transparent'
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: color.hex === '#FFFFFF' ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none',
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <p className="font-label mb-3">SIZE: {product.sizes[selectedSize]}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((size, index) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(index)}
                    className={`min-w-[48px] px-4 py-2 border font-body text-sm transition-all ${
                      selectedSize === index
                        ? 'bg-[#8B9D83] text-white border-[#8B9D83]'
                        : 'border-gray-200 hover:border-[#8B9D83]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-50"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-3 font-body text-sm font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-50"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex-1">
                {added ? 'ADDED!' : 'ADD TO CART'}
              </button>
              <button className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center hover:border-[#8B9D83] transition-colors">
                <Heart size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-t border-b border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={18} className="text-[#8B9D83]" strokeWidth={1.5} />
                <span className="font-body text-[0.625rem] text-[#A09890]">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw size={18} className="text-[#8B9D83]" strokeWidth={1.5} />
                <span className="font-body text-[0.625rem] text-[#A09890]">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield size={18} className="text-[#8B9D83]" strokeWidth={1.5} />
                <span className="font-body text-[0.625rem] text-[#A09890]">Secure Checkout</span>
              </div>
            </div>

            {/* Accordion */}
            <div className="space-y-0">
              {accordionItems.map((item) => (
                <div key={item.id} className="border-b border-gray-100">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="font-body text-sm font-medium">{item.title}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openAccordion === item.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openAccordion === item.id && (
                    <div className="pb-4">
                      <p className="font-body text-sm text-[#A09890] leading-relaxed">{item.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="px-5 lg:px-8 content-max-width pb-20">
          <h2 className="font-heading text-2xl md:text-3xl uppercase mb-10">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded bg-gray-100 mb-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="font-label text-[#A09890] mb-1">{p.brand}</p>
                <p className="font-body text-sm font-medium truncate">{p.name}</p>
                <p className="font-price mt-1">Rs. {p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
