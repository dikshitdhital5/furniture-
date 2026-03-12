import React from 'react';
import './ProductInfo.css';

const ProductInfo = ({ 
  product, 
  quantity, 
  onQuantityChange, 
  onAddToCart, 
  onBuyNow 
}) => {
  const {
    name,
    price,
    compareAtPrice,
    rating,
    reviewCount,
    inStock,
    stockQuantity,
    sku,
    description
  } = product;

  const discount = compareAtPrice ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;

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
    <div className="product-info">
      {/* Title and SKU */}
      <div className="product-header">
        <h1 className="product-title">{name}</h1>
        <p className="product-sku">SKU: {sku}</p>
      </div>

      {/* Rating */}
      <div className="product-rating">
        <span className="stars">{renderStars()}</span>
        <span className="rating-value">{rating}</span>
        <span className="review-count">({reviewCount} reviews)</span>
      </div>

      {/* Price */}
      <div className="product-price-section">
        <div className="price-wrapper">
          <span className="current-price">${price.toFixed(2)}</span>
          {compareAtPrice && (
            <>
              <span className="original-price">${compareAtPrice.toFixed(2)}</span>
              <span className="discount-badge">Save {discount}%</span>
            </>
          )}
        </div>
      </div>

      {/* Short Description */}
      <p className="short-description">{description}</p>

      {/* Availability */}
      <div className="availability">
        <span className="availability-label">Availability:</span>
        {inStock ? (
          <span className="in-stock">
            <span className="stock-dot"></span>
            In Stock ({stockQuantity} available)
          </span>
        ) : (
          <span className="out-of-stock">Out of Stock</span>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="quantity-selector">
        <span className="quantity-label">Quantity:</span>
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input 
            type="number"
            min="1"
            max={stockQuantity}
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
            className="quantity-input"
          />
          <button 
            className="quantity-btn"
            onClick={() => onQuantityChange(quantity + 1)}
            disabled={quantity >= stockQuantity}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="add-to-cart-btn"
          onClick={onAddToCart}
          disabled={!inStock}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 7h16M8 7V4h8v3M6 21h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2"/>
          </svg>
          Add to Cart
        </button>
        <button 
          className="buy-now-btn"
          onClick={onBuyNow}
          disabled={!inStock}
        >
          Buy Now
        </button>
      </div>

      {/* Additional Info */}
      <div className="additional-info">
        <div className="info-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" strokeWidth="1.5"/>
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" strokeWidth="1.5"/>
          </svg>
          <span>Free shipping on orders over $100</span>
        </div>
        <div className="info-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.5"/>
          </svg>
          <span>5-year warranty included</span>
        </div>
        <div className="info-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" strokeWidth="1.5"/>
            <path d="M12 22V12" strokeWidth="1.5"/>
          </svg>
          <span>Easy 30-day returns</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;