const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function enrichTask(title, description) {
  const prompt = `
Analyze this TaskMatrix task.

Title: ${title}

Description: ${description}

Choose one simple category such as:
Development, Design, Testing, Documentation, Meeting, Planning, or Other.

Also create a short summary of the task.

Return only the requested structured data.
`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description: "The category of the task"
          },
          summary: {
            type: "string",
            description: "A short summary of the task"
          }
        },
        required: ["category", "summary"]
      }
    }
  });

  return JSON.parse(interaction.output_text);
}

module.exports = enrichTask;