require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Resume = require('./models/Resume');
const resumeData = require('./data/resumeData');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Resume API is running' });
});

app.use('/api/resume', resumeRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Add starter data only if the collection is empty.
  const existingResume = await Resume.findOne();
  if (!existingResume) {
    await Resume.create(resumeData);
    console.log('Initial resume data inserted into MongoDB');
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
