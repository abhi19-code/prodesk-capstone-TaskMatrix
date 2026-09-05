const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required"
      });
    }

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt
    });

    res.json({
      response: interaction.output_text
    });
  } catch (error) {
    console.log("AI request error:", error);

    res.status(500).json({
      message: "AI request failed"
    });
  }
});

module.exports = router;