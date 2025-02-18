// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.post("/api/chat", async (req, res) => {
  try {
    // Log incoming request
    console.log("Incoming request body:", JSON.stringify(req.body, null, 2));

    // Validate API key
    if (!MISTRAL_API_KEY) {
      console.error("Mistral API key is not configured");
      return res.status(500).json({
        error: "Server configuration error: Mistral API key is missing",
      });
    }

    // Validate request body
    if (!req.body.messages || !Array.isArray(req.body.messages)) {
      console.error(
        "Invalid request format: messages array is missing or invalid"
      );
      return res.status(400).json({
        error: "Invalid request format. Messages array is required.",
      });
    }

    console.log("Making request to Mistral API...");
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      // Updated endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: req.body.messages,
      }),
    });

    console.log("Mistral API response status:", response.status);

    const responseData = await response.json();
    console.log("Mistral API response:", JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      throw new Error(
        responseData?.error?.message ||
          `Mistral API error: ${response.status} ${response.statusText}`
      );
    }

    res.json(responseData);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({
      error: error.message || "Internal server error",
      timestamp: new Date().toISOString(),
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Mistral API Key present:", !!MISTRAL_API_KEY);
});
