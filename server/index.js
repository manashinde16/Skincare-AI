// Entry point for Express app
const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/api');
const analyzeRoutes = require('./routes/analyze');
const errorHandler = require('./middlewares/errorHandler');
const { apiKey } = require('./config/env');

app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/api/analyze', analyzeRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
