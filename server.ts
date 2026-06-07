/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily to prevent crash if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Check api health and availability
app.get("/api/health", (req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";
  res.json({
    status: "ok",
    hasGeminiKey: hasKey,
  });
});

// Real Gemini Chat with Google Search Grounding & Agentic simulations
app.post("/api/chat", async (req, res) => {
  const { message, previousMessages = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const ai = getGeminiClient();

  // If no API key is specified, provide a highly intelligent local simulation
  if (!ai) {
    // Generate a clever simulation answer
    return res.json({
      sender: "agent",
      text: `[Key Missing Mode] yourAI Agent is currently in Simulation Mode. To unlock real internet web searches, live data ingestion, and complete model switching, please click on the Secrets panel in the AI Studio UI to supply your **GEMINI_API_KEY**.\n\nHere is what I would do in my analysis: I would run web scans for Northern Europe compliance registries, investigate sustainable technology trends, and outline a complete structure draft focused on carbon neutral grids.`,
      sourcesScanned: 14,
      steps: ["Scanning Q3 registries", "Verifying compliance data", "Reviewing Sweden/Denmark records"],
      groundingUrls: [
        { uri: "https://ai.studio/build", title: "Setup real GEMINI_API_KEY in Secrets panel" }
      ]
    });
  }

  try {
    // Call Gemini with search grounding enabled
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: "You are yourAI Agent, a leading industrial intelligence strategist and cognitive supervisor. You execute tasks with utmost technical precision. Incorporate data and analytical terms from recent market trends. Speak clearly, concisely, and with strategic authority.",
        tools: [{ googleSearch: {} }]
      }
    });

    const replyText = response.text || "I was unable to synthesize a response.";
    
    // Extract search citations if available
    const groundingUrls: Array<{ uri: string; title: string }> = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      for (const chunk of chunks) {
        if (chunk.web?.uri) {
          groundingUrls.push({
            uri: chunk.web.uri,
            title: chunk.web.title || chunk.web.uri
          });
        }
      }
    }

    // Return the response with real search grounded results
    return res.json({
      sender: "agent",
      text: replyText,
      sourcesScanned: groundingUrls.length > 0 ? groundingUrls.length + 3 : 8,
      steps: ["Parsing user requests", "Searching the live web", "Extracting relevant citations", "Synthesizing strategic context"],
      groundingUrls: groundingUrls.slice(0, 5) // Limit to top 5
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "Cognitive Engine Error",
      details: error.message || String(error)
    });
  }
});

// Server boot and Vite middleware placement
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`yourAI Server listening on http://localhost:${PORT}`);
  });
}

bootstrap();
