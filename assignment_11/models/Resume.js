const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  label: String,
  url: String
}, { _id: false });

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  period: String,
  details: [String]
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  location: String,
  period: String,
  responsibilities: [String]
}, { _id: false });

const skillSchema = new mongoose.Schema({
  category: String,
  items: [String]
}, { _id: false });

const projectSchema = new mongoose.Schema({
  name: String,
  type: String,
  technologies: [String],
  description: [String]
}, { _id: false });

const activitySchema = new mongoose.Schema({
  role: String,
  event: String,
  period: String,
  description: [String]
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  email: String,
  phone: String,
  location: String,
  links: [linkSchema],
  summary: String,
  education: [educationSchema],
  experience: [experienceSchema],
  skills: [skillSchema],
  projects: [projectSchema],
  activities: [activitySchema]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
