import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Practice Areas', path: '/practice-areas' },
    { name: 'Team', path: '/team' },
    { name: 'Insights', path: '/insights' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out border-b border-transparent ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-gray-100' 
          : 'bg-white/0 backdrop-blur-sm py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex flex-col group relative z-50">
            <span className={`font-serif text-xl md:text-2xl font-bold leading-tight transition-colors duration-300 ${
              isOpen ? 'text-gray-900' : (isScrolled ? 'text-primary' : 'text-white mix-blend-difference')
            }`}>
              Wachira Wekhomba Aim
            </span>
            <span className={`font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
              isOpen ? 'text-gray-500' : (isScrolled ? 'text-secondary' : 'text-white/80 mix-blend-difference')
            }`}>
              & Associates Advocates
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium transition-colors py-2 group ${isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white mix-blend-difference'}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 ${isScrolled ? 'bg-primary' : 'bg-white'}`}></span>
              </Link>
            ))}
            
            <div className={`h-6 w-px mx-2 ${isScrolled ? 'bg-gray-200' : 'bg-white/20'}`}></div>
            
            <Link
              to="/consultation"
              className="bg-primary text-white px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-primary/90 transition-all duration-300 border border-primary shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4 z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-transform active:scale-95 ${
                isOpen ? 'text-gray-900' : (isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-white/80 mix-blend-difference')
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 top-0 bg-white z-40 pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-3xl font-serif font-bold ${
                      location.pathname === link.path ? 'text-primary' : 'text-gray-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-8 space-y-4 border-t border-gray-100 mt-4"
              >
                <Link
                  to="/consultation"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-primary text-white px-5 py-4 rounded-sm text-base font-medium hover:bg-primary/90 transition-colors shadow-lg"
                >
                  Book Consultation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
