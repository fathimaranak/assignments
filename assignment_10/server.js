require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movies');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/MovieDB';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', movieRoutes);

// 404 for unknown URLs
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page not found',
    heading: 'Page not found',
    message: 'The page you asked for doesn’t exist.'
  });
});

// Unexpected errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', {
    title: 'Something went wrong',
    heading: 'Something went wrong',
    message: 'The server hit an unexpected problem while loading this page. Try again in a moment.'
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
connectDB(MONGODB_URI);
