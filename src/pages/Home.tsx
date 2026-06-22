import HeroSection from '@/sections/HeroSection';
import NewArrivals from '@/sections/NewArrivals';
import SpecialOffer from '@/sections/SpecialOffer';
import BestSellers from '@/sections/BestSellers';
import BrandStory from '@/sections/BrandStory';
import Sustainability from '@/sections/Sustainability';
import Testimonials from '@/sections/Testimonials';
import Newsletter from '@/sections/Newsletter';
import InstagramGallery from '@/sections/InstagramGallery';

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewArrivals />
      <SpecialOffer />
      <BestSellers />
      <BrandStory />
      <Sustainability />
      <Testimonials />
      <Newsletter />
      <InstagramGallery />
    </>
  );
}
