import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Wallet, CloudSun, Clock, ChevronRight, Info, Check, X } from 'lucide-react';

export default function DashboardOverview() {
  const [isMapView, setIsMapView] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlternative, setShowAlternative] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-tertiary">
      {/* Header Image */}
      <div className="relative h-64 md:h-80 w-full">
        <img 
          src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2036&auto=format&fit=crop" 
          alt="Tokyo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tertiary via-tertiary/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 md:left-10 right-6 flex justify-between items-end">
          <div>
            <div className="inline-flex items-center space-x-2 bg-neutral/80 backdrop-blur px-3 py-1.5 rounded-full mb-3 border border-neutral-light/50">
              <div className="w-2 h-2 rounded-full bg-emerald"></div>
              <span className="text-xs font-medium text-secondary">Trip Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-white drop-shadow-md">Tokyo, Japan</h1>
            <p className="text-white/80 mt-2 flex items-center text-sm md:text-base">
              <Calendar className="w-4 h-4 mr-2" />
              Oct 12 - Oct 18 • 7 Days
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
            <p className="text-2xl font-serif">¥245K</p>
            <p className="text-xs text-emerald mt-1">¥45K remaining</p>
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
                Rain is expected tomorrow afternoon. I've prepared an alternative indoor route focusing on the Mori Art Museum.
              </p>
              <button 
                onClick={() => setShowAlternative(!showAlternative)}
                className="mt-3 text-xs font-medium text-primary hover:text-primary-hover flex items-center transition-colors"
              >
                {showAlternative ? 'Revert to Original' : 'View Alternative'} <ChevronRight className={`w-3 h-3 ml-1 transition-transform ${showAlternative ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif">Today's Itinerary</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsMapView(!isMapView)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                  isMapView 
                    ? 'bg-primary text-tertiary border-primary hover:bg-primary-hover' 
                    : 'bg-neutral border-neutral-light hover:bg-neutral-light'
                }`}
              >
                {isMapView ? 'List View' : 'Map View'}
              </button>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center ${
                  isEditing
                    ? 'bg-emerald text-tertiary hover:bg-emerald/90'
                    : 'bg-secondary text-tertiary hover:bg-white'
                }`}
              >
                {isEditing ? <><Check className="w-4 h-4 mr-1" /> Done</> : 'Edit Day'}
              </button>
            </div>
          </div>

          {isMapView ? (
            <div className="w-full h-96 bg-neutral border border-neutral-light rounded-3xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 grayscale" alt="Map View" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-tertiary/90 backdrop-blur-sm p-4 rounded-xl border border-neutral-light flex flex-col items-center shadow-2xl">
                  <MapPin className="w-8 h-8 text-primary mb-2" />
                  <p className="font-medium text-secondary">Interactive Map</p>
                  <p className="text-xs text-secondary/60 mt-1">Route visualization active</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative border-l-2 border-neutral-light/50 ml-3 md:ml-4 space-y-12 pb-10">
              {/* Timeline Item 1 */}
              <div className="relative pl-8 md:pl-10">
                <div className="absolute w-4 h-4 bg-tertiary border-2 border-primary rounded-full -left-[9px] top-1"></div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-primary font-medium">09:00 AM • 2h</div>
                  {isEditing && (
                    <button className="text-xs text-red-500 hover:text-red-400 bg-red-500/10 px-2 py-1 rounded flex items-center">
                      <X className="w-3 h-3 mr-1" /> Remove
                    </button>
                  )}
                </div>
                
                {showAlternative ? (
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 md:p-6 group hover:border-primary/40 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-tertiary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                      Alternative Applied
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 mt-2">
                      <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1518991040850-252a1b9d45e4?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-primary">Mori Art Museum</h3>
                            <p className="text-sm text-secondary/60 mt-1">Roppongi • Indoor Activity</p>
                          </div>
                          <span className="text-sm font-medium bg-neutral-light px-2 py-1 rounded-md">¥2,000</span>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-primary/20 flex flex-col gap-2">
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs text-secondary/80 leading-relaxed">
                              <span className="text-primary font-medium">AI Note:</span> Substituted due to rain forecast. Offers incredible panoramic views of Tokyo and cutting-edge contemporary art.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-neutral border border-neutral-light rounded-2xl p-4 md:p-6 group hover:border-primary/30 transition-colors">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1542051812871-7575058e1e02?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium">Meiji Shrine</h3>
                            <p className="text-sm text-secondary/60 mt-1">Shibuya City • Cultural Site</p>
                          </div>
                          <span className="text-sm font-medium bg-neutral-light px-2 py-1 rounded-md">Free</span>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-neutral-light/50 flex flex-col gap-2">
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs text-secondary/80 leading-relaxed">
                              <span className="text-secondary font-medium">AI Note:</span> Best visited early morning to avoid crowds and experience the serene atmosphere of the forest path.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            {/* Travel connecting line detail */}
            <div className="absolute left-[30px] top-[140px] md:top-[160px] text-xs text-secondary/40 flex flex-col gap-1 z-10 bg-tertiary py-2">
              <span className="flex items-center"><MapPin className="w-3 h-3 mr-1"/> 15 min walk</span>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-8 md:pl-10 mt-12">
              <div className="absolute w-4 h-4 bg-tertiary border-2 border-neutral-light rounded-full -left-[9px] top-1"></div>
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs text-secondary/60 font-medium">11:15 AM • 1.5h</div>
                {isEditing && (
                  <button className="text-xs text-red-500 hover:text-red-400 bg-red-500/10 px-2 py-1 rounded flex items-center">
                    <X className="w-3 h-3 mr-1" /> Remove
                  </button>
                )}
              </div>
              
              <div className="bg-neutral border border-neutral-light rounded-2xl p-4 md:p-6 group hover:border-primary/30 transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1558055621-125028fbdf84?q=80&w=1964&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium">Koffee Mameya</h3>
                          <span className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-sm">Hidden Gem</span>
                        </div>
                        <p className="text-sm text-secondary/60 mt-1">Omotesando • Specialty Coffee</p>
                      </div>
                      <span className="text-sm font-medium bg-neutral-light px-2 py-1 rounded-md">¥1,500</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-neutral-light/50 flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-secondary/80 leading-relaxed">
                          <span className="text-secondary font-medium">AI Note:</span> Tucked away in a residential area. Features minimalist design and incredible beans. Fits your preference for "local artisan cafes."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
