import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [website, setWebsite] = useState(null);
  const [page, setPage] = useState(window.location.hash.replace('#', '') || 'home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await axios.get(`${API_URL}/website`);
        setWebsite(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load website information. Check the backend and MongoDB connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchWebsite();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const nextPage = window.location.hash.replace('#', '') || 'home';
      if (['home', 'about', 'contact'].includes(nextPage)) setPage(nextPage);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (nextPage) => setPage(nextPage);

  if (loading) return <main className="status-card">Loading personal website...</main>;
  if (error) return <main className="status-card error"><h2>Unable to load website</h2><p>{error}</p></main>;
  if (!website) return null;

  return (
    <>
      <Navbar brand={website.brand || website.name} page={page} onNavigate={navigate} />

      {page === 'home' && (
        <section className="home">
          <div className="home-content">
            <p className="small-text">HELLO, I'M</p>
            <h1>{website.name}</h1>
            <h2>{website.role}</h2>
            <p className="intro">{website.intro}</p>
            <div className="buttons">
              <a href="#about" className="btn" onClick={() => navigate('about')}>About Me</a>
              <a href="#contact" className="btn btn-outline" onClick={() => navigate('contact')}>Contact Me</a>
            </div>
          </div>
        </section>
      )}

      {page === 'about' && (
        <section className="page-section">
          <div className="page-content">
            <p className="small-text">ABOUT ME</p>
            <h1>{website.aboutTitle || 'Who I Am'}</h1>

            {website.aboutParagraphs?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className="about-block">
              <h2>Technical Skills</h2>
              <div className="skills">
                {website.skills?.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>

            <div className="about-block">
              <h2>Education</h2>
              {website.education?.map((item, index) => (
                <div className="education-card" key={`${item.degree}-${index}`}>
                  <h3>{item.degree}</h3>
                  <p>{item.institution}</p>
                  {item.period && <p>{item.period}</p>}
                </div>
              ))}
            </div>

            <div className="about-block">
              <h2>Career Goal</h2>
              <p>{website.careerGoal}</p>
            </div>
          </div>
        </section>
      )}

      {page === 'contact' && (
        <section className="page-section contact-section">
          <div className="page-content">
            <p className="small-text">GET IN TOUCH</p>
            <h1>Let's Connect</h1>
            <p className="contact-intro">{website.contactIntro}</p>
            <div className="contact-container">
              {website.contacts?.map((contact, index) => (
                <div className="contact-card" key={`${contact.title}-${index}`}>
                  <h3>{contact.title}</h3>
                  <p>{contact.description}</p>
                  {contact.url && contact.linkText && (
                    <a href={contact.url} target="_blank" rel="noreferrer" className="contact-link">
                      {contact.linkText}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer><p>{website.footer}</p></footer>
    </>
  );
}

export default App;
