const express = require('express');
const router = express.Router();
const { getApiResponse } = require('../controllers/apiController');

router.get('/external', getApiResponse);

module.exports = router;
