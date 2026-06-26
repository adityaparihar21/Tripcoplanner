import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create a custom icon for active markers (using TripCo primary color if possible, or standard)
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapBoundsUpdater({ points }: { points: { lat: number, lng: number }[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [points, map]);
  return null;
}

export default function TripMap({ trip }: { trip: any }) {
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');

  const allDays = trip.itinerary || [];
  
  // Flatten activities to extract those with coordinates
  const allActivitiesWithCoords: any[] = [];
  allDays.forEach((day: any) => {
    (day.activities || []).forEach((activity: any) => {
      if (activity.coordinates && activity.coordinates.lat && activity.coordinates.lng) {
        allActivitiesWithCoords.push({
          ...activity,
          day: day.day
        });
      }
    });
  });

  const displayedActivities = selectedDay === 'all' 
    ? allActivitiesWithCoords 
    : allActivitiesWithCoords.filter(a => a.day === selectedDay);

  const defaultCenter = trip.centerCoordinates || { lat: 0, lng: 0 };
  const hasCoordinates = allActivitiesWithCoords.length > 0 || (defaultCenter.lat !== 0 && defaultCenter.lng !== 0);

  // If no coordinates at all, show fallback
  if (!hasCoordinates) {
    return (
      <div className="w-full h-[500px] bg-neutral border border-neutral-light rounded-3xl flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-secondary mb-2 font-medium">Map Not Available</p>
          <p className="text-secondary/60 text-sm">Coordinate data was not generated for this itinerary.</p>
        </div>
      </div>
    );
  }

  const mapCenter = displayedActivities.length > 0 
    ? { lat: displayedActivities[0].coordinates.lat, lng: displayedActivities[0].coordinates.lng } 
    : defaultCenter;

  const points = displayedActivities.map(a => a.coordinates);

  return (
    <div className="w-full space-y-4">
      {/* Day Selector */}
      <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar pb-2">
        <button
          onClick={() => setSelectedDay('all')}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            selectedDay === 'all'
              ? 'bg-primary text-tertiary font-medium'
              : 'bg-neutral border border-neutral-light text-secondary/70 hover:text-secondary'
          }`}
        >
          Overview
        </button>
        {allDays.map((day: any) => (
          <button
            key={day.day}
            onClick={() => setSelectedDay(day.day)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedDay === day.day
                ? 'bg-primary text-tertiary font-medium'
                : 'bg-neutral border border-neutral-light text-secondary/70 hover:text-secondary'
            }`}
          >
            Day {day.day}
          </button>
        ))}
      </div>

      <div className="w-full h-[500px] bg-neutral border border-neutral-light rounded-3xl overflow-hidden relative isolate">
        <MapContainer 
          center={[mapCenter.lat, mapCenter.lng]} 
          zoom={13} 
          style={{ height: '100%', width: '100%', zIndex: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {displayedActivities.map((activity, idx) => (
            <Marker 
              key={`${activity.title}-${idx}`} 
              position={[activity.coordinates.lat, activity.coordinates.lng]}
              icon={customIcon}
            >
              <Popup className="trip-popup">
                <div className="text-tertiary">
                  <h4 className="font-bold mb-1">{activity.title}</h4>
                  <p className="text-xs mb-1">Day {activity.day} • {activity.time}</p>
                  <p className="text-xs opacity-80">{activity.location}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          {points.length > 0 && <MapBoundsUpdater points={points} />}
        </MapContainer>
      </div>
    </div>
  );
}
