require('dotenv').config();

const mongoose = require('mongoose');
const Resume = require('./models/Resume');

const resumeData = {
    profile: {
        name: 'FATHIMA RANA K',
        github: 'https://github.com/fathimaranak',
        linkedin: 'https://www.linkedin.com/in/fathima-rana-k'
    },
    summary: 'Software developer with hands-on experience across mobile and web development, including a completed React Native internship and academic projects in Flutter, PHP/MySQL, and JavaScript. Comfortable working across the stack, from building responsive UIs to implementing backend logic and database integration. Currently pursuing further study in software application development.',
    education: [
        {
            qualification: 'Master of Vocational Studies in Software Application Development',
            institution: 'CUSAT (Cochin University of Science and Technology)',
            year: '2026 - Present'
        },
        {
            qualification: 'Bachelor of Vocational Studies in Software Development',
            institution: 'Farook College (Autonomous), University of Calicut',
            year: '2023 - 2026',
            details: 'CGPA: 8.9'
        }
    ],
    internship: [
        {
            role: 'React Native Developer Intern',
            company: 'Vytbyt Tech LLP',
            location: 'Kozhikode, Kerala',
            duration: 'Jan 2026 - Mar 2026',
            responsibilities: [
                'Developed frontend screens in React Native based on provided design specifications.',
                'Collaborated within a team environment to deliver assigned features within project timelines.'
            ]
        }
    ],
    skills: {
        languages: ['JavaScript', 'Dart', 'PHP', 'Python'],
        mobileWeb: ['React Native', 'Flutter', 'HTML', 'CSS'],
        databases: ['MySQL', 'Firebase', 'SQL'],
        tools: ['VS Code', 'Android Studio', 'XAMPP', 'GitHub']
    },
    projects: [
        {
            name: 'Blogo — Blog Website',
            technologies: ['HTML', 'CSS', 'PHP', 'MySQL', 'XAMPP'],
            description: [
                'Built a full-stack blogging platform with a PHP/MySQL backend.',
                'Designed a responsive interface for reading and managing blog content.'
            ]
        },
        {
            name: 'CodeNest — Online Course Platform (Frontend)',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            description: [
                'Developed a responsive frontend for a course-sharing platform.'
            ]
        },
        {
            name: 'Groco — E-commerce Platform for Vegetables (Frontend)',
            technologies: ['HTML', 'CSS'],
            description: [
                'Designed a responsive UI for an online vegetable store.'
            ]
        },
        {
            name: 'RecipeHub — Full Stack Recipe Search Mobile App',
            technologies: ['React Native', 'Expo', 'Node.js', 'Express', 'PostgreSQL', 'Drizzle ORM', 'Clerk'],
            description: [
                'Developed a full-stack mobile application for browsing and searching recipes.',
                'Built REST APIs with Node.js and Express and integrated PostgreSQL using Drizzle ORM.',
                'Implemented user authentication, recipe search, and favorite recipe management.'
            ]
        }
    ],
    leadership: [
        {
            title: 'Event Coordinator, Idea Pitching — "Skilla" National Tech Fest, Farook College',
            date: 'August 2025',
            details: [
                'Coordinated the ideathon event at Skilla, a national-level tech fest.',
                'Coordinated end-to-end logistics for the idea pitching segment, including scheduling, judging panel coordination, and participant onboarding.',
                'Gained experience in public speaking, cross-team coordination, and problem-solving under time pressure.'
            ]
        }
    ]
};

async function seedDatabase() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing. Create a .env file first.');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        await Resume.findOneAndUpdate({}, resumeData, {
            upsert: true,
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true
        });

        console.log('Resume data inserted/updated successfully.');
    } catch (error) {
        console.error('Seeding failed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedDatabase();
