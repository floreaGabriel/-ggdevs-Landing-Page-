import React from 'react';
import './Landing.css';

function Landing() {
  return (
    <div className="landing-container">
      <section className="hero">
        <h1>Welcome to Our Cluster</h1>
        <p>Fast. Secure. Scalable.</p>
        <button>Get Started</button>
      </section>
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>High Availability</li>
          <li>Fast Deployment</li>
          <li>Easy Management</li>
        </ul>
      </section>
      <section className="cta">
        <p>Ready to join?</p>
        <button>Contact Us</button>
      </section>
    </div>
  );
}

export default Landing;

