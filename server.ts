import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Standard quote database backed by in-memory array (initialized with sample items)
interface QuoteRequest {
  id: string;
  fullName: string;
  email: string;
  documentType: string;
  deadline: string;
  description: string;
  timestamp: string;
  status: string;
  estimatedCost: string;
}

const quotesDb: QuoteRequest[] = [
  {
    id: "quote-1",
    fullName: "Jane Doe",
    email: "jane@lawfirm.com",
    documentType: "NDA / Mutual Confidentiality Agreement",
    deadline: "2026-06-01",
    description: "Standard mutual non-disclosure agreement for a pre-series Venture seed round.",
    timestamp: "2026-05-20T03:00:00Z",
    status: "Analyzing Scope",
    estimatedCost: "$350"
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsers
  app.use(express.json());

  // AI legal assistant proxy endpoint using server-side key
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { messages, systemPrompt } = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: 'Messages parameter must be an array of chat messages.' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // Safe fallback responses if key is placeholder or missing
        const lastUserMsg = messages[messages.length - 1]?.content || "";
        res.json({
          content: `⚡ **[DEMO MODE: Missing GEMINI_API_KEY]**\n\nBeyond The Bar Legal Assistant simulated outcome for:\n*"${lastUserMsg}"*\n\nTo power active legal assistance with real-time court reasoning and automated draft generation under your selected practitioner persona, please input your **GEMINI_API_KEY** into the Secrets panel in Google AI Studio.`,
          simulated: true
        });
        return;
      }

      // Initialize GoogleGenAI SDK lazily as per safety instructions
      const ai = new GoogleGenAI({ apiKey });

      // Build text contents from messages
      // Standard messages mapping for generative request
      // Convert standard {role, content} to SDK format
      const formattedContents = messages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const modelResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt || "You are an elite AI legal assistant named Beyond The Bar.",
          temperature: 0.7,
        }
      });

      const responseText = modelResponse.text || "No response received. Please try again.";

      res.json({
        content: responseText,
        simulated: false
      });

    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({
        error: "An error occurred with the AI agent.",
        details: error.message || error.toString()
      });
    }
  });

  // Action queries: standard endpoint to submit contract and drafting quote requests
  app.post('/api/quotes', (req: Request, res: Response) => {
    try {
      const { fullName, email, documentType, deadline, description } = req.body;

      if (!fullName || !email || !documentType || !description) {
        res.status(400).json({ error: "Required fields missing." });
        return;
      }

      // Automatically generate a prestigious-looking billing quote calculation
      const numWords = description.split(/\s+/).length;
      let costEstimate = 250; // default Starter range
      if (numWords > 120 || documentType.toLowerCase().includes("court") || documentType.toLowerCase().includes("brief") || documentType.toLowerCase().includes("motion")) {
        costEstimate = 500; // Professional range
      }
      if (documentType.toLowerCase().includes("enterprise") || numWords > 250) {
        costEstimate = 750; // Custom enterprise
      }

      const newQuote: QuoteRequest = {
        id: `quote-${Date.now()}`,
        fullName,
        email,
        documentType,
        deadline: deadline || "Within 48h",
        description,
        timestamp: new Date().toISOString(),
        status: "Pending Review",
        estimatedCost: `$${costEstimate}`
      };

      quotesDb.push(newQuote);
      res.status(201).json(newQuote);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to create quote", details: err.message });
    }
  });

  // Fetch submitted quotes list
  app.get('/api/quotes', (req: Request, res: Response) => {
    res.json(quotesDb);
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Beyond The Bar server running on port ${PORT}`);
  });
}

startServer();
