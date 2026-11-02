require('dotenv').config();

const mongoose = require('mongoose');
const Website = require('./models/Website');

const websiteData = {
    profile: {
        name: 'Fathima Rana',
        role: 'React Developer | React Native Developer',
        logoName: 'Fathima Rana'
    },
    home: {
        greeting: "HELLO, I'M",
        heading: 'Fathima Rana',
        intro: 'M.Voc Software Applications student at CUSAT with a strong interest in building modern web and mobile applications.',
        aboutButton: 'About Me',
        contactButton: 'Contact Me'
    },
    about: {
        eyebrow: 'ABOUT ME',
        heading: 'Who I Am',
        paragraphs: [
            'I am an M.Voc Software Applications student at Cochin University of Science and Technology (CUSAT) with a strong interest in building modern web and mobile applications.',
            'My primary focus is React, React Native, JavaScript, TypeScript, and Node.js. I enjoy turning ideas into intuitive and scalable applications while continuously improving my development skills through hands-on projects.',
            'I have experience working with Git and modern development tools. I enjoy learning new technologies and solving real-world problems through software.'
        ],
        skillsHeading: 'Technical Skills',
        skills: ['React', 'React Native', 'JavaScript', 'TypeScript', 'Node.js', 'Git'],
        educationHeading: 'Education',
        education: [{
            qualification: 'M.Voc Software Applications',
            institution: 'Cochin University of Science and Technology (CUSAT)',
            details: ''
        }],
        careerGoalHeading: 'Career Goal',
        careerGoal: 'I am currently seeking software development internship opportunities where I can contribute to meaningful projects, collaborate with experienced developers, and continue growing as a software developer.'
    },
    contact: {
        eyebrow: 'GET IN TOUCH',
        heading: "Let's Connect",
        intro: 'I am open to software development internship opportunities, meaningful projects, and opportunities to collaborate with other developers.',
        cards: [
            {
                title: 'LinkedIn',
                description: 'Connect with me on LinkedIn for professional opportunities and collaboration.',
                linkText: 'View LinkedIn Profile',
                linkUrl: 'https://www.linkedin.com/in/fathimaranak/'
            },
            {
                title: 'Location',
                description: 'Kozhikode Taluka, Kerala, India'
            },
            {
                title: 'Current Focus',
                description: 'React, React Native, JavaScript, TypeScript, Node.js and modern web and mobile development.'
            }
        ]
    },
    footer: '© 2026 Fathima Rana. All Rights Reserved.'
};

async function seedDatabase() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing. Create a .env file.');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        await Website.findOneAndUpdate({}, websiteData, {
            upsert: true,
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true
        });

        console.log('Website content inserted/updated successfully.');
    } catch (error) {
        console.error('Database seeding failed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedDatabase();
