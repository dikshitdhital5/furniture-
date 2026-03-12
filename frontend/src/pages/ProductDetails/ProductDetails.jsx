import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ProductImages from '../../components/ProductImages/ProductImages';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import ProductTabs from '../../components/ProductTabs/ProductTabs';
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';
import './ProductDetails.css';

// Mock data - replace with API call
const mockProduct = {
  id: 1,
  name: 'Haven Oak Dining Table',
  price: 799.99,
  compareAtPrice: 999.99,
  category: 'tables',
  subCategory: 'dining-tables',
  description: 'Crafted from solid oak, the Haven dining table brings warmth and durability to your dining space. The natural wood grain adds character while the clean lines ensure it fits seamlessly with any decor style.',
  specifications: {
    material: 'Solid Oak Wood',
    dimensions: '72" L x 36" W x 30" H',
    weight: '85 lbs',
    color: 'Natural Oak',
    assembly: 'Required (tools included)',
    warranty: '5 years',
    care: 'Wipe clean with dry cloth'
  },
  images: [
    '/images/products/dining-table-1.jpg',
    '/images/products/dining-table-2.jpg',
    '/images/products/dining-table-3.jpg',
    '/images/products/dining-table-4.jpg'
  ],
  rating: 4.8,
  reviewCount: 24,
  inStock: true,
  stockQuantity: 15,
  sku: 'FUR-TBL-001',
  tags: ['best-seller', 'dining', 'oak'],
  reviews: [
    {
      id: 1,
      user: 'Sarah M.',
      rating: 5,
      date: '2024-02-15',
      title: 'Beautiful and sturdy',
      comment: 'Absolutely love this table! The oak is high quality and it was easy to assemble.',
      verified: true
    },
    {
      id: 2,
      user: 'James K.',
      rating: 4,
      date: '2024-02-10',
      title: 'Great table, slight delay',
      comment: 'The table is gorgeous but shipping took longer than expected.',
      verified: true
    }
  ]
};

const mockRelatedProducts = [
  {
    id: 2,
    name: 'Luna Velvet Armchair',
    price: 449.99,
    image: '/images/products/armchair-1.jpg',
    rating: 4.5,
    reviewCount: 18
  },
  {
    id: 3,
    name: 'Cove Sectional Sofa',
    price: 1299.99,
    image: '/images/products/sofa-1.jpg',
    rating: 4.9,
    reviewCount: 32
  },
  {
    id: 4,
    name: 'Ridge Bookshelf',
    price: 349.99,
    image: '/images/products/bookshelf-1.jpg',
    rating: 4.3,
    reviewCount: 15
  },
  {
    id: 5,
    name: 'Nova Coffee Table',
    price: 289.99,
    image: '/images/products/coffee-table-1.jpg',
    rating: 4.6,
    reviewCount: 21
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Simulate API call with product ID
    setTimeout(() => {
      // In real app, fetch product by ID
      setProduct(mockProduct);
      setLoading(false);
    }, 500);

    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0]
        });
      }
      // Optional: Show success message or open cart
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="product-loading">
            <div className="spinner"></div>
            <p>Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="product-not-found">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ccc">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
              <path d="M12 8V12M12 16H12.01" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <button className="back-to-shop" onClick={() => navigate('/products')}>
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <button onClick={() => navigate('/')}>Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')}>Products</button>
          <span>/</span>
          <button onClick={() => navigate(`/products?category=${product.category}`)}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </button>
          <span>/</span>
          <span className="current">{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="product-main">
          <ProductImages 
            images={product.images}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            productName={product.name}
          />

          <ProductInfo 
            product={product}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </div>

        {/* Product Tabs (Description, Specs, Reviews) */}
        <ProductTabs product={product} />

        {/* Related Products */}
        <RelatedProducts 
          products={mockRelatedProducts}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
};

export default ProductDetails;