import React, { Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const Coverage = lazy(() =>
  import('./components/Coverage').then((m) => ({ default: m.Coverage }))
);

const CoverageFallback: React.FC = () => (
  <section
    id="cobertura"
    className="w-full pt-20 lg:pt-24 pb-16 bg-[#99E0FF] text-center flex flex-col items-center justify-center min-h-[580px]"
  >
    <div className="animate-pulse space-y-4 max-w-xl mx-auto px-4 w-full">
      <div className="h-6 w-48 bg-[#092652]/10 rounded-full mx-auto" />
      <div className="h-10 w-80 max-w-full bg-[#092652]/10 rounded-xl mx-auto" />
      <div className="h-64 w-[760px] max-w-full bg-[#092652]/5 rounded-2xl mx-auto mt-6" />
    </div>
  </section>
);

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 flex flex-col selection:bg-brand-crimson selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Suspense fallback={<CoverageFallback />}>
          <Coverage />
        </Suspense>
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
