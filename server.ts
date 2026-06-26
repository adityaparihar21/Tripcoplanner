import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
const getAiClient = () => {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('GEMINI_API_KEY not found in environment');
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
};

// API Endpoint to generate a trip
app.post('/api/generate-trip', async (req, res) => {
  try {
    const { destination, date, guests, budget } = req.body;
    
    if (!destination) {
      return res.status(400).json({ error: 'Destination is required' });
    }

    const ai = getAiClient();
    
    const prompt = `Generate a travel trip plan for ${destination}. 
Date: ${date || 'Flexible'}
Guests: ${guests || 2}
Budget: ${budget || 'Standard'}

Respond with a JSON object with this exact structure:
{
  "title": "A creative title for the trip, e.g. 'Tokyo Tech & Temples'",
  "imagePrompt": "A highly detailed, cinematic photography prompt to generate an image representing this trip",
  "budgetBreakdown": {
    "hotel": 500,
    "food": 300,
    "transport": 150,
    "activities": 250
  },
  "centerCoordinates": {
    "lat": 35.6762,
    "lng": 139.6503
  },
  "itinerary": [
    {
      "day": 1,
      "date": "2026-10-12",
      "activities": [
        {
          "time": "09:00 AM",
          "duration": "2h",
          "title": "Visit Meiji Shrine",
          "location": "Shibuya City",
          "coordinates": {
            "lat": 35.6764,
            "lng": 139.6993
          },
          "cost": "Free",
          "note": "Best visited early morning to avoid crowds.",
          "imageSearchQuery": "Meiji Shrine Tokyo"
        }
      ]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const resultText = response.text || "{}";
    const result = JSON.parse(resultText);

    res.json({
      id: Math.random().toString(36).substring(2, 11),
      title: result.title || `Trip to ${destination}`,
      date: date || 'Flexible dates',
      status: 'Upcoming',
      destination,
      budget,
      guests,
      imagePrompt: result.imagePrompt,
      centerCoordinates: result.centerCoordinates || { lat: 0, lng: 0 },
      budgetBreakdown: result.budgetBreakdown || { hotel: 0, food: 0, transport: 0, activities: 0 },
      itinerary: result.itinerary || []
    });

  } catch (error) {
    console.error('Error generating trip:', error);
    res.status(500).json({ error: 'Failed to generate trip' });
  }
});

// In-memory storage for shared trips (for prototype purposes)
const sharedTrips = new Map<string, any>();

app.post('/api/share', (req, res) => {
  try {
    const { trip } = req.body;
    if (!trip) {
      return res.status(400).json({ error: 'Trip data is required' });
    }
    const shareId = Math.random().toString(36).substring(2, 15);
    sharedTrips.set(shareId, trip);
    res.json({ shareId });
  } catch (error) {
    console.error('Error sharing trip:', error);
    res.status(500).json({ error: 'Failed to share trip' });
  }
});

app.get('/api/shared/:shareId', (req, res) => {
  const trip = sharedTrips.get(req.params.shareId);
  if (trip) {
    res.json({ trip });
  } else {
    res.status(404).json({ error: 'Shared trip not found' });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
