import React, { useEffect, useRef } from 'react';
import { useSearch } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import './SearchModal.css';

const SearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    recentSearches,
    searchProducts,
    clearRecentSearches
  } = useSearch();

  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, setIsSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isSearchOpen, setIsSearchOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchProducts(query);
  };

  const handleProductClick = (productId) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    searchProducts(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    searchProducts('');
  };

  const handleViewAllResults = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/products?search=${searchQuery}`);
  };

  if (!isSearchOpen) return null;

  return (
    <>
      <div className="search-overlay" />
      <div className="search-modal" ref={modalRef}>
        <div className="search-header">
          <h2>Search Products</h2>
          <button className="search-close" onClick={() => setIsSearchOpen(false)}>×</button>
        </div>

        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for furniture, categories, or styles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <button className="search-clear" onClick={handleClearSearch}>×</button>
          )}
        </div>

        <div className="search-results">
          {!searchQuery && recentSearches.length > 0 && (
            <div className="recent-searches">
              <div className="recent-header">
                <span className="recent-title">Recent Searches</span>
                <button className="clear-recent" onClick={clearRecentSearches}>
                  Clear All
                </button>
              </div>
              <div className="recent-list">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="recent-item"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <span className="recent-icon">⏱️</span>
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchQuery && searchResults.length > 0 && (
            <div className="search-results-list">
              <p className="results-count">{searchResults.length} results found</p>
              {searchResults.map(product => (
                <div
                  key={product.id}
                  className="search-result-item"
                  onClick={() => handleProductClick(product.id)}
                >
                  <img src={product.image} alt={product.name} className="result-image" />
                  <div className="result-details">
                    <h4 className="result-name">{product.name}</h4>
                    <p className="result-category">{product.category}</p>
                    <p className="result-price">${product.price}</p>
                  </div>
                </div>
              ))}
              
              {searchResults.length > 5 && (
                <button className="view-all-results" onClick={handleViewAllResults}>
                  View All {searchResults.length} Results
                </button>
              )}
            </div>
          )}

          {searchQuery && searchResults.length === 0 && (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>No results found</h3>
              <p>We couldn't find any products matching "{searchQuery}"</p>
              <div className="suggestions">
                <p>Try:</p>
                <ul>
                  <li>Checking spelling</li>
                  <li>Using more general terms</li>
                  <li>Searching for categories</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="search-footer">
          <p>Popular searches: </p>
          <div className="popular-tags">
            <button onClick={() => handleRecentSearchClick('chair')}>Chair</button>
            <button onClick={() => handleRecentSearchClick('table')}>Table</button>
            <button onClick={() => handleRecentSearchClick('sofa')}>Sofa</button>
            <button onClick={() => handleRecentSearchClick('bed')}>Bed</button>
            <button onClick={() => handleRecentSearchClick('storage')}>Storage</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;