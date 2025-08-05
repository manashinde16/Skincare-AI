// Logic to call external API
const axios = require('axios');
const fs = require('fs');
const { apiKey } = require('../config/env');

exports.fetchExternalData = async (apiKey) => {
  // Example API call
  const response = await axios.get('https://external.api/endpoint', {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });
  return response.data;
};

exports.analyzeWithGemini = async (userData, images) => {
  // Build prompt from userData
  const prompt = `User info: ${JSON.stringify(userData)}.`;

  // Prepare image parts for Gemini API
  const imageParts = [];
  for (const key in images) {
    const file = images[key];
    if (file && file.path) {
      // Read file as base64
      const base64 = fs.readFileSync(file.path, { encoding: 'base64' });
      imageParts.push({ inline_data: { mime_type: file.mimetype || 'image/jpeg', data: base64 } });
    }
  }

  // Gemini API expects images as parts in the contents array
  const contents = [
    { parts: [{ text: prompt }] },
    ...imageParts.map(img => ({ parts: [img] }))
  ];

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey,
      { contents }
    );
    return response.data;
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    throw err;
  }
};
