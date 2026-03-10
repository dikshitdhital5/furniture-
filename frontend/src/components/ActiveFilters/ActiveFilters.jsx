import React from 'react';
import './ActiveFilters.css';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const getActiveFilters = () => {
    const active = [];

    // Category filters
    if (filters.categories.length > 0) {
      filters.categories.forEach(category => {
        active.push({
          id: `cat-${category}`,
          type: 'category',
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1)
        });
      });
    }

    // Price range
    if (filters.priceRange.min > 0 || filters.priceRange.max < 2000) {
      active.push({
        id: 'price',
        type: 'priceRange',
        label: `$${filters.priceRange.min} — $${filters.priceRange.max}`
      });
    }

    // In stock
    if (filters.inStock) {
      active.push({
        id: 'stock',
        type: 'inStock',
        label: 'In stock only'
      });
    }

    // New arrivals
    if (filters.newArrivals) {
      active.push({
        id: 'new',
        type: 'newArrivals',
        label: 'New arrivals'
      });
    }

    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return (
      <div className="active-filters empty">
        <span className="no-filters">No filters applied</span>
      </div>
    );
  }

  return (
    <div className="active-filters">
      <span className="active-filters-label">Filters:</span>
      <div className="filter-tags">
        {activeFilters.map(filter => (
          <span key={filter.id} className="filter-tag">
            {filter.label}
            <button
              className="remove-tag"
              onClick={() => onRemoveFilter(filter.type, filter.value)}
              aria-label={`Remove ${filter.label} filter`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </span>
        ))}
        {activeFilters.length > 1 && (
          <button className="clear-all" onClick={onClearAll}>
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;