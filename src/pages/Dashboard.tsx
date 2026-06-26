import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Wallet, CloudSun, Clock, ChevronRight, Info, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardOverview() {
  const [isMapView, setIsMapView] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlternative, setShowAlternative] = useState(false);
  const [recentTrip, setRecentTrip] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTrip = () => {
      const tripsData = localStorage.getItem('tripco-trips');
      if (tripsData) {
        const trips = JSON.parse(tripsData);
        if (trips && trips.length > 0) {
          setRecentTrip(trips[0]);
        }
      }
    };
    
    loadTrip();
    
    window.addEventListener('storage', loadTrip);
    return () => window.removeEventListener('storage', loadTrip);
  }, []);

  if (!recentTrip) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <MapPin className="w-12 h-12 text-secondary/30 mb-4" />
        <h2 className="text-2xl font-serif text-secondary mb-2">Welcome to TripCo</h2>
        <p className="text-secondary/60 max-w-md mb-6">You don't have any upcoming trips yet. Generate your first itinerary to see your dashboard.</p>
        <button 
          onClick={() => navigate('/dashboard/trips')}
          className="bg-primary text-tertiary px-6 py-3 rounded-full font-medium hover:bg-primary-hover transition-colors"
        >
          Create a Trip
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-tertiary">
      {/* Header Image */}
      <div className="relative h-64 md:h-80 w-full">
        <img 
          src={recentTrip.image || "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2036&auto=format&fit=crop"} 
          alt={recentTrip.destination} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tertiary via-tertiary/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 md:left-10 right-6 flex justify-between items-end">
          <div>
            <div className="inline-flex items-center space-x-2 bg-neutral/80 backdrop-blur px-3 py-1.5 rounded-full mb-3 border border-neutral-light/50">
              <div className="w-2 h-2 rounded-full bg-emerald"></div>
              <span className="text-xs font-medium text-secondary">Trip Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-white drop-shadow-md">{recentTrip.destination}</h1>
            <p className="text-white/80 mt-2 flex items-center text-sm md:text-base">
              <Calendar className="w-4 h-4 mr-2" />
              {recentTrip.date}
            </p>
          </div>
          
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center space-x-2 bg-neutral/80 backdrop-blur px-4 py-2 rounded-2xl border border-neutral-light/50">
              <CloudSun className="w-5 h-5 text-primary" />
              <div className="text-right">
                <p className="text-sm font-medium">18°C</p>
                <p className="text-xs text-secondary/70">Partly Cloudy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-neutral p-5 rounded-2xl border border-neutral-light">
            <div className="flex items-center justify-between mb-3 text-secondary/50">
              <span className="text-xs font-medium uppercase tracking-wider">Budget</span>
              <Wallet className="w-4 h-4" />
            </div>
            <p className="text-2xl font-serif">
              ${recentTrip.budgetBreakdown?.hotel ? Object.values(recentTrip.budgetBreakdown).reduce((a: any, b: any) => a + b, 0) : 'N/A'}
            </p>
            <p className="text-xs text-secondary/50 mt-1">Estimated total</p>
          </div>
          <div className="bg-neutral p-5 rounded-2xl border border-neutral-light">
            <div className="flex items-center justify-between mb-3 text-secondary/50">
              <span className="text-xs font-medium uppercase tracking-wider">Pace</span>
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-2xl font-serif">Relaxed</p>
            <p className="text-xs text-secondary/50 mt-1">~4h walking/day</p>
          </div>
          <div className="col-span-2 bg-primary/10 p-5 rounded-2xl border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <MapPin className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center mb-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Smart Alert</span>
              </div>
              <p className="text-sm text-secondary/90 leading-relaxed max-w-[80%]">
                Rain is expected tomorrow afternoon. I've prepared an alternative indoor route focusing on the nearby museums.
              </p>
            </div>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif">Today's Itinerary</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => navigate(`/dashboard/trips/${recentTrip.id}`)}
                className="bg-neutral border-neutral-light hover:bg-neutral-light px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center border"
              >
                View Full Itinerary <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          <div className="relative border-l-2 border-neutral-light/50 ml-3 md:ml-4 space-y-12 pb-10">
            {recentTrip.itinerary && recentTrip.itinerary.length > 0 && recentTrip.itinerary[0].activities?.map((activity: any, idx: number) => (
              <div key={idx} className="relative pl-8 md:pl-10">
                <div className="absolute w-4 h-4 bg-tertiary border-2 border-primary rounded-full -left-[9px] top-1"></div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-primary font-medium">{activity.time} • {activity.duration}</div>
                </div>
                
                <div className="bg-neutral border border-neutral-light rounded-2xl p-4 md:p-6 group hover:border-primary/30 transition-colors">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">{activity.title}</h3>
                          <p className="text-sm text-secondary/60 mt-1">{activity.location}</p>
                        </div>
                        <span className="text-sm font-medium bg-neutral-light px-2 py-1 rounded-md">{activity.cost || 'Free'}</span>
                      </div>
                      
                      {activity.note && (
                        <div className="mt-4 pt-4 border-t border-neutral-light/50 flex flex-col gap-2">
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs text-secondary/80 leading-relaxed">
                              <span className="text-secondary font-medium">AI Note:</span> {activity.note}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {(!recentTrip.itinerary || recentTrip.itinerary.length === 0) && (
               <p className="text-secondary/60 pl-8">No activities planned for today.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
