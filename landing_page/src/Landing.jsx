import React from 'react';
import Header from './components/Header/Header';
import Terminal from './components/Terminal/Terminal';
import Footer from './components/Footer/Footer';
import './Landing.css';

function Landing() {
  return (
    <div className="landing-container">
      <Header />
      <main className="main-content">
        <Terminal />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;

