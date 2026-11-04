const express = require('express');
const Website = require('../models/Website');

const router = express.Router();

// GET /api/website - fetch portfolio information from MongoDB
router.get('/', async (req, res) => {
  try {
    const website = await Website.findOne().lean();

    if (!website) {
      return res.status(404).json({ message: 'Website information not found.' });
    }

    res.status(200).json(website);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch website information.', error: error.message });
  }
});

module.exports = router;
