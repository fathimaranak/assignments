const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
    profile: {
        name: { type: String, required: true },
        role: { type: String, default: '' },
        logoName: { type: String, default: '' }
    },
    home: {
        greeting: { type: String, default: '' },
        heading: { type: String, default: '' },
        intro: { type: String, default: '' },
        aboutButton: { type: String, default: 'About Me' },
        contactButton: { type: String, default: 'Contact Me' }
    },
    about: {
        eyebrow: { type: String, default: 'ABOUT ME' },
        heading: { type: String, default: 'Who I Am' },
        paragraphs: [{ type: String }],
        skillsHeading: { type: String, default: 'Technical Skills' },
        skills: [{ type: String }],
        educationHeading: { type: String, default: 'Education' },
        education: [{
            qualification: { type: String, required: true },
            institution: { type: String, required: true },
            details: { type: String, default: '' }
        }],
        careerGoalHeading: { type: String, default: 'Career Goal' },
        careerGoal: { type: String, default: '' }
    },
    contact: {
        eyebrow: { type: String, default: 'GET IN TOUCH' },
        heading: { type: String, default: "Let's Connect" },
        intro: { type: String, default: '' },
        cards: [{
            title: { type: String, required: true },
            description: { type: String, default: '' },
            linkText: { type: String, default: '' },
            linkUrl: { type: String, default: '' }
        }]
    },
    footer: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Website', websiteSchema);
