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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex flex-col group">
            <span className="font-serif text-xl md:text-2xl font-bold text-primary leading-tight group-hover:text-secondary transition-colors">
              Wachira Wekhomba Aim
            </span>
            <span className="font-sans text-xs md:text-sm tracking-widest text-secondary uppercase group-hover:text-primary transition-colors">
              & Associates Advocates
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname === link.path ? 'text-primary font-semibold' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-gray-300 mx-2"></div>

            <Link
              to="/portal"
              className="flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              <Lock size={14} className="mr-1" />
              Client Portal
            </Link>

            <Link
              to="/consultation"
              className="bg-primary text-white px-5 py-2 rounded-sm text-sm font-medium hover:bg-primary/90 transition-colors border border-primary shadow-sm hover:shadow-md"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
             <Link
              to="/portal"
              className="flex items-center text-xs font-medium text-secondary hover:text-primary transition-colors"
            >
              <Lock size={14} className="mr-1" />
              Portal
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
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
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-3 text-base font-medium border-l-4 transition-colors ${
                    location.pathname === link.path
                      ? 'border-primary text-primary bg-gray-50'
                      : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-3 space-y-3">
                <Link
                  to="/portal"
                  className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-secondary bg-secondary/5 border border-secondary/20 rounded-sm hover:bg-secondary/10 transition-colors"
                >
                  <Lock size={16} className="mr-2" />
                  Access Client Portal
                </Link>
                <Link
                  to="/consultation"
                  className="block w-full text-center bg-primary text-white px-5 py-3 rounded-sm text-base font-medium hover:bg-primary/90 transition-colors shadow-md"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
