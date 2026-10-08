import React, { useState, useEffect } from 'react';
import { Menu, X, Megaphone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Cobertura', href: '#cobertura' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1A1413]/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10 py-3.5'
          : 'bg-[#1A1413]/70 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Horizontal Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#009EE2] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#312782] to-[#AB2020] flex items-center justify-center shadow-md shadow-[#312782]/40 group-hover:scale-105 transition-transform duration-200">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-sora font-extrabold text-lg sm:text-xl tracking-tight text-white leading-none">
                PUBLICIDAD TOTAL
              </span>
              <span className="font-sora font-bold text-xs tracking-widest text-[#009EE2] flex items-center gap-1.5 mt-0.5">
                Q&R <span className="text-[#93C01F] text-[10px]">●</span>{' '}
                PENÍNSULA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-200 hover:text-[#009EE2] transition-colors duration-200 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#009EE2] to-[#93C01F] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#009EE2]"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-white/10 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
