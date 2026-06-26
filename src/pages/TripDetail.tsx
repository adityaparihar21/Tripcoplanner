import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Calendar, ArrowLeft, CloudSun, Info, ChevronRight, Check, X, Clock, Download, Search } from 'lucide-react';
import jsPDF from 'jspdf';

export default function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(null);
  const [isMapView, setIsMapView] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tripco-trips');
    if (saved) {
      const parsedTrips = JSON.parse(saved);
      const foundTrip = parsedTrips.find((t: any) => t.id === id);
      if (foundTrip) {
        setTrip(foundTrip);
      }
    }
  }, [id]);

  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(22);
      doc.text(trip.title, 20, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Dates: ${trip.date}`, 20, 30);
      if (trip.destination) {
        doc.text(`Destination: ${trip.destination}`, 20, 38);
      }
      if (trip.guests) {
        doc.text(`Travelers: ${trip.guests}`, 20, 46);
      }
      
      let yPos = 60;
      
      if (trip.itinerary && trip.itinerary.length > 0) {
        trip.itinerary.forEach((dayPlan: any) => {
          if (yPos > 260) {
            doc.addPage();
            yPos = 20;
          }
          doc.setFontSize(16);
          doc.setTextColor(0);
          doc.text(`Day ${dayPlan.day} - ${dayPlan.date}`, 20, yPos);
          yPos += 10;
          
          dayPlan.activities?.forEach((activity: any) => {
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(`${activity.time} - ${activity.title}`, 25, yPos);
            yPos += 7;
            
            doc.setFont("helvetica", "normal");
            doc.setTextColor(80);
            const metaStr = `Location: ${activity.location} | Duration: ${activity.duration} | Cost: ${activity.cost || 'N/A'}`;
            doc.text(metaStr, 25, yPos);
            yPos += 7;
            
            if (activity.note) {
              const splitNote = doc.splitTextToSize(`Note: ${activity.note}`, 160);
              doc.text(splitNote, 25, yPos);
              yPos += (7 * splitNote.length);
            }
            
            yPos += 5;
            doc.setTextColor(0);
          });
          
          yPos += 10;
        });
      } else {
        doc.setFontSize(14);
        doc.text("No detailed itinerary available.", 20, yPos);
      }
      
      doc.save(`${trip.title.replace(/\s+/g, '_')}_Itinerary.pdf`);
    } catch (err) {
      console.error("PDF Export failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  if (!trip) {
    return (
      <div className="flex-1 flex items-center justify-center bg-tertiary">
        <p className="text-secondary/60">Loading trip details...</p>
      </div>
    );
  }

  const hasItinerary = trip.itinerary && trip.itinerary.length > 0;

  const filteredItinerary = trip.itinerary?.map((dayPlan: any) => {
    if (!searchQuery.trim()) return dayPlan;

    const filteredActivities = dayPlan.activities?.filter((activity: any) => {
      const q = searchQuery.toLowerCase();
      return (
        (activity.title && activity.title.toLowerCase().includes(q)) ||
        (activity.location && activity.location.toLowerCase().includes(q)) ||
        (activity.note && activity.note.toLowerCase().includes(q))
      );
    });

    return {
      ...dayPlan,
      activities: filteredActivities
    };
  }).filter((dayPlan: any) => dayPlan.activities && dayPlan.activities.length > 0);

  return (
    <div className="flex-1 overflow-y-auto bg-tertiary">
      {/* Header Image */}
      <div className="h-64 md:h-80 w-full relative">
        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-tertiary via-tertiary/20 to-transparent"></div>
        <button 
          onClick={() => navigate('/dashboard/trips')}
          className="absolute top-6 left-6 p-2 bg-tertiary/80 backdrop-blur-md rounded-full text-secondary hover:text-primary transition-colors border border-neutral-light"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="absolute bottom-6 left-6 md:left-10 right-6">
          <div className="flex items-center space-x-2 text-primary text-sm font-medium mb-2 bg-primary/10 w-fit px-3 py-1 rounded-full border border-primary/20 backdrop-blur-sm">
            <MapPin className="w-4 h-4" />
            <span>{trip.title.split(',')[0]}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-secondary mb-2">{trip.title}</h1>
          <p className="text-secondary/80 flex items-center"><Calendar className="w-4 h-4 mr-2" /> {trip.date}</p>
        </div>
      </div>

      <div className="p-6 md:p-10 max-w-5xl mx-auto flex flex-col xl:flex-row gap-8">
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4 flex-1">
              <h2 className="text-2xl font-serif">Itinerary</h2>
              {hasItinerary && !isMapView && (
                <div className="relative flex-1 max-w-md hidden sm:block">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40" />
                  <input
                    type="text"
                    placeholder="Search activities, places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral border border-neutral-light rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="px-4 py-2 text-sm font-medium rounded-full bg-neutral border border-neutral-light hover:bg-neutral-light transition-colors flex items-center disabled:opacity-50"
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export'}
              </button>
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
                {isEditing ? <><Check className="w-4 h-4 mr-1" /> Done</> : 'Edit Plan'}
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
            <div className="space-y-12">
              {hasItinerary && (
                <div className="relative mb-6 sm:hidden">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40" />
                  <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral border border-neutral-light rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              )}
              
              {!hasItinerary ? (
                <div className="bg-neutral border border-neutral-light rounded-2xl p-8 text-center">
                  <p className="text-secondary/60 mb-4">No detailed itinerary has been generated for this trip yet.</p>
                </div>
              ) : filteredItinerary && filteredItinerary.length > 0 ? (
                filteredItinerary.map((dayPlan: any, dayIdx: number) => (
                  <div key={dayIdx}>
                    <h3 className="text-xl font-medium mb-6 text-secondary border-b border-neutral-light pb-2">
                      Day {dayPlan.day} • <span className="text-secondary/60 text-base font-normal">{dayPlan.date}</span>
                    </h3>
                    <div className="relative border-l-2 border-neutral-light/50 ml-3 md:ml-4 space-y-10 pb-6">
                      {dayPlan.activities?.map((activity: any, actIdx: number) => (
                        <div key={actIdx} className="relative pl-8 md:pl-10">
                          <div className="absolute w-4 h-4 bg-tertiary border-2 border-primary rounded-full -left-[9px] top-1"></div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-xs text-primary font-medium">{activity.time} • {activity.duration}</div>
                            {isEditing && (
                              <button className="text-xs text-red-500 hover:text-red-400 bg-red-500/10 px-2 py-1 rounded flex items-center">
                                <X className="w-3 h-3 mr-1" /> Remove
                              </button>
                            )}
                          </div>
                          
                          <div className="bg-neutral border border-neutral-light rounded-2xl p-4 md:p-6 group hover:border-primary/30 transition-colors">
                            <div className="flex flex-col md:flex-row gap-6">
                              <div className="flex-1 flex flex-col justify-center">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-lg font-medium">{activity.title}</h3>
                                    <p className="text-sm text-secondary/60 mt-1">{activity.location}</p>
                                  </div>
                                  {activity.cost && (
                                    <span className="text-sm font-medium bg-neutral-light px-2 py-1 rounded-md">{activity.cost}</span>
                                  )}
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
                          
                          {actIdx < dayPlan.activities.length - 1 && (
                            <div className="absolute left-[30px] -bottom-[28px] text-[10px] text-secondary/40 flex flex-col gap-0.5 z-10 bg-tertiary py-1">
                              <span><Clock className="w-3 h-3 inline mr-1" />Travel</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-neutral border border-neutral-light rounded-2xl p-8 text-center">
                  <p className="text-secondary/60">No activities found matching your search "{searchQuery}".</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
