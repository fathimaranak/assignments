require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Website = require('./models/Website');
const websiteData = require('./data/websiteData');
const websiteRoutes = require('./routes/websiteRoutes');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Personal website API is running' });
});

app.use('/api/website', websiteRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Insert initial portfolio data only when the collection is empty.
  const existingWebsite = await Website.findOne();
  if (!existingWebsite) {
    await Website.create(websiteData);
    console.log('Initial website data inserted into MongoDB');
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
