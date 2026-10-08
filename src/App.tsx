import React from 'react';
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
    <div className="min-h-screen bg-[#1A1413] text-white flex flex-col selection:bg-[#AB2020] selection:text-white">
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
  );
};

export default App;
