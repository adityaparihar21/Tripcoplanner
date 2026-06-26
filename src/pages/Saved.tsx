import { Bookmark, Star } from 'lucide-react';

export default function Saved() {
  const savedItems = [
    { title: 'Aman Tokyo', type: 'Hotel', rating: 4.9, image: 'https://images.unsplash.com/photo-1542314831-c6a4d14b8fc2?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Jiro Dreams of Sushi', type: 'Restaurant', rating: 4.8, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-tertiary p-6 md:p-10">
      <h1 className="text-3xl font-serif mb-8 flex items-center"><Bookmark className="w-8 h-8 mr-3 text-primary" /> Saved Places</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {savedItems.map((item, i) => (
          <div key={i} className="bg-neutral p-4 rounded-2xl border border-neutral-light flex gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-secondary/50 mb-1">{item.type}</span>
              <h3 className="text-lg font-medium">{item.title}</h3>
              <div className="flex items-center mt-2 text-sm text-secondary/70">
                <Star className="w-4 h-4 text-emerald mr-1" /> {item.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
