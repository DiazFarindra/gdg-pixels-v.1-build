import { useState, useEffect, useCallback } from 'react';
import { PixelBox } from '.';

const navLinks = [
  { href: '#about', text: 'Tentang', color: 'blue' },
  { href: '#register', text: 'Cara Daftar', color: 'green' },
  { href: '#timeline', text: 'Timeline', color: 'red' },
  { href: '#faq', text: 'FAQ', color: 'yellow' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
    {/* Fixed Navbar Container */}
    <div className="fixed top-0 left-0 right-0 z-[9999]" style={{ height: '80px' }}>
      {/* Background Layer */}
      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      />
      
      {/* Content Layer */}
      <div className="relative h-full">
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Desktop Navigation - Left Side */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navLinks.slice(0, 2).map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
                  onClick={closeMenu}
                >
                  <PixelBox 
                    color={link.color as 'blue' | 'green' | 'red' | 'yellow'}
                    className="text-sm font-bold px-3 py-2 text-[#1e1e1e]"
                  >
                    {link.text}
                  </PixelBox>
                </a>
              ))}
            </div>

            {/* Spacer for balanced layout */}
            <div className="flex-shrink-0 w-12 h-12 lg:block hidden"></div>

            {/* Desktop Navigation - Right Side */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navLinks.slice(2, 4).map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
                  onClick={closeMenu}
                >
                  <PixelBox 
                    color={link.color as 'blue' | 'green' | 'red' | 'yellow'}
                    className="text-sm font-bold px-3 py-2 text-[#1e1e1e]"
                  >
                    {link.text}
                  </PixelBox>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative p-3 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    <div 
      className={`lg:hidden fixed left-0 right-0 z-[9998] transition-all duration-300 ease-in-out overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
      style={{ top: '80px' }}
    >
      <div className="mx-6 px-3 pt-2 pb-3 space-y-3 bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg border border-gray-200">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="block transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
            onClick={closeMenu}
            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
          >
            <PixelBox 
              color={link.color as 'blue' | 'green' | 'red' | 'yellow'}
              className="text-sm font-bold px-4 py-2 w-full text-center"
            >
              {link.text}
            </PixelBox>
          </a>
        ))}
      </div>
    </div>

    {/* Centered Logo */}
    <div 
      className="fixed left-1/2 transform -translate-x-1/2 z-[10000]"
      style={{ top: '16px' }}
    >
      <a
        href="/"
        className="flex items-center px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
        onClick={closeMenu}
      >
        <div className="relative w-12 h-12">
          <img
            src="/gdg.svg"
            alt="GDG Logo"
            className="absolute inset-0 w-full h-full transition-opacity duration-300"
          />
        </div>
      </a>
    </div>
    </>
  );
};

export default Navbar;