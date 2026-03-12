import React, { useState } from 'react';
import './ProductTabs.css';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const { description, specifications, reviews } = product;

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${reviews?.length || 0})` },
    { id: 'shipping', label: 'Shipping & Returns' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'description':
        return (
          <div className="tab-content description">
            <p className="description-text">{description}</p>
            <div className="features-list">
              <h4>Key Features</h4>
              <ul>
                <li>Solid wood construction for durability</li>
                <li>Natural finish that complements any decor</li>
                <li>Easy assembly with included tools</li>
                <li>Scratch-resistant surface</li>
                <li>5-year manufacturer warranty</li>
              </ul>
            </div>
          </div>
        );

      case 'specifications':
        return (
          <div className="tab-content specifications">
            <table className="specs-table">
              <tbody>
                {Object.entries(specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td className="spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'reviews':
        return (
          <div className="tab-content reviews">
            <div className="reviews-summary">
              <div className="average-rating">
                <span className="big-rating">{product.rating}</span>
                <span className="stars">
                  {'★'.repeat(Math.floor(product.rating))}
                  {product.rating % 1 >= 0.5 ? '½' : ''}
                  {'☆'.repeat(5 - Math.ceil(product.rating))}
                </span>
                <span className="total-reviews">Based on {reviews?.length || 0} reviews</span>
              </div>
              <button className="write-review-btn">Write a Review</button>
            </div>

            <div className="reviews-list">
              {reviews?.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">{review.user}</span>
                    <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <div className="review-rating">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                    {review.verified && <span className="verified-badge">Verified Purchase</span>}
                  </div>
                  <h5 className="review-title">{review.title}</h5>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="tab-content shipping">
            <div className="shipping-info">
              <h4>Shipping Information</h4>
              <p>Free shipping on orders over $100. Standard shipping (5-7 business days) is available for $9.99.</p>
              
              <h4>Delivery Options</h4>
              <ul>
                <li>Standard Delivery (5-7 business days) - $9.99</li>
                <li>Express Delivery (2-3 business days) - $19.99</li>
                <li>Next Day Delivery (1-2 business days) - $29.99</li>
              </ul>

              <h4>Return Policy</h4>
              <p>We offer a 30-day return policy on all items. Items must be unused and in original packaging. Return shipping is free for defective items.</p>

              <h4>Assembly</h4>
              <p>Most items require simple assembly. Tools and instructions are included. Professional assembly services are available in select areas for an additional fee.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="product-tabs">
      <div className="tabs-header">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;