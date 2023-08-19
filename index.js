const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors=require("cors")
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.get('/shayari', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: `Shayari about ${keyword}`,
      max_tokens: 100,
      temperature: 0.5,
      n:10
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // const shayari = response.data.choices[0].text.trim();
    const shayari = response.data.choices;
    res.json({ shayari });
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// app.js
// const express = require('express');
// const axios = require('axios');

// const app = express();
// const PORT = 3000;

// // Replace YOUR_GPT3_API_KEY with your actual OpenAI GPT-3 API key
// const GPT3_API_KEY = 'YOUR_GPT3_API_KEY';

// app.use(express.json());

// app.post('/generate-shayari', async (req, res) => {
//   try {
//     const { keyword } = req.body;

//     // Call the function to generate Shayari using ChatGPT
//     const shayari = await generateShayari(keyword);

//     res.json({ shayari });
//   } catch (error) {
//     console.error('Error generating Shayari:', error.message);
//     res.status(500).json({ error: 'Failed to generate Shayari' });
//   }
// });

// async function generateShayari(keyword) {
//   // Construct the prompt for ChatGPT
//   const prompt = `Write a Shayari on ${keyword}.`;

//   // Call the OpenAI API to generate Shayari
//   const response = await axios.post(
//     'https://api.openai.com/v1/engines/text-davinci-003/completions',
//     {
//       prompt,
//       max_tokens: 100, // Adjust this value to control the length of the generated Shayari
//       api_key: GPT3_API_KEY,
//     }
//   );

//   return response.data.choices[0].text.trim();
// }

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
