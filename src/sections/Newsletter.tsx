import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section style={{ backgroundColor: '#E8EDE6' }} className="py-20 px-5 lg:px-8">
      <div className="content-max-width text-center max-w-xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl uppercase mb-4">
          STAY IN THE LOOP
        </h2>
        <p className="font-body text-[#A09890] mb-8">
          Subscribe to receive exclusive offers, early access to new collections, and styling inspiration.
        </p>

        {submitted ? (
          <p className="font-body text-[#8B9D83] font-medium">
            Thank you for subscribing!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-0 py-3 bg-transparent border-b border-[#A09890] font-body text-sm outline-none focus:border-[#8B9D83] transition-colors placeholder:text-[#A09890]/60"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
