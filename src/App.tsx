import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Coverage } from './components/Coverage';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface dark:bg-brand-dark text-on-surface dark:text-white transition-colors duration-300 flex flex-col selection:bg-brand-crimson selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Services />
          <Coverage />
          <Contact />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </ThemeProvider>
  );
};

export default App;
