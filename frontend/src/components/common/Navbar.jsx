/**
 * Navbar Component
 * Navigation header with logo and menu
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ⓡ</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">ResumeAI</span>
          </Link>

          {/* Menu Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">
              How it Works
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition">
              About
            </a>
            
            <Link
              to="/"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium active:scale-95  transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-gray-600 hover:text-gray-900 transition p-2"
          >
            {isMenuOpen ? (
              <MdClose className="w-6 h-6" />
            ) : (
              <GiHamburgerMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <a 
                href="#how-it-works" 
                className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded transition"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#about" 
                className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#pricing" 
                className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <Link
                to="/"
                className="block text-center px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
