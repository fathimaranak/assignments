const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    movieId:     { type: Number, required: true, unique: true },
    movieName:   { type: String, required: true, trim: true, index: true },
    director:    { type: String, required: true, trim: true },
    genre:       { type: String, required: true, trim: true, index: true },
    releaseYear: { type: Number, required: true, min: 1888 },
    language:    { type: String, required: true, trim: true },
    duration:    { type: Number, required: true, min: 1 },          // minutes
    rating:      { type: Number, required: true, min: 0, max: 10 }, // out of 10
    description: { type: String, required: true, trim: true },
    posterUrl:   { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

// Collection name is forced to "Movies" as required
module.exports = mongoose.model('Movie', movieSchema, 'Movies');
