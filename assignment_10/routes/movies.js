const express = require('express');
const mongoose = require('mongoose');
const Movie = require('../models/Movie');

const router = express.Router();

// Query values can arrive as arrays/objects (?genre[$ne]=x), so only accept plain strings
const asString = (v) => (typeof v === 'string' ? v.trim() : '');
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Stop early with a clear message when MongoDB is not reachable
function requireDb(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).render('error', {
      title: 'Database unavailable',
      heading: 'We can’t reach the movie database',
      message: 'The server could not connect to MongoDB. Check that MongoDB is running and that MONGODB_URI in your .env file is correct, then reload this page.'
    });
  }
  next();
}

// All movies, with optional ?q=<name> search and ?genre=<genre> filter
router.get('/', requireDb, async (req, res, next) => {
  try {
    const q = asString(req.query.q).slice(0, 100);
    const genre = asString(req.query.genre);

    const filter = {};
    if (q) filter.movieName = { $regex: escapeRegex(q), $options: 'i' };
    if (genre) filter.genre = genre;

    const [movies, genres, totalInDb] = await Promise.all([
      Movie.find(filter).sort({ rating: -1, movieName: 1 }).lean(),
      Movie.distinct('genre'),
      Movie.estimatedDocumentCount()
    ]);

    res.render('index', {
      title: 'Movies',
      movies,
      genres: genres.sort(),
      q,
      activeGenre: genre,
      totalInDb
    });
  } catch (err) {
    next(err);
  }
});

// Add-movie form (must be declared before /movies/:movieId)
router.get('/movies/new', requireDb, (req, res) => {
  res.render('new', { title: 'Add a movie', values: {}, errors: [] });
});

router.post('/movies', express.urlencoded({ extended: false }), requireDb, async (req, res, next) => {
  const b = req.body || {};
  const num = (v) => (asString(v) === '' ? undefined : Number(v));
  const values = {
    movieName: asString(b.movieName),
    director: asString(b.director),
    genre: asString(b.genre),
    releaseYear: asString(b.releaseYear),
    language: asString(b.language),
    duration: asString(b.duration),
    rating: asString(b.rating),
    description: asString(b.description),
    posterUrl: asString(b.posterUrl)
  };

  if (values.posterUrl && !/^(https?:\/\/|\/)/.test(values.posterUrl)) {
    return res.status(400).render('new', {
      title: 'Add a movie', values,
      errors: ['Poster image URL must start with http://, https:// or /']
    });
  }

  try {
    const last = await Movie.findOne().sort({ movieId: -1 }).select('movieId').lean();
    const movie = await Movie.create({
      movieId: (last ? last.movieId : 0) + 1,
      movieName: values.movieName,
      director: values.director,
      genre: values.genre,
      releaseYear: num(values.releaseYear),
      language: values.language,
      duration: num(values.duration),
      rating: num(values.rating),
      description: values.description,
      posterUrl: values.posterUrl || '/posters/placeholder.svg'
    });
    res.redirect('/movies/' + movie.movieId);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).render('new', {
        title: 'Add a movie', values,
        errors: Object.values(err.errors).map((e) =>
          e.name === 'CastError' ? `${e.path} must be a number` : e.message)
      });
    }
    next(err);
  }
});

// Single movie
router.get('/movies/:movieId', requireDb, async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    const movie = Number.isInteger(movieId) ? await Movie.findOne({ movieId }).lean() : null;

    if (!movie) {
      return res.status(404).render('error', {
        title: 'Movie not found',
        heading: 'That movie isn’t in the database',
        message: 'It may have been removed, or the link is wrong.'
      });
    }
    res.render('movie', { title: movie.movieName, movie });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
