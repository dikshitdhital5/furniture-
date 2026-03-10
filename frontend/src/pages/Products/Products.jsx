import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import SortDropdown from '../../components/SortDropdown/SortDropdown';
import ActiveFilters from '../../components/ActiveFilters/ActiveFilters';
import Pagination from '../../components/Pagination/Pagination';
import './Products.css';

// Mock data - replace with your actual API call
const mockProducts = [
  {
    id: 1,
    name: 'Haven Oak Dining Table',
    price: 799.99,
    category: 'tables',
    subCategory: 'dining-tables',
    image: '/images/products/dining-table-1.jpg',
    isNew: true,
    rating: 4.8,
    reviewCount: 24,
    stock: 5
  },
  {
    id: 2,
    name: 'Luna Velvet Armchair',
    price: 449.99,
    category: 'chairs',
    subCategory: 'armchairs',
    image: '/images/products/armchair-1.jpg',
    isNew: true,
    rating: 4.5,
    reviewCount: 18,
    stock: 8
  },
  {
    id: 3,
    name: 'Cove Sectional Sofa',
    price: 1299.99,
    category: 'sofas',
    subCategory: 'sectional',
    image: '/images/products/sofa-1.jpg',
    isNew: false,
    rating: 4.9,
    reviewCount: 32,
    stock: 3
  },
  {
    id: 4,
    name: 'Ridge Bookshelf',
    price: 349.99,
    category: 'storage',
    subCategory: 'bookshelves',
    image: '/images/products/bookshelf-1.jpg',
    isNew: false,
    rating: 4.3,
    reviewCount: 15,
    stock: 12
  },
  {
    id: 5,
    name: 'Nova Coffee Table',
    price: 289.99,
    category: 'tables',
    subCategory: 'coffee-tables',
    image: '/images/products/coffee-table-1.jpg',
    isNew: true,
    rating: 4.6,
    reviewCount: 21,
    stock: 7
  },
  {
    id: 6,
    name: 'Ember Nightstand',
    price: 199.99,
    category: 'bedroom',
    subCategory: 'nightstands',
    image: '/images/products/nightstand-1.jpg',
    isNew: false,
    rating: 4.4,
    reviewCount: 12,
    stock: 15
  },
  {
    id: 7,
    name: 'Drift Wood Desk',
    price: 549.99,
    category: 'office',
    subCategory: 'desks',
    image: '/images/products/desk-1.jpg',
    isNew: true,
    rating: 4.7,
    reviewCount: 9,
    stock: 4
  },
  {
    id: 8,
    name: 'Aura Pendant Light',
    price: 159.99,
    category: 'lighting',
    subCategory: 'pendants',
    image: '/images/products/light-1.jpg',
    isNew: false,
    rating: 4.2,
    reviewCount: 7,
    stock: 20
  },
  {
    id: 9,
    name: 'Nomad Dresser',
    price: 699.99,
    category: 'bedroom',
    subCategory: 'dressers',
    image: '/images/products/dresser-1.jpg',
    isNew: true,
    rating: 4.5,
    reviewCount: 14,
    stock: 6
  }
];

const Products = () => {
  const { addToCart, setIsCartOpen } = useCart();
  
  // State
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 2000 },
    inStock: false,
    newArrivals: false
  });
  
  // Sort state
  const [sortBy, setSortBy] = useState('featured');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Load products
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    result = result.filter(product => 
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    );

    // Apply stock filter
    if (filters.inStock) {
      result = result.filter(product => product.stock > 0);
    }

    // Apply new arrivals filter
    if (filters.newArrivals) {
      result = result.filter(product => product.isNew);
    }

    // Apply sorting
    result = sortProducts(result, sortBy);

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, sortBy, products]);

  // Sort function
  const sortProducts = (productsToSort, sortOption) => {
    const sorted = [...productsToSort];
    
    switch(sortOption) {
      case 'price-low-high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'featured':
      default:
        return sorted;
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  // Remove individual filter
  const handleRemoveFilter = (type, value) => {
    switch(type) {
      case 'category':
        setFilters(prev => ({
          ...prev,
          categories: prev.categories.filter(cat => cat !== value)
        }));
        break;
      case 'priceRange':
        setFilters(prev => ({
          ...prev,
          priceRange: { min: 0, max: 2000 }
        }));
        break;
      case 'inStock':
        setFilters(prev => ({ ...prev, inStock: false }));
        break;
      case 'newArrivals':
        setFilters(prev => ({ ...prev, newArrivals: false }));
        break;
      default:
        break;
    }
  };

  // Clear all filters
  const handleClearAll = () => {
    setFilters({
      categories: [],
      priceRange: { min: 0, max: 2000 },
      inStock: false,
      newArrivals: false
    });
    setSortBy('featured');
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    // Optional: Open cart drawer after adding
    setIsCartOpen(true);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="products-loading">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="products-header">
          <h1 className="products-title">All Furniture</h1>
          <p className="products-count">{filteredProducts.length} products</p>
        </div>

        {/* Mobile Filter Button */}
        <button 
          className="mobile-filter-btn"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H21M6 12H18M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Filter & Sort
        </button>

        {/* Main Layout */}
        <div className="products-layout">
          {/* Filter Sidebar */}
          <FilterSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
            isOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
          />

          {/* Products Section */}
          <div className="products-section">
            {/* Toolbar */}
            <div className="products-toolbar">
              <ActiveFilters 
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAll}
              />
              <SortDropdown 
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <>
                <div className="products-grid">
                  {currentProducts.map(product => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="no-products">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ccc">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                  <path d="M8 12H16M12 8V16" strokeWidth="1.5"/>
                </svg>
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
                <button className="clear-filters-btn" onClick={handleClearAll}>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;