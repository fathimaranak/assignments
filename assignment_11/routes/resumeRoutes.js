const express = require('express');
const Resume = require('../models/Resume');

const router = express.Router();

// GET /api/resume - fetch the resume stored in MongoDB
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne().lean();

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found in database.' });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch resume.', error: error.message });
  }
});

module.exports = router;
