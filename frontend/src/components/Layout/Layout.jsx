import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CartDrawer from '../Cart/CartDrawer';
import { useCart } from '../../context/CartContext';
import SearchModal from '../Search/SearchModal';
import { useSearch } from '../../context/SearchContext';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const { isCartOpen, setIsCartOpen } = useCart();
    const { isSearchOpen, setIsSearchOpen } = useSearch();


  console.log('Layout rendering, isCartOpen:', isCartOpen);


  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  // Close cart drawer when route changes
  useEffect(() => {
  // This will only run when location.pathname changes
  if (isCartOpen) {
    setIsCartOpen(false);
  }
}, [location.pathname]); 
  // Handle escape key to close cart
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isCartOpen, setIsCartOpen]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <div className="layout">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Navbar */}
      <Navbar />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

       {/* Search Modal */}
      <SearchModal />
      

      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div 
          className="layout-overlay" 
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <main 
        id="main-content" 
        className={`layout-main ${isCartOpen ? 'blur' : ''}`}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;