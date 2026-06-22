import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/data/products';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {/* Header */}
      <div style={{ backgroundColor: '#D8CAB8' }} className="pt-32 pb-16 px-5 lg:px-8 text-center">
        <p className="font-label text-[#8B9D83] mb-4">SUPPORT</p>
        <h1 className="font-display uppercase text-5xl md:text-6xl lg:text-7xl mb-4">FAQs</h1>
        <p className="font-body text-[#A09890] max-w-md mx-auto">
          Find answers to commonly asked questions about our products, customization, and services.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="section-padding content-max-width max-w-3xl">
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="font-body font-medium pr-8 group-hover:text-[#8B9D83] transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="font-body text-sm text-[#A09890] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center p-12 rounded" style={{ backgroundColor: '#F5F0EB' }}>
          <h3 className="font-heading text-2xl uppercase mb-4">Still have questions?</h3>
          <p className="font-body text-[#A09890] mb-6">
            Our team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
          </p>
          <a href="mailto:hello@modify.fashion" className="btn-primary">
            CONTACT US
          </a>
        </div>
      </div>
    </div>
  );
}
