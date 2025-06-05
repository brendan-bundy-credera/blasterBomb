import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../../products/product.service';

// Simple notification at bottom
const BottomNotification = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#60935D',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      zIndex: 1000
    }}>
      {message}
    </div>
  );
};

// Simple hook for notification
const useNotification = () => {
  const [notification, setNotification] = useState({ isVisible: false, message: '' });

  const showNotification = (message) => {
    setNotification({ isVisible: true, message });
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setNotification({ isVisible: false, message: '' });
    }, 3000);
  };

  return { notification, showNotification };
};

const ProductsPageComponent = () => {
  const { notification, showNotification } = useNotification();
  
  useEffect(() => {
    console.log("ProductsPageComponent mounted");
    fetchAllProducts().then(data => {
      console.log('Fetched products in ProductsPageComponent:', data);
      setProducts(data);
    }).catch(err => {
      console.error('Error fetching products in ProductsPageComponent:', err);
    });
  }, []);
  
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchAllProducts().then(setProducts);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  // Defensive: ensure products is always an array
  console.log('Products state before filter:', products);
  const filteredProducts = (Array.isArray(products) ? products : []).filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // If already in cart, increase quantity
    const existing = cart.find(item => item.id === selectedProduct.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + quantity;
    } else {
      cart.push({ ...selectedProduct, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification('Added to cart!');
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  return (
    <div style={{ maxWidth: 700, margin: '2em auto', background: 'var(--timberwolf)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(43,44,40,0.08)', padding: '2em' }}>
      <h1 style={{ color: 'var(--main)', fontWeight: 700, letterSpacing: '1px' }}>Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: '100%', marginBottom: '1em' }}
      />
      {selectedProduct ? (
        <div style={{ textAlign: 'left' }}>
          {/* Product image */}
          <img src={selectedProduct.img} alt={selectedProduct.name} style={{ width: 220, height: 220, objectFit: 'contain', borderRadius: '12px', marginBottom: 24, border: '4px solid var(--main)' }} />
          <h2 style={{ color: 'var(--main)' }}>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p><b>Price:</b> {selectedProduct.price}</p>
          <p><b>Heat Level:</b> {selectedProduct.spice}</p>
          <div style={{ margin: '12px 0' }}>
            <label htmlFor="quantity" style={{ marginRight: 8 }}>Quantity:</label>
            <input id="quantity" type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} style={{ width: 60, padding: 4, borderRadius: 4, border: '1px solid var(--main)' }} />
          </div>
          <button onClick={addToCart}>Add to Cart</button>
          <button onClick={handleBackToList} style={{ background: 'var(--cinnabar)' }}>Back to Products</button>
        </div>
      ) : (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id} onClick={() => handleProductClick(product)} style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
              {/* Product thumbnail */}
              <img src={product.img} alt={product.name} style={{ background: 'var(--timberwolf)', width: 64, height: 64, objectFit: 'contain', borderRadius: '8px', border: '2px solid var(--main)' }} />
              <span style={{ flex: 1 }}>{product.name} - {product.price}</span>
            </li>
          ))}
        </ul>
      )}
      
      {/* Simple notification at bottom */}
      <BottomNotification 
        message={notification.message}
        isVisible={notification.isVisible}
      />
    </div>
  );
};

export default ProductsPageComponent;