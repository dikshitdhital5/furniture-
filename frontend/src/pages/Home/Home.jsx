import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import QuickView from '../../components/QuickView/QuickView';
import './Home.css';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
   const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Modern Lounge Chair',
      category: 'chairs',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      reviews: 128,
      isNew: true,
      discount: 25
    },
    {
      id: 2,
      name: 'Scandinavian Table',
      category: 'tables',
      price: 449,
      originalPrice: 599,
      image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 89,
      isNew: false,
      discount: 25
    },
    {
      id: 3,
      name: 'Minimalist Bed Frame',
      category: 'beds',
      price: 899,
      originalPrice: 1099,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      reviews: 56,
      isNew: true,
      discount: 18
    },
    {
      id: 4,
      name: 'Velvet Armchair',
      category: 'chairs',
      price: 349,
      originalPrice: 449,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviews: 92,
      isNew: false,
      discount: 22
    },
    {
      id: 5,
      name: 'Oak Dining Table',
      category: 'tables',
      price: 599,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviews: 145,
      isNew: true,
      discount: 25
    },
    {
      id: 6,
      name: 'Storage Cabinet',
      category: 'storage',
      price: 399,
      originalPrice: 499,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.4,
      reviews: 67,
      isNew: false,
      discount: 20
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🪑' },
    { id: 'chairs', name: 'Chairs', icon: '💺' },
    { id: 'tables', name: 'Tables', icon: '🪵' },
    { id: 'beds', name: 'Beds', icon: '🛏️' },
    { id: 'storage', name: 'Storage', icon: '🗄️' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

     const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    document.body.classList.add('quickview-open');
  };


   const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
    document.body.style.overflow = 'unset';
     document.body.classList.remove('quickview-open');
  };

const handleAddToCart = (product) => {
  console.log('Adding to cart:', product); // Debug log
  addToCart(product);
  // Small delay to ensure state updates before opening
  setTimeout(() => {
    setIsCartOpen(true);
    console.log('Cart should be open now'); // Debug log
  }, 50);
  
  // Show button animation
  const button = document.getElementById(`add-to-cart-${product.id}`);
  if (button) {
    button.classList.add('added');
    setTimeout(() => button.classList.remove('added'), 1000);
  }
};
  const handleBuyNow = (product) => {
    if (!isAuthenticated) {
      // Save the product to localStorage to redirect back after login
      localStorage.setItem('redirectAfterLogin', JSON.stringify({
        path: '/checkout',
        product: product
      }));
      navigate('/login');
    } else {
      // Proceed to checkout
      addToCart(product);
      navigate('/checkout');
    }
  };

  // Hero section content based on authentication
  const heroContent = isAuthenticated ? {
    title: `Welcome back, ${user?.name}!`,
    subtitle: 'Continue exploring our new collection',
    ctaText: 'View Your Favorites',
    ctaLink: '/favorites',
    secondaryCta: 'Shop New Arrivals'
  } : {
    title: 'Crafting Comfort,',
    subtitle: 'One Piece at a Time',
    description: 'Discover furniture that tells your story. Modern designs for timeless spaces.',
    ctaText: 'Explore Collection',
    ctaLink: '/products',
    secondaryCta: 'Learn More'
  };

  return (
    
    <div className="home-page">
      {/* Hero Section - Fixed overlapping issue */}
         <QuickView 
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">Since 2020</span>
          <h1 className="hero-title">
            {heroContent.title}
            <span className="hero-title-accent">{heroContent.subtitle}</span>
          </h1>
          {!isAuthenticated && (
            <p className="hero-description">{heroContent.description}</p>
          )}
          <div className="hero-buttons">
            <button 
              className="btn-primary"
              onClick={() => navigate(heroContent.ctaLink)}
            >
              {heroContent.ctaText}
            </button>
            <button className="btn-secondary">
              {heroContent.secondaryCta}
            </button>
          </div>
          
          {!isAuthenticated && (
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Unique Designs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Customer Rating</span>
              </div>
            </div>
          )}
        </div>
      </section>





      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find exactly what you're looking for</p>
          </div>
          
          <div className="categories-grid">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Hand-picked just for you</p>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  {product.isNew && (
                    <span className="product-badge new">New</span>
                  )}
                  {product.discount && (
                    <span className="product-badge discount">-{product.discount}%</span>
                  )}
                  <div className="product-actions">
                    <button 
                      className="action-btn quick-view"
                      onClick={() => handleQuickView(product)}
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  
                  <div className="product-rating">
                    <div className="stars">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="rating-count">({product.reviews})</span>
                  </div>

                  <div className="product-price">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>

                  <div className="product-card-actions">
                    <button 
                      id={`add-to-cart-${product.id}`}
                      className="btn-add-to-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <span className="btn-icon">🛒</span>
                      Add to Cart
                    </button>
                    <button 
                      className="btn-buy-now"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isAuthenticated && (
            <div className="personalized-section">
              <h3>Recommended for You</h3>
              <p>Based on your browsing history</p>
              {/* Add personalized recommendations here */}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h4>Free Delivery</h4>
              <p>On orders over $499</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h4>30-Day Returns</h4>
              <p>Money-back guarantee</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h4>Secure Payment</h4>
              <p>100% secure transactions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h4>24/7 Support</h4>
              <p>Dedicated customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Different for authenticated users */}
      <section className="newsletter-section">
        <div className="container">
          {isAuthenticated ? (
            <div className="member-benefits">
              <h2>Exclusive Member Benefits</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <span className="benefit-icon">⭐</span>
                  <span>Early access to sales</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🎁</span>
                  <span>Birthday discounts</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">📦</span>
                  <span>Free shipping on all orders</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h2>Join Our Newsletter</h2>
              <p>Subscribe to get special offers, free giveaways, and exclusive deals.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn-primary">Subscribe</button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;