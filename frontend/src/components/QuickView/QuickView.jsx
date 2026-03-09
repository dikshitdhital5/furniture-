import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './QuickView.css';

const QuickView = ({ product, isOpen, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
    // Optional: Open cart drawer
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product);
    onClose();
    if (!isAuthenticated) {
      localStorage.setItem('redirectAfterLogin', JSON.stringify({
        path: '/checkout',
        product: product
      }));
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  const handleViewDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <div className="quickview-overlay" onClick={onClose} />
      <div className="quickview-modal">
        <button className="quickview-close" onClick={onClose}>×</button>
        
        <div className="quickview-content">
          {/* Product Image */}
          <div className="quickview-image-container">
            <img 
              src={product.image} 
              alt={product.name}
              className="quickview-image"
            />
            {product.isNew && <span className="quickview-badge new">New</span>}
            {product.discount && <span className="quickview-badge discount">-{product.discount}%</span>}
          </div>

          {/* Product Details */}
          <div className="quickview-details">
            <h2 className="quickview-title">{product.name}</h2>
            
            <div className="quickview-rating">
              <div className="quickview-stars">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="quickview-reviews">({product.reviews} reviews)</span>
            </div>

            <div className="quickview-price">
              <span className="quickview-current-price">${product.price}</span>
              {product.originalPrice && (
                <span className="quickview-original-price">${product.originalPrice}</span>
              )}
            </div>

            <div className="quickview-description">
              <h4>Description</h4>
              <p>
                Experience unparalleled comfort with our {product.name}. 
                Crafted from premium materials, this piece combines style 
                and functionality for your modern living space.
              </p>
            </div>

            <div className="quickview-features">
              <h4>Features</h4>
              <ul>
                <li>✓ Premium quality materials</li>
                <li>✓ Easy assembly</li>
                <li>✓ 5-year warranty</li>
                <li>✓ Free delivery</li>
              </ul>
            </div>

            <div className="quickview-actions">
              <button className="quickview-add-to-cart" onClick={handleAddToCart}>
                <span className="btn-icon">🛒</span>
                Add to Cart
              </button>
              <button className="quickview-buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button className="quickview-details" onClick={handleViewDetails}>
                View Full Details
              </button>
            </div>

            <div className="quickview-meta">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Availability:</strong> <span className="in-stock">In Stock</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickView;