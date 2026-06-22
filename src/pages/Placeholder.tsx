import { Link } from 'react-router-dom';
import { Construction } from 'lucide-react';

export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="pt-32 pb-16 px-5 lg:px-8 content-max-width text-center min-h-[60vh] flex flex-col items-center justify-center">
      <Construction size={48} className="text-[#8B9D83] mb-6" strokeWidth={1} />
      <h1 className="font-heading text-3xl uppercase mb-4">{title}</h1>
      <p className="font-body text-[#A09890] mb-8 max-w-md">
        This page is coming soon. We&apos;re working hard to bring you the best experience.
      </p>
      <Link to="/" className="btn-primary">GO HOME</Link>
    </div>
  );
}
