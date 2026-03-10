import React from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose }) => {
  const categories = [
    { id: 'tables', label: 'Tables', count: 12 },
    { id: 'chairs', label: 'Chairs', count: 18 },
    { id: 'sofas', label: 'Sofas', count: 8 },
    { id: 'bedroom', label: 'Bedroom', count: 15 },
    { id: 'storage', label: 'Storage', count: 10 },
    { id: 'lighting', label: 'Lighting', count: 7 },
    { id: 'office', label: 'Office', count: 9 }
  ];

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(c => c !== categoryId)
      : [...filters.categories, categoryId];
    
    onFilterChange({ categories: updatedCategories });
  };

  const handlePriceChange = (type, value) => {
    const numValue = value === '' ? 0 : parseInt(value);
    onFilterChange({
      priceRange: {
        ...filters.priceRange,
        [type]: numValue
      }
    });
  };

  const handleCheckboxChange = (name) => {
    onFilterChange({ [name]: !filters[name] });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="filter-overlay" onClick={onClose} />}

      {/* Sidebar */}
      <aside className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="filter-header">
          <h3>Filters</h3>
          <button className="filter-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="filter-content">
          {/* Categories */}
          <div className="filter-group">
            <h4 className="filter-group-title">Categories</h4>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category.id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <span className="checkbox-label">
                    {category.label}
                    <span className="category-count">({category.count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <h4 className="filter-group-title">Price Range</h4>
            <div className="price-range">
              <div className="price-inputs">
                <div className="price-input">
                  <label>Min</label>
                  <input
                    type="number"
                    min="0"
                    max={filters.priceRange.max}
                    value={filters.priceRange.min || ''}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    placeholder="$0"
                  />
                </div>
                <span className="price-separator">—</span>
                <div className="price-input">
                  <label>Max</label>
                  <input
                    type="number"
                    min={filters.priceRange.min}
                    max="2000"
                    value={filters.priceRange.max || ''}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    placeholder="$2000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="filter-group">
            <h4 className="filter-group-title">Availability</h4>
            <div className="filter-options">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={() => handleCheckboxChange('inStock')}
                />
                <span className="checkbox-label">In stock only</span>
              </label>
            </div>
          </div>

          {/* New Arrivals */}
          <div className="filter-group">
            <h4 className="filter-group-title">New Arrivals</h4>
            <div className="filter-options">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.newArrivals}
                  onChange={() => handleCheckboxChange('newArrivals')}
                />
                <span className="checkbox-label">Show new products</span>
              </label>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;