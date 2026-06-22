import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Palette, Type, Sparkles, Shirt, ArrowRight } from 'lucide-react';

const customizationOptions = [
  {
    icon: Palette,
    title: 'Embroidery',
    description: 'Add intricate hand-stitched designs, monograms, or custom patterns to your garments.',
  },
  {
    icon: Type,
    title: 'Monogramming',
    description: 'Personalize with initials, names, or meaningful words in a variety of fonts and styles.',
  },
  {
    icon: Sparkles,
    title: 'Patches & Badges',
    description: 'Express yourself with our collection of premium patches, or design your own.',
  },
  {
    icon: Shirt,
    title: 'Tailoring',
    description: 'Get the perfect fit with our bespoke tailoring services for any garment.',
  },
];

export default function Customize() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const customizableProducts = products.filter((p) => p.features.some((f) => f.includes('Custom')));

  return (
    <div>
      {/* Header */}
      <div style={{ backgroundColor: '#D8CAB8' }} className="pt-32 pb-16 px-5 lg:px-8 text-center">
        <p className="font-label text-[#8B9D83] mb-4">MAKE IT YOURS</p>
        <h1 className="font-display uppercase text-5xl md:text-6xl lg:text-7xl mb-4">CUSTOMIZE</h1>
        <p className="font-body text-[#A09890] max-w-lg mx-auto">
          Transform any piece into a unique expression of your personal style. Our artisans bring your vision to life.
        </p>
      </div>

      {/* How It Works */}
      <div className="section-padding content-max-width">
        <div className="text-center mb-14">
          <p className="font-label text-[#8B9D83] mb-4">THE PROCESS</p>
          <h2 className="font-heading text-3xl md:text-4xl uppercase">HOW IT WORKS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {[
            { step: '01', title: 'Choose Your Piece', desc: 'Select from our curated collection of customizable garments.' },
            { step: '02', title: 'Design Your Look', desc: 'Pick embroidery, patches, monograms, or tailoring options.' },
            { step: '03', title: 'Preview & Confirm', desc: 'See a digital mockup of your customizations before ordering.' },
            { step: '04', title: 'We Craft & Ship', desc: 'Our artisans create your piece and deliver it within 5-7 days.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <p className="font-heading text-4xl text-[#8B9D83]/30 mb-4">{item.step}</p>
              <h3 className="font-heading text-lg uppercase mb-3">{item.title}</h3>
              <p className="font-body text-sm text-[#A09890]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Customization Options */}
        <div className="text-center mb-14">
          <p className="font-label text-[#8B9D83] mb-4">SERVICES</p>
          <h2 className="font-heading text-3xl md:text-4xl uppercase">CUSTOMIZATION OPTIONS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {customizationOptions.map((option) => (
            <div
              key={option.title}
              className="p-8 border border-gray-100 rounded hover:border-[#8B9D83]/30 transition-colors text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#8B9D83]/10 flex items-center justify-center mx-auto mb-4">
                <option.icon size={24} className="text-[#8B9D83]" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg uppercase mb-3">{option.title}</h3>
              <p className="font-body text-sm text-[#A09890] leading-relaxed">{option.description}</p>
            </div>
          ))}
        </div>

        {/* Customizable Products */}
        <div className="text-center mb-14">
          <p className="font-label text-[#8B9D83] mb-4">START CREATING</p>
          <h2 className="font-heading text-3xl md:text-4xl uppercase">CUSTOMIZABLE PRODUCTS</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {customizableProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group"
              onMouseEnter={() => setSelectedProduct(product.id)}
              onMouseLeave={() => setSelectedProduct(null)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded bg-gray-100 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-400 group-hover:scale-105"
                />
                {selectedProduct === product.id && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-nav flex items-center gap-2">
                      CUSTOMIZE <ArrowRight size={14} />
                    </span>
                  </div>
                )}
              </div>
              <p className="font-label text-[#A09890] mb-1">{product.brand}</p>
              <p className="font-body text-sm font-medium truncate">{product.name}</p>
              <p className="font-price mt-1">Rs. {product.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>

        {/* Special Offer CTA */}
        <div className="mt-20 p-12 rounded text-center" style={{ backgroundColor: '#8B9D83' }}>
          <h3 className="font-heading text-white text-2xl md:text-3xl uppercase mb-4">
            FLAT 50% OFF ON CUSTOMIZATION
          </h3>
          <p className="font-body text-white/85 mb-8 max-w-md mx-auto">
            For a limited time, get half off all customization services. Make your wardrobe uniquely yours.
          </p>
          <Link to="/shop" className="inline-block px-8 py-3 bg-white text-[#8B9D83] font-nav text-xs tracking-wider hover:bg-white/90 transition-colors rounded-full">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
