export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  category: 'men' | 'women' | 'accessories';
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
  size: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Oversized Linen Blazer',
    brand: 'RAFTURA',
    price: 4999,
    originalPrice: 6999,
    category: 'women',
    image: '/images/product-1.jpg',
    images: ['/images/product-1.jpg', '/images/product-4.jpg', '/images/editorial-story.jpg', '/images/cat-women.jpg'],
    rating: 4.5,
    reviewCount: 128,
    description: 'A beautifully crafted oversized blazer in premium linen. Features a relaxed silhouette with structured shoulders, perfect for layering over any outfit. Customize with embroidery or patches to make it uniquely yours.',
    features: ['100% Premium Linen', 'Oversized Relaxed Fit', 'Customizable Embroidery', 'Fully Lined', 'Dry Clean Only'],
    colors: [
      { name: 'Cream', hex: '#F5F0EB' },
      { name: 'Sage', hex: '#8B9D83' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
  },
  {
    id: 'p2',
    name: 'Cotton-Knit Sweater',
    brand: 'RAFTURA',
    price: 3299,
    originalPrice: 4499,
    category: 'women',
    image: '/images/product-2.jpg',
    images: ['/images/product-2.jpg', '/images/product-1.jpg', '/images/cat-women.jpg', '/images/editorial-story.jpg'],
    rating: 4.8,
    reviewCount: 96,
    description: 'Ultra-soft cotton-knit sweater in a relaxed fit. The chunky ribbed texture adds depth while the sage green tone brings a touch of nature to your wardrobe.',
    features: ['100% Organic Cotton', 'Chunky Rib Knit', 'Relaxed Fit', 'Machine Washable', 'Customizable Patches'],
    colors: [
      { name: 'Sage', hex: '#8B9D83' },
      { name: 'Beige', hex: '#D8CAB8' },
      { name: 'Cream', hex: '#F5F0EB' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isBestSeller: true,
    badge: 'BEST SELLER',
  },
  {
    id: 'p3',
    name: 'Wide-Leg Linen Trousers',
    brand: 'RAFTURA',
    price: 3999,
    originalPrice: 5499,
    category: 'women',
    image: '/images/product-3.jpg',
    images: ['/images/product-3.jpg', '/images/editorial-story.jpg', '/images/product-1.jpg', '/images/cat-women.jpg'],
    rating: 4.6,
    reviewCount: 74,
    description: 'Elegant wide-leg trousers crafted from breathable linen. The high-waisted design elongates the silhouette while the flowing leg creates graceful movement.',
    features: ['100% European Linen', 'High-Waisted Design', 'Wide Leg Silhouette', 'Side Pockets', 'Custom Hem Length'],
    colors: [
      { name: 'Beige', hex: '#D8CAB8' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'p4',
    name: 'Embroidered Linen Dress',
    brand: 'RAFTURA',
    price: 4999,
    originalPrice: 6999,
    category: 'women',
    image: '/images/product-4.jpg',
    images: ['/images/product-4.jpg', '/images/cat-women.jpg', '/images/product-1.jpg', '/images/editorial-story.jpg'],
    rating: 4.9,
    reviewCount: 156,
    description: 'A stunning embroidered linen dress featuring delicate floral patterns. Each piece is hand-finished by our artisans, making every dress truly one-of-a-kind.',
    features: ['Hand-Embroidered Details', '100% Premium Linen', 'A-Line Silhouette', 'Concealed Zipper', 'Custom Embroidery Available'],
    colors: [
      { name: 'Natural', hex: '#D8CAB8' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestSeller: true,
    badge: 'BEST SELLER',
  },
  {
    id: 'p5',
    name: 'Oversized Cotton Hoodie',
    brand: 'RAFTURA',
    price: 2899,
    originalPrice: 3999,
    category: 'women',
    image: '/images/product-5.jpg',
    images: ['/images/product-5.jpg', '/images/cat-women.jpg', '/images/product-1.jpg', '/images/product-4.jpg'],
    rating: 4.7,
    reviewCount: 203,
    description: 'Premium oversized hoodie in brushed cotton fleece. The relaxed silhouette and kangaroo pocket create effortless comfort for everyday wear. Customize with embroidery to make it uniquely yours.',
    features: ['100% Brushed Cotton Fleece', 'Oversized Relaxed Fit', 'Kangaroo Pocket', 'Ribbed Cuffs & Hem', 'Custom Embroidery Available'],
    colors: [
      { name: 'Sand', hex: '#D4BA96' },
      { name: 'Cream', hex: '#F5F0EB' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
  },
  {
    id: 'p6',
    name: 'Essential Cotton T-Shirt',
    brand: 'RAFTURA',
    price: 1499,
    originalPrice: 1999,
    category: 'men',
    image: '/images/product-6.jpg',
    images: ['/images/product-6.jpg', '/images/cat-men.jpg', '/images/editorial-story.jpg', '/images/product-8.jpg'],
    rating: 4.4,
    reviewCount: 312,
    description: 'The perfect everyday t-shirt in premium organic cotton. Soft, breathable, and built to last. Customize with embroidery or prints.',
    features: ['100% Organic Cotton', 'Pre-Shrunk Fabric', 'Reinforced Seams', 'Machine Washable', 'Custom Print/Embroidery'],
    colors: [
      { name: 'Terracotta', hex: '#C17A5F' },
      { name: 'Beige', hex: '#D8CAB8' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p7',
    name: 'Utility Cargo Pants',
    brand: 'RAFTURA',
    price: 4299,
    originalPrice: 5999,
    category: 'men',
    image: '/images/product-7.jpg',
    images: ['/images/product-7.jpg', '/images/editorial-story.jpg', '/images/cat-men.jpg', '/images/product-8.jpg'],
    rating: 4.6,
    reviewCount: 87,
    description: 'Modern utility cargo pants with a tapered fit. Multiple pockets and durable cotton construction make these perfect for urban adventures.',
    features: ['100% Heavyweight Cotton', 'Tapered Fit', '6 Functional Pockets', 'Adjustable Cuffs', 'Custom Patch Options'],
    colors: [
      { name: 'Olive', hex: '#6B7B5E' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Beige', hex: '#D8CAB8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
  },
  {
    id: 'p8',
    name: 'Cotton Poplin Shirt',
    brand: 'RAFTURA',
    price: 3499,
    originalPrice: 4999,
    category: 'men',
    image: '/images/product-8.jpg',
    images: ['/images/product-8.jpg', '/images/cat-men.jpg', '/images/editorial-story.jpg', '/images/product-6.jpg'],
    rating: 4.5,
    reviewCount: 145,
    description: 'Classic cotton poplin shirt with a modern tailored fit. Crisp, clean, and versatile — the foundation of any smart wardrobe.',
    features: ['100% Egyptian Cotton', 'Tailored Fit', 'Mother of Pearl Buttons', 'Machine Washable', 'Custom Monogramming'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#C5D5E0' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    isBestSeller: true,
    badge: 'BEST SELLER',
  },
];

export const categories = [
  { id: 'men', name: 'MEN', image: '/images/cat-men.jpg', count: 24 },
  { id: 'women', name: 'WOMEN', image: '/images/cat-women.jpg', count: 36 },
  { id: 'accessories', name: 'ACCESSORIES', image: '/images/cat-acc.jpg', count: 18 },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Mitchell',
    role: 'Fashion Enthusiast',
    quote: 'The customization options are incredible. My embroidered blazer gets compliments everywhere I go. The quality is exceptional and the fit is perfect.',
    rating: 5,
    image: '/images/testimonial-1.jpg',
  },
  {
    id: 't2',
    name: 'James Cooper',
    role: 'Creative Director',
    quote: 'Finally, a brand that understands personal style. The ability to customize every detail means I can create pieces that truly reflect who I am.',
    rating: 5,
    image: '/images/testimonial-2.jpg',
  },
  {
    id: 't3',
    name: 'Eleanor Whitfield',
    role: 'Interior Designer',
    quote: 'The sustainable practices and attention to detail won me over. Every piece feels thoughtfully made, and the customer service is outstanding.',
    rating: 5,
    image: '/images/testimonial-3.jpg',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Art of Sustainable Fashion: Why Customization Matters',
    excerpt: 'Discover how personalized fashion reduces waste and creates a more meaningful connection between you and your wardrobe.',
    image: '/images/sustainability.jpg',
    date: 'June 15, 2025',
    category: 'Sustainability',
    readTime: '5 min read',
  },
  {
    id: 'b2',
    title: 'Summer Style Guide: Neutral Tones and Natural Fabrics',
    excerpt: 'Embrace the season with our curated collection of breathable linens, soft cottons, and timeless silhouettes.',
    image: '/images/editorial-story.jpg',
    date: 'June 10, 2025',
    category: 'Style Guide',
    readTime: '4 min read',
  },
  {
    id: 'b3',
    title: 'Behind the Seams: Our Artisan Embroidery Process',
    excerpt: 'Take a peek inside our workshop where skilled artisans bring your custom designs to life with meticulous hand embroidery.',
    image: '/images/offer-img.jpg',
    date: 'June 5, 2025',
    category: 'Craftsmanship',
    readTime: '6 min read',
  },
];

export const faqs: FAQ[] = [
  {
    question: 'What is RAFTURA and how does it work?',
    answer: 'RAFTURA is a premium fashion platform that allows you to customize clothing to reflect your personal style. Choose from our curated collection of base pieces, then add custom embroidery, patches, or alterations to make each item uniquely yours.',
  },
  {
    question: 'How do I start customizing a clothing item?',
    answer: 'Simply select any product and click "Customize." You\'ll be able to choose embroidery designs, add text or monograms, select colors and fonts, and preview your creation before placing your order.',
  },
  {
    question: 'Are there extra charges for customization?',
    answer: 'Basic customization options like monogramming and standard embroidery are included in the price. Complex designs, additional patches, or special alterations may incur an extra charge, which will be displayed before checkout.',
  },
  {
    question: 'What is your exchange policy?',
    answer: 'We offer free exchanges within 30 days of delivery. Customized items can be exchanged for sizing issues or store credit if there is a defect. Please note that heavily personalized items may have limited exchange options.',
  },
  {
    question: 'How long does customization take?',
    answer: 'Standard customization takes 5-7 business days on top of our regular processing time. Complex designs or peak seasons may require additional time. You\'ll receive an estimated delivery date at checkout.',
  },
  {
    question: 'What materials do you use?',
    answer: 'We prioritize sustainable, high-quality materials including 100% organic cotton, European linen, mulberry silk, and responsibly sourced wool. All materials are carefully selected for comfort, durability, and environmental impact.',
  },
];

export const stats = [
  { label: 'Organic Cotton', value: 100, suffix: '%', description: ' sustainably sourced materials' },
  { label: 'Zero Waste Goal', value: 95, suffix: '%', description: ' production waste diverted from landfills' },
  { label: 'Ethical Production', value: 50, suffix: '+', description: ' artisan partners worldwide' },
];
