const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  role: String,
  intro: String,
  aboutTitle: String,
  aboutParagraphs: [String],
  skills: [String],
  education: [{
    degree: String,
    institution: String,
    period: String
  }],
  careerGoal: String,
  contactIntro: String,
  contacts: [{
    title: String,
    description: String,
    linkText: String,
    url: String
  }],
  location: String,
  currentFocus: String,
  footer: String
}, { timestamps: true });

module.exports = mongoose.model('Website', websiteSchema);
