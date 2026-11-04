import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Section from './components/Section';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`${API_URL}/resume`);
        setResume(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Could not load resume. Check that the backend and MongoDB are running.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return <main className="status-card">Loading resume...</main>;
  }

  if (error) {
    return (
      <main className="status-card error">
        <h2>Unable to load resume</h2>
        <p>{error}</p>
        <p>Start the backend server and check your environment variables.</p>
      </main>
    );
  }

  if (!resume) return null;

  return (
    <main className="page">
      <article className="resume">
        <header className="resume-header">
          <div className="eyebrow">{resume.title || 'RESUME'}</div>
          <h1>{resume.name}</h1>
          <div className="contact">
            {[resume.location, resume.email, resume.phone]
              .filter(Boolean)
              .map((item) => <span key={item}>{item}</span>)}
            {resume.links?.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </header>

        <Section title="Professional Summary">
          <p className="summary">{resume.summary}</p>
        </Section>

        <Section title="Education">
          {resume.education?.map((item, index) => (
            <div className="entry" key={`${item.degree}-${index}`}>
              <div className="entry-heading">
                <h3>{item.degree}</h3>
                <span className="period">{item.period}</span>
              </div>
              <p className="muted">{item.institution}</p>
              {item.details?.map((detail) => <p key={detail}>{detail}</p>)}
            </div>
          ))}
        </Section>

        <Section title="Internship Experience">
          {resume.experience?.map((item, index) => (
            <div className="entry" key={`${item.company}-${index}`}>
              <div className="entry-heading">
                <h3>{item.role}</h3>
                <span className="period">{item.period}</span>
              </div>
              <p className="muted">{item.company}{item.location ? ` · ${item.location}` : ''}</p>
              <ul>
                {item.responsibilities?.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Technical Skills">
          <div className="skills-grid">
            {resume.skills?.map((skill) => (
              <div className="skill-row" key={skill.category}>
                <strong>{skill.category}</strong>
                <div className="chips">
                  {skill.items?.map((item) => <span className="chip" key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <div className="projects-grid">
            {resume.projects?.map((project, index) => (
              <div className="project" key={`${project.name}-${index}`}>
                <h3>{project.name} <span>— {project.type}</span></h3>
                <p className="tech"><strong>Technologies:</strong> {project.technologies?.join(', ')}</p>
                <ul>
                  {project.description?.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Leadership & Extracurricular Experience">
          {resume.activities?.map((item, index) => (
            <div className="entry" key={`${item.event}-${index}`}>
              <div className="entry-heading">
                <h3>{item.role}</h3>
                <span className="period">{item.period}</span>
              </div>
              <p className="muted">{item.event}</p>
              <ul>
                {item.description?.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          ))}
        </Section>

        <footer>Built with React · Express · MongoDB · Axios</footer>
      </article>
    </main>
  );
}

export default App;
