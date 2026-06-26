import { MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function PlaceholderView() {
  const location = useLocation();
  const featureName = location.pathname.split('/').pop()?.replace('-', ' ');

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-tertiary text-secondary p-8">
      <div className="bg-neutral p-6 rounded-2xl border border-neutral-light max-w-md text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif mb-2 capitalize">{featureName}</h2>
        <p className="text-secondary/60 text-sm leading-relaxed mb-6">
          This feature is currently under development. The AI is working hard to bring you the best travel experience possible. Check back soon!
        </p>
        <button 
          onClick={() => window.history.back()}
          className="bg-primary text-tertiary px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
