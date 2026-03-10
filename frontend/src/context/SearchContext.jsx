import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  // Sample product data (you can move this to a separate file later)
  const allProducts = [
    {
      id: 1,
      name: 'Modern Lounge Chair',
      category: 'chairs',
      price: 299,
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['chair', 'lounge', 'modern', 'comfort']
    },
    {
      id: 2,
      name: 'Scandinavian Table',
      category: 'tables',
      price: 449,
      image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['table', 'dining', 'scandinavian', 'wood']
    },
    {
      id: 3,
      name: 'Minimalist Bed Frame',
      category: 'beds',
      price: 899,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['bed', 'frame', 'minimalist', 'bedroom']
    },
    {
      id: 4,
      name: 'Velvet Armchair',
      category: 'chairs',
      price: 349,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['chair', 'armchair', 'velvet', 'luxury']
    },
    {
      id: 5,
      name: 'Oak Dining Table',
      category: 'tables',
      price: 599,
      image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['table', 'dining', 'oak', 'wood']
    },
    {
      id: 6,
      name: 'Storage Cabinet',
      category: 'storage',
      price: 399,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['cabinet', 'storage', 'wood', 'organization']
    },
    {
      id: 7,
      name: 'Leather Sofa',
      category: 'sofas',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['sofa', 'leather', 'living room', 'comfort']
    },
    {
      id: 8,
      name: 'Bookshelf',
      category: 'storage',
      price: 249,
      image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['bookshelf', 'storage', 'wood', 'office']
    }
  ];

  const searchProducts = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.includes(lowercaseQuery))
    );
    
    setSearchResults(results);
    
    // Save to recent searches
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev].slice(0, 5));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const value = {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    recentSearches,
    searchProducts,
    clearRecentSearches
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};