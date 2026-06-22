import { Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import FAQs from '@/pages/FAQs';
import About from '@/pages/About';
import Customize from '@/pages/Customize';
import Placeholder from '@/pages/Placeholder';

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/about" element={<About />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/wishlist" element={<Placeholder title="Wishlist" />} />
          <Route path="/account" element={<Placeholder title="My Account" />} />
          <Route path="/contact" element={<Placeholder title="Contact Us" />} />
          <Route path="/shipping" element={<Placeholder title="Shipping & Returns" />} />
          <Route path="/size-guide" element={<Placeholder title="Size Guide" />} />
          <Route path="/track" element={<Placeholder title="Track Order" />} />
          <Route path="/terms" element={<Placeholder title="Terms & Conditions" />} />
          <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
