import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useCart } from '../../context/CartContext'; 
import { useSearch } from '../../context/SearchContext';



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCartCount, setIsCartOpen } = useCart();
    const { setIsSearchOpen } = useSearch();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <span className="logo-text">Mukesh<span className="logo-accent">Furni</span></span>
        </a>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={closeMenu}>Home</a>
            </li>
            <li className="nav-item">
              <a href="/products" className="nav-link" onClick={closeMenu}>Products</a>
            </li>
            <li className="nav-item">
              <a href="/collections" className="nav-link" onClick={closeMenu}>Collections</a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link" onClick={closeMenu}>About Us</a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link" onClick={closeMenu}>Contact</a>
            </li>
          </ul>

          {/* Navbar Actions (Search, Cart, etc.) */}
          <div className="nav-actions">
            <button className="action-btn search-btn" aria-label="Search"  onClick={() => setIsSearchOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            
            <button className="action-btn cart-btn" aria-label="Cart"  onClick={() => setIsCartOpen(true)}>

              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-count">{getCartCount()}</span>
            </button>

            <button className="action-btn user-btn" aria-label="User account">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;