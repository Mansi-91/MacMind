const { askGemini } = require("../services/ai/gemini");
const { getAllFiles } = require("../models/fileModel");

const aiSearch = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        error: "Query is required",
      });
    }

    const files = getAllFiles();

    if (files.length === 0) {
      return res.json([]);
    }

    const prompt = `
You are an AI assistant for a desktop file manager called MacMind.

Below is the list of indexed files.

${JSON.stringify(files, null, 2)}

The user asked:

"${query}"

Your task:
1. Find the 5 most relevant files.
2. Explain why each file matches.
3. Return ONLY valid JSON.
4. Do NOT use markdown.
5. Do NOT wrap the JSON inside \`\`\`.

Return exactly in this format:

[
  {
    "name": "Resume.pdf",
    "path": "/Users/Mansi/Documents/Resume.pdf",
    "reason": "This file most likely contains your resume."
  }
]
`;

    const response = await askGemini(prompt);

    let parsedResult;

    try {
      // Remove markdown if Gemini accidentally returns it
      const cleaned = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      parsedResult = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON Parse Error:", err);

      parsedResult = [
        {
          name: "AI Response",
          path: "",
          reason: response,
        },
      ];
    }

    res.status(200).json(parsedResult);
  } catch (err) {
    console.error("AI Search Error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  aiSearch,
};