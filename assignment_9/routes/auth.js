const express = require('express');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const { requireAuth, redirectIfAuth } = require('../middleware/auth');

const router = express.Router();

// Used so a missing username takes about as long as a wrong password.
const DUMMY_HASH = bcrypt.hashSync('dummy-password', 12);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    res.status(429).render('login', {
      error: 'Too many attempts. Please try again in 15 minutes.',
      username: '',
    }),
});

router.get('/', (req, res) => {
  res.redirect(req.session.user ? '/dashboard' : '/login');
});

// ---------- Login ----------
router.get('/login', redirectIfAuth, (req, res) => {
  res.render('login', { error: null, username: '' });
});

router.post('/login', redirectIfAuth, loginLimiter, async (req, res, next) => {
  try {
    const username = String(req.body.username || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!username || !password) {
      return res.status(400).render('login', {
        error: 'Please enter both username and password.',
        username,
      });
    }

    const user = await User.findOne({ username });
    const ok = user
      ? await user.comparePassword(password)
      : await bcrypt.compare(password, DUMMY_HASH);

    if (!user || !ok) {
      // One generic message so attackers can't tell which part was wrong.
      return res.status(401).render('login', {
        error: 'Invalid username or password.',
        username,
      });
    }

    // New session ID on login prevents session fixation.
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.user = { id: user._id.toString(), username: user.username };
      req.session.save((err2) => {
        if (err2) return next(err2);
        res.redirect('/dashboard');
      });
    });
  } catch (err) {
    next(err);
  }
});

// ---------- Register ----------
router.get('/register', redirectIfAuth, (req, res) => {
  res.render('register', { errors: [], username: '' });
});

router.post('/register', redirectIfAuth, async (req, res, next) => {
  const username = String(req.body.username || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const confirmPassword = String(req.body.confirmPassword || '');
  const errors = [];

  if (password.length < 8) errors.push('Password must be at least 8 characters.');
  if (password.length > 72) errors.push('Password must be at most 72 characters.');
  if (password !== confirmPassword) errors.push('Passwords do not match.');

  if (errors.length === 0) {
    try {
      await User.create({ username, password });
      req.session.flash = { type: 'success', message: 'Account created. Please log in.' };
      return res.redirect('/login');
    } catch (err) {
      if (err.code === 11000) errors.push('That username is already taken.');
      else if (err.name === 'ValidationError')
        errors.push(...Object.values(err.errors).map((e) => e.message));
      else return next(err);
    }
  }
  res.status(400).render('register', { errors, username });
});

// ---------- Dashboard ----------
router.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard');
});

// ---------- Logout (POST so it can't be triggered by a plain link/image) ----------
router.post('/logout', requireAuth, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;
