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
      itinerary: result.itinerary || []
    });

  } catch (error) {
    console.error('Error generating trip:', error);
    res.status(500).json({ error: 'Failed to generate trip' });
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
