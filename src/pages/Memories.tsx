import { Image as ImageIcon } from 'lucide-react';

export default function Memories() {
  const photos = [
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2070&auto=format&fit=crop'
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-tertiary p-6 md:p-10">
      <h1 className="text-3xl font-serif mb-8 flex items-center"><ImageIcon className="w-8 h-8 mr-3 text-primary" /> Trip Memories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((url, i) => (
          <div key={i} className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative">
            <img src={url} alt="Memory" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-sm font-medium border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
