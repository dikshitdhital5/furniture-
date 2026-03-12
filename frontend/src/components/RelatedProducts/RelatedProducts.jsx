import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatedProducts.css';

const RelatedProducts = ({ products, currentProductId }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="related-products">
      <h2 className="related-title">You May Also Like</h2>
      <div className="related-grid">
        {products
          .filter(p => p.id !== currentProductId)
          .map(product => (
            <div 
              key={product.id} 
              className="related-card"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="related-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="related-info">
                <h3 className="related-name">{product.name}</h3>
                <div className="related-rating">
                  <span className="stars">
                    {'★'.repeat(Math.floor(product.rating))}
                    {product.rating % 1 >= 0.5 ? '½' : ''}
                    {'☆'.repeat(5 - Math.ceil(product.rating))}
                  </span>
                  <span className="review-count">({product.reviewCount})</span>
                </div>
                <div className="related-price">${product.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;