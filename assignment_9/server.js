require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { MONGODB_URI, SESSION_SECRET, PORT = 3000, NODE_ENV } = process.env;
if (!MONGODB_URI || !SESSION_SECRET) {
  console.error('Missing MONGODB_URI or SESSION_SECRET. Copy .env.example to .env and fill it in.');
  process.exit(1);
}

const app = express();
if (NODE_ENV === 'production') app.set('trust proxy', 1);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: NODE_ENV === 'production', // requires HTTPS in production
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
    },
  })
);

// Make the logged-in user and one-time flash messages available to every view.
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.flash = req.session.flash || null;
  delete req.session.flash;
  next();
});

app.use('/', require('./routes/auth'));

app.use((req, res) => res.status(404).send('Page not found'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong.');
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
