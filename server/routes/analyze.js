const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { analyzeWithGemini } = require('../services/externalApiService');

router.post('/', upload.fields([
  { name: 'front' },
  { name: 'left' },
  { name: 'right' }
]), async (req, res) => {
  try {
    // Gather all fields
    const userData = req.body;
    // Defensive: ensure req.files exists and is an object
    const files = req.files || {};
    const images = {
      front: files['front']?.[0] || null,
      left: files['left']?.[0] || null,
      right: files['right']?.[0] || null,
    };
    // Call Gemini AI service
    const result = await analyzeWithGemini(userData, images);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to analyze' });
  }
});

module.exports = router;
