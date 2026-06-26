import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, CloudSun, Check, Clock, Search, DollarSign, Download, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import TripMap from '../components/TripMap';
import CurrencyConverter from '../components/CurrencyConverter';

const COLORS = ['#D4AF37', '#2B5B84', '#2E5A44', '#D96C4A'];

export default function SharedTrip() {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapView, setIsMapView] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchSharedTrip() {
      try {
        const res = await fetch(`/api/shared/${shareId}`);
        if (!res.ok) throw new Error('Failed to fetch shared trip');
        const data = await res.json();
        setTrip(data.trip);
      } catch (err) {
        toast.error('Could not load shared trip');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSharedTrip();
  }, [shareId]);

  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text(trip.title, 20, 20);
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Dates: ${trip.date}`, 20, 30);
      if (trip.destination) doc.text(`Destination: ${trip.destination}`, 20, 38);
      if (trip.guests) doc.text(`Travelers: ${trip.guests}`, 20, 46);
      
      let yPos = 60;
      if (trip.itinerary && trip.itinerary.length > 0) {
        trip.itinerary.forEach((dayPlan: any) => {
          if (yPos > 260) { doc.addPage(); yPos = 20; }
          doc.setFontSize(16); doc.setTextColor(0);
          doc.text(`Day ${dayPlan.day} - ${dayPlan.date}`, 20, yPos);
          yPos += 10;
          
          dayPlan.activities?.forEach((activity: any) => {
            if (yPos > 270) { doc.addPage(); yPos = 20; }
            doc.setFontSize(12); doc.setFont("helvetica", "bold");
            doc.text(`${activity.time} - ${activity.title}`, 25, yPos);
            yPos += 7;
            
            doc.setFont("helvetica", "normal"); doc.setTextColor(80);
            const metaStr = `Location: ${activity.location} | Duration: ${activity.duration} | Cost: ${activity.cost || 'N/A'}`;
            doc.text(metaStr, 25, yPos);
            yPos += 7;
            
            if (activity.note) {
              const splitNote = doc.splitTextToSize(`Note: ${activity.note}`, 160);
              doc.text(splitNote, 25, yPos);
              yPos += (7 * splitNote.length);
            }
            yPos += 5; doc.setTextColor(0);
          });
          yPos += 10;
        });
      } else {
        doc.setFontSize(14); doc.text("No detailed itinerary available.", 20, yPos);
      }
      doc.save(`${trip.title.replace(/\s+/g, '_')}_Itinerary.pdf`);
    } catch (err) {
      console.error("PDF Export failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tertiary">
        <p className="text-secondary/60">Loading shared trip...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tertiary">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-secondary mb-4">Trip Not Found</h1>
          <button onClick={() => navigate('/')} className="text-primary hover:underline">
            Go back to TripCo
          </button>
        </div>
      </div>
    );
  }

  const hasItinerary = trip.itinerary && trip.itinerary.length > 0;
  const budgetData = trip.budgetBreakdown ? [
    { name: 'Hotel', value: trip.budgetBreakdown.hotel || 0 },
    { name: 'Food', value: trip.budgetBreakdown.food || 0 },
    { name: 'Transport', value: trip.budgetBreakdown.transport || 0 },
    { name: 'Activities', value: trip.budgetBreakdown.activities || 0 },
  ].filter(item => item.value > 0) : [];

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
    return { ...dayPlan, activities: filteredActivities };
  }).filter((dayPlan: any) => dayPlan.activities && dayPlan.activities.length > 0);

  return (
    <div className="min-h-screen overflow-y-auto bg-tertiary pb-20">
      {/* Header Image */}
      <div className="h-64 md:h-80 w-full relative">
        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-tertiary via-tertiary/20 to-transparent"></div>
        <div className="absolute top-6 right-6 p-2 bg-tertiary/80 backdrop-blur-md rounded-xl text-primary text-sm font-medium border border-primary/20">
          Shared Trip View
        </div>
        <div className="absolute bottom-6 left-6 md:left-10 right-6">
          <div className="flex items-center space-x-2 text-primary text-sm font-medium mb-2 bg-primary/10 w-fit px-3 py-1 rounded-full border border-primary/20 backdrop-blur-sm">
            <MapPin className="w-4 h-4" />
            <span>{trip.title.split(',')[0]}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-secondary mb-2">{trip.title}</h1>
          <p className="text-secondary/80 flex items-center"><Calendar className="w-4 h-4 mr-2" /> {trip.date}</p>
        </div>
      </div>

      <div className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col xl:flex-row gap-8">
        
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
            </div>
          </div>

          {isMapView ? (
            <TripMap trip={trip} />
          ) : (
            <div className="space-y-12">
              {hasItinerary && (
                filteredItinerary?.map((dayPlan: any) => (
                  <div key={dayPlan.day} className="relative">
                    <div className="sticky top-0 z-10 bg-tertiary/90 backdrop-blur-md py-4 mb-6 border-b border-neutral-light flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-neutral border border-neutral-light flex items-center justify-center font-serif text-lg">
                          {dayPlan.day}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Day {dayPlan.day}</h3>
                          <p className="text-sm text-secondary/60">{dayPlan.date}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6 pl-5 md:pl-12 border-l-2 border-neutral-light ml-5">
                      {dayPlan.activities?.map((activity: any, idx: number) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[27px] md:-left-[55px] top-1 w-4 h-4 rounded-full bg-tertiary border-2 border-primary"></div>
                          
                          <div className="bg-neutral border border-neutral-light rounded-2xl p-5 hover:border-primary/50 transition-colors group">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                  <span className="text-primary font-medium text-sm flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {activity.time}
                                  </span>
                                  <span className="text-secondary/40 text-sm">•</span>
                                  <span className="text-secondary/60 text-sm">{activity.duration}</span>
                                </div>
                                <h4 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">{activity.title}</h4>
                                <div className="flex items-center text-sm text-secondary/60 mb-3">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {activity.location}
                                </div>
                                {activity.note && (
                                  <p className="text-sm text-secondary/80 bg-tertiary p-3 rounded-xl border border-neutral-light/50 inline-block w-full">
                                    {activity.note}
                                  </p>
                                )}
                              </div>
                              <div className="md:text-right shrink-0">
                                <span className="inline-block px-3 py-1 bg-neutral-light rounded-lg text-sm font-medium">
                                  {activity.cost}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="w-full xl:w-80 shrink-0 space-y-6">
          {budgetData.length > 0 && (
            <div className="bg-neutral border border-neutral-light rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
               <h3 className="text-xl font-medium mb-6 flex items-center font-serif text-secondary">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  Budget Breakdown
               </h3>
               <div className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie 
                        data={budgetData} 
                        cx="50%" cy="50%" 
                        innerRadius={65} outerRadius={85} 
                        paddingAngle={5} 
                        dataKey="value"
                        stroke="none"
                     >
                       {budgetData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                     </Pie>
                     <RechartsTooltip 
                        formatter={(value) => `$${value}`}
                        contentStyle={{ backgroundColor: 'var(--color-neutral)', borderColor: 'var(--color-neutral-light)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: 'var(--color-secondary)' }}
                     />
                     <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        formatter={(value) => <span className="text-secondary/80 text-sm ml-1">{value}</span>}
                     />
                   </PieChart>
                 </ResponsiveContainer>
               </div>
            </div>
          )}
          <CurrencyConverter />
        </div>
      </div>
    </div>
  );
}
