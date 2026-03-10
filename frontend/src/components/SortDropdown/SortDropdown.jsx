import React, { useState, useRef, useEffect } from 'react';
import './SortDropdown.css';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest first' },
    { value: 'price-low-high', label: 'Price: Low to high' },
    { value: 'price-high-low', label: 'Price: High to low' },
    { value: 'rating', label: 'Top rated' }
  ];

  const currentOption = sortOptions.find(opt => opt.value === sortBy) || sortOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button 
        className="sort-dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Sort by: {currentOption.label}</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
        >
          <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {isOpen && (
        <ul className="sort-dropdown-menu">
          {sortOptions.map(option => (
            <li key={option.value}>
              <button
                className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;