import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
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

  const headerLogoUrl =
    theme === 'dark'
      ? '/images/h-logo-header-dark.webp'
      : '/images/h-logo-header.webp';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-brand-dark/95 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/30 border-b border-gray-200/80 dark:border-white/10 py-3'
          : 'bg-white dark:bg-brand-dark/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
          {/* Logo from Stitch */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-cyan rounded-lg p-1 transition-transform duration-200"
          >
            <img
              src={headerLogoUrl}
              alt="Publicidad Total Q&R"
              className="h-11 sm:h-14 w-auto object-contain brightness-100 dark:brightness-110 group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Desktop Navigation Links & Right-aligned Theme Toggle */}
          <div className="hidden md:flex items-center">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-manrope font-semibold text-gray-700 dark:text-gray-200 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors duration-200 relative group py-1 tracking-wide"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-cyan transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Dark / Light Mode Toggle Button (Far Right) */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2.5 ml-3 rounded-xl hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-gray-200 transition-all duration-200"
              aria-label={
                theme === 'dark'
                  ? 'Cambiar a modo claro'
                  : 'Cambiar a modo oscuro'
              }
              title={
                theme === 'dark'
                  ? 'Cambiar a modo claro'
                  : 'Cambiar a modo oscuro'
              }
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-brand-lime hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-brand-primary hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Mobile Right Actions (Theme Toggle + Menu Button) */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-brand-lime" />
              ) : (
                <Moon className="w-5 h-5 text-brand-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-brand-dark/95 backdrop-blur-xl rounded-b-2xl px-2 shadow-xl">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-manrope font-semibold text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
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
