const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
require("dotenv").config();

// Access your API key as an environment variable (see "Set up your API key" above)
const api = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(api);

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post("/generate-colors", async (req, res) => {
  const { color } = req.body;
  console.log(color);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    const msg = `Generate 5 hex color codes  with their code for ${color} tone proved only colors code 5 i want your message to be only like code of colors should no be any other information`;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = await response.text(); // Extract the text content from the response
    console.log(text);
    res.json({ colors: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/generate", (req, res) => {
  const colors = "#f4a460 #f5deb3 #ffd700 #90ee90 #708090 \n";
  res.json({ colors });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
