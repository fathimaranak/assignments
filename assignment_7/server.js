require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Resume = require('./models/Resume');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const resume = await Resume.findOne().lean();

        if (!resume) {
            return res.status(404).send(
                'Resume data was not found. Run "npm run seed" to add the sample resume.'
            );
        }

        res.render('resume', { resume });
    } catch (error) {
        console.error('Error loading resume:', error);
        res.status(500).send('Unable to load the resume. Please try again later.');
    }
});

async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing. Create a .env file first.');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Resume app running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Could not start the application:', error.message);
        process.exit(1);
    }
}

startServer();
