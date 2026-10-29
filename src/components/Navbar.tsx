import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

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
          ? 'bg-white backdrop-blur-md shadow-md shadow-black/5 border-b border-gray-200/80 py-3'
          : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-cyan rounded-lg p-1 transition-transform duration-200"
          >
            <img
              src={getAssetUrl(
                isScrolled
                  ? '/images/h-logo-header.webp'
                  : '/images/h-logo-header-dark.webp'
              )}
              alt="Publicidad Total Q&R - Agencia BTL y Activaciones de Marca"
              width="463"
              height="124"
              className={` ${isScrolled ? 'h-11 sm:h-14' : 'h-11 sm:h-14'} w-auto object-contain group-hover:scale-105 transition-transform duration-300`}
            />
          </a>
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm lg:text-base font-manrope font-semibold ${isScrolled ? 'text-gray-700 hover:text-brand-primary' : 'text-white hover:text-brand-cyan'}  transition-colors duration-200 relative group py-1 tracking-wide`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className={`p-2 rounded-lg ${isScrolled ? 'text-gray-900 hover:text-brand-primary hover:bg-gray-100' : 'text-white hover:text-brand-cyan hover:bg-transparent'} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-cyan`}
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden mt-3 pt-3 pb-4  ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-200 rounded-b-2xl' : 'bg-black/30  border border-black/30 rounded-2xl'}  px-2`}
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-manrope font-semibold text-center ${isScrolled ? 'text-gray-700 hover:text-brand-primary hover:bg-gray-100' : 'text-white hover:text-brand-cyan hover:bg-transparent'} transition-colors`}
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
