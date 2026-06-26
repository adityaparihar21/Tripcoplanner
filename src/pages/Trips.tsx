import { useState, useEffect } from 'react';
import { Plane, Calendar, MapPin, Plus, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import AIPlannerLoading from '../components/AIPlannerLoading';

export default function Trips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('tripco-trips');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      { id: '1', title: 'Tokyo, Japan', date: 'Oct 12 - Oct 18, 2026', status: 'Active', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2036&auto=format&fit=crop' },
      { id: '2', title: 'Paris, France', date: 'Dec 05 - Dec 12, 2026', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1502602898657-3e907a5ea071?q=80&w=2070&auto=format&fit=crop' },
      { id: '3', title: 'Bali, Indonesia', date: 'Feb 10 - Feb 24, 2025', status: 'Completed', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop' }
    ];
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('tripco-trips');
      if (saved) {
        try {
          setTrips(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newTrip, setNewTrip] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    guests: '2',
    budget: ''
  });

  useEffect(() => {
    // Only save if trips length is greater than 0 so we don't accidentally wipe it
    if (trips && trips.length > 0) {
      localStorage.setItem('tripco-trips', JSON.stringify(trips));
    }
  }, [trips]);

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrip.destination || !newTrip.startDate || !newTrip.endDate || !newTrip.budget) {
      toast.error('Please fill in all required fields (Destination, Dates, and Budget)');
      return;
    }

    setIsGenerating(true);
    try {
      const payload = {
        destination: newTrip.destination,
        date: `${newTrip.startDate} to ${newTrip.endDate}`,
        guests: newTrip.guests,
        budget: newTrip.budget
      };
      
      const response = await fetch('/api/generate-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate trip');
      }
      
      const data = await response.json();
      
      // Fallback image based on destination if Gemini doesn't provide one or we can't generate it
      const fallbackImage = `https://source.unsplash.com/800x600/?${encodeURIComponent(newTrip.destination)},city`;
      
      const createdTrip = {
        id: data.id,
        title: data.title,
        date: data.date,
        status: data.status,
        image: fallbackImage,
        itinerary: data.itinerary
      };

      setTrips([createdTrip, ...trips]);
      setIsModalOpen(false);
      setNewTrip({ destination: '', startDate: '', endDate: '', guests: '2', budget: '' });
      toast.success('Trip created successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create trip. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-tertiary p-6 md:p-10 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">My Trips</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-tertiary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-hover transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" /> New Trip
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip: any, i: number) => (
          <div 
            key={i} 
            onClick={() => trip.id ? navigate(`/dashboard/trips/${trip.id}`) : navigate('/dashboard')}
            className="bg-neutral rounded-2xl border border-neutral-light overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors flex flex-col"
          >
            <div className="h-48 overflow-hidden relative shrink-0 bg-neutral-light/30">
              <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-tertiary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-neutral-light">
                {trip.status}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-medium mb-2 flex items-center"><MapPin className="w-4 h-4 mr-2 text-primary shrink-0" /> {trip.title}</h3>
              <p className="text-secondary/60 flex items-center text-sm mt-auto"><Calendar className="w-4 h-4 mr-2 shrink-0" /> {trip.date}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-tertiary rounded-3xl p-6 md:p-8 max-w-md w-full border border-neutral-light relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-secondary/50 hover:text-secondary bg-neutral rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-serif mb-6 text-secondary">Plan a New Trip</h2>
            <form onSubmit={handleCreateTrip} className="space-y-4">
              <div>
                <label className="block text-sm text-secondary/70 mb-1.5">Where to?</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Kyoto, Japan"
                  value={newTrip.destination}
                  onChange={(e) => setNewTrip({...newTrip, destination: e.target.value})}
                  className="w-full bg-neutral border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-secondary placeholder:text-secondary/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-secondary/70 mb-1.5">Start Date</label>
                  <input 
                    type="date" 
                    required
                    value={newTrip.startDate}
                    onChange={(e) => setNewTrip({...newTrip, startDate: e.target.value})}
                    className="w-full bg-neutral border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-secondary [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-secondary/70 mb-1.5">End Date</label>
                  <input 
                    type="date" 
                    required
                    value={newTrip.endDate}
                    onChange={(e) => setNewTrip({...newTrip, endDate: e.target.value})}
                    className="w-full bg-neutral border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-secondary [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-secondary/70 mb-1.5">Guests</label>
                <input 
                  type="number" 
                  min="1"
                  value={newTrip.guests}
                  onChange={(e) => setNewTrip({...newTrip, guests: e.target.value})}
                  className="w-full bg-neutral border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-secondary"
                />
              </div>
              <div>
                <label className="block text-sm text-secondary/70 mb-1.5">Estimated Budget</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. $2000"
                  value={newTrip.budget}
                  onChange={(e) => setNewTrip({...newTrip, budget: e.target.value})}
                  className="w-full bg-neutral border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-secondary placeholder:text-secondary/30"
                />
              </div>
              <button 
                type="submit" 
                disabled={isGenerating}
                className="w-full bg-primary text-tertiary font-medium py-3 rounded-xl mt-4 hover:bg-primary-hover transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</>
                ) : (
                  'Create Trip'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isGenerating && <AIPlannerLoading />}
      </AnimatePresence>
    </div>
  );
}
