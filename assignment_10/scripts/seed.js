require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const movies = require('../data/movies.json');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/MovieDB';

(async () => {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    await Movie.deleteMany({});
    const inserted = await Movie.insertMany(movies);
    console.log(`Seeded ${inserted.length} movies into "${mongoose.connection.name}.Movies"`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
