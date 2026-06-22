import { Leaf, Heart, Users, Award } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Sustainability First',
    description: 'We prioritize eco-friendly materials and ethical production practices in everything we create.',
  },
  {
    icon: Heart,
    title: 'Made with Care',
    description: 'Every garment is crafted with attention to detail and a commitment to lasting quality.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'We listen to our customers and collaborate with artisans to bring unique visions to life.',
  },
  {
    icon: Award,
    title: 'Uncompromising Quality',
    description: 'Premium materials and expert craftsmanship ensure pieces that stand the test of time.',
  },
];

export default function About() {
  return (
    <div>
      {/* Header */}
      <div style={{ backgroundColor: '#D8CAB8' }} className="pt-32 pb-16 px-5 lg:px-8 text-center">
        <p className="font-label text-[#8B9D83] mb-4">OUR STORY</p>
        <h1 className="font-display uppercase text-5xl md:text-6xl lg:text-7xl mb-4">ABOUT RAFTURA</h1>
        <p className="font-body text-[#A09890] max-w-lg mx-auto">
          Where fashion meets personality. We believe everyone deserves clothing that tells their unique story.
        </p>
      </div>

      {/* Hero Image */}
      <div className="content-max-width px-5 lg:px-8 mb-20">
        <div className="aspect-[21/9] overflow-hidden rounded">
          <img
            src="/images/sustainability.jpg"
            alt="RAFTURA brand"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mission */}
      <div className="section-padding content-max-width">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="lg:w-1/2">
            <img
              src="/images/editorial-story.jpg"
              alt="Our mission"
              className="w-full aspect-[4/5] object-cover rounded"
            />
          </div>
          <div className="lg:w-1/2">
            <p className="font-label text-[#8B9D83] mb-4">OUR MISSION</p>
            <h2 className="font-heading text-3xl md:text-4xl uppercase mb-6">
              REDEFINING PERSONAL STYLE
            </h2>
            <p className="font-body text-[#A09890] mb-6 leading-relaxed">
              RAFTURA was born from a simple belief: fashion should be as unique as the people who wear it.
              In a world of mass production, we saw an opportunity to bring back the personal touch —
              clothing that reflects your individuality, your values, and your story.
            </p>
            <p className="font-body text-[#A09890] mb-6 leading-relaxed">
              Since 2020, we have been bridging the gap between high-quality craftsmanship and personal
              expression. Our platform empowers you to customize every detail, from embroidery and patches
              to bespoke tailoring, creating pieces that are truly one-of-a-kind.
            </p>
            <p className="font-body text-[#A09890] leading-relaxed">
              We partner with skilled artisans who share our passion for quality and sustainability.
              Together, we are building a fashion ecosystem that values creativity, ethics, and the
              planet equally.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section-padding content-max-width" style={{ backgroundColor: '#F5F0EB' }}>
        <div className="text-center mb-14">
          <p className="font-label text-[#8B9D83] mb-4">WHAT WE STAND FOR</p>
          <h2 className="font-heading text-3xl md:text-4xl uppercase">OUR VALUES</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#8B9D83]/10 flex items-center justify-center mx-auto mb-4">
                <value.icon size={24} className="text-[#8B9D83]" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg uppercase mb-3">{value.title}</h3>
              <p className="font-body text-sm text-[#A09890] leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Banner */}
      <div className="py-20 px-5 lg:px-8 content-max-width">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-heading text-4xl md:text-5xl text-[#8B9D83]">50K+</p>
            <p className="font-label mt-2">Happy Customers</p>
          </div>
          <div>
            <p className="font-heading text-4xl md:text-5xl text-[#8B9D83]">200+</p>
            <p className="font-label mt-2">Custom Designs</p>
          </div>
          <div>
            <p className="font-heading text-4xl md:text-5xl text-[#8B9D83]">50+</p>
            <p className="font-label mt-2">Artisan Partners</p>
          </div>
          <div>
            <p className="font-heading text-4xl md:text-5xl text-[#8B9D83]">100%</p>
            <p className="font-label mt-2">Sustainable</p>
          </div>
        </div>
      </div>
    </div>
  );
}
