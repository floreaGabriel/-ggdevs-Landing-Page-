import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Terminal from './components/Terminal/Terminal';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 flex w-full app-main-layout">
        <aside className="app-sidebar">
          <Footer />
        </aside>
        <div className="app-terminal-area">
          <Terminal />
        </div>
      </main>
    </div>

  );
}

export default App;
