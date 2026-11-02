require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Website = require('./models/Website');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

async function getWebsite(req, res, next) {
    try {
        const website = await Website.findOne().lean();
        if (!website) {
            return res.status(404).send('Website content not found. Run "npm run seed" first.');
        }
        res.locals.website = website;
        next();
    } catch (error) {
        next(error);
    }
}

app.get('/', getWebsite, (req, res) => {
    res.render('home', { activePage: 'home' });
});

app.get('/about', getWebsite, (req, res) => {
    res.render('about', { activePage: 'about' });
});

app.get('/contact', getWebsite, (req, res) => {
    res.render('contact', { activePage: 'contact' });
});

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('Something went wrong while loading the website.');
});

async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing. Create a .env file.');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Personal website running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error.message);
        process.exit(1);
    }
}

startServer();
