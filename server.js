import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// endpoint
app.post("/ask", async (req, res) => {
  try {
    console.time("AI");
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ error: "ask me to help you with anything" });
    }
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        // messages: [
        //     { role: "system", content: "You are a helpful assistant that can answer questions and help with tasks." },
        //     { role: "user", content: question },
        // ],
        messages: [
          {
            role: "system",
            content: "You are a backend teacher. Answer briefly in 3 bullet points only.",
          },
          { role: "user", content: question },
        ],
    });
    res.json({
        answer: response.choices[0].message.content,
        tokens: response.usage.total_tokens,
        model: response.model
    });
    console.log("response is : ",response);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
}
console.timeEnd("AI");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});