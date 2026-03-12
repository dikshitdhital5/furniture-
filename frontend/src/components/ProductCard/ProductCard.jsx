import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import QuickView from '../QuickView/QuickView';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const {
    id,
    name,
    price,
    image,
    rating,
    reviewCount,
    isNew,
    stock
  } = product;

   const handleCardClick = () => {
    navigate(`/product/${id}`); // Navigate to product details page
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    // Simulate adding to cart (you can remove setTimeout if your addToCart is instant)
    setTimeout(() => {
      onAddToCart(product);
      setIsAdding(false);
    }, 300);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('½');
      } else {
        stars.push('☆');
      }
    }

    return stars;
  };

  return (
    <>
      <div className="product-card">
        {/* Badges */}
        <div className="product-badges">
          {isNew && <span className="badge new">New</span>}
          {stock < 5 && stock > 0 && (
            <span className="badge low-stock">Only {stock} left</span>
          )}
          {stock === 0 && <span className="badge out-of-stock">Out of stock</span>}
        </div>

        {/* Product Image */}
        <div className="product-image-container">
          {!imageLoaded && <div className="image-skeleton"></div>}
          <img 
            src={image || '/images/placeholder.jpg'} 
            alt={name}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Quick View Button */}
          <button 
            className="quick-view-btn"
            onClick={handleQuickView}
            aria-label="Quick view"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3" strokeWidth="2"/>
              <path d="M22 12C22 14 18 19 12 19C6 19 2 14 2 12C2 10 6 5 12 5C18 5 22 10 22 12Z" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h3 className="product-name">{name}</h3>
          
          {/* Rating */}
          <div className="product-rating">
            <span className="stars">{renderStars()}</span>
            <span className="review-count">({reviewCount || 0})</span>
          </div>

          {/* Price */}
          <div className="product-price">
            ${price.toFixed(2)}
          </div>

          {/* Add to Cart Button */}
          <button 
            className={`add-to-cart-btn ${isAdding ? 'adding' : ''} ${stock === 0 ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={stock === 0 || isAdding}
          >
            {isAdding ? (
              <>
                <span className="spinner-small"></span>
                Adding...
              </>
            ) : stock === 0 ? (
              'Out of Stock'
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickView 
          product={product}
          onClose={() => setShowQuickView(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
};

export default ProductCard;