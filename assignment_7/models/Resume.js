const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    qualification: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, default: '' },
    details: { type: String, default: '' }
}, { _id: false });

const internshipSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: '' },
    duration: { type: String, default: '' },
    responsibilities: [{ type: String }]
}, { _id: false });

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, default: '' },
    technologies: [{ type: String }],
    description: [{ type: String }]
}, { _id: false });

const resumeSchema = new mongoose.Schema({
    profile: {
        name: { type: String, required: true },
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' }
    },
    summary: { type: String, default: '' },
    education: [educationSchema],
    internship: [internshipSchema],
    skills: {
        languages: [{ type: String }],
        mobileWeb: [{ type: String }],
        databases: [{ type: String }],
        tools: [{ type: String }]
    },
    projects: [projectSchema],
    leadership: [{
        title: { type: String, required: true },
        date: { type: String, default: '' },
        details: [{ type: String }]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
