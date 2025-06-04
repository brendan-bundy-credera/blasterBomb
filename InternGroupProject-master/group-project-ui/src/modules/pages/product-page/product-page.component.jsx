import React, { useState, useEffect } from 'react';
import heatwave_havoc from '../../../assets/heatwave_havoc.png'
import chili_charge from '../../../assets/chili_charge.png'
import flame_frenzy from '../../../assets/flame_frenzy.png'
import zesty_zing from '../../../assets/zesty_zing.png'
import logo from '../../../assets/blaster_bomb_logo.png'

// Placeholder data for products (can be replaced with actual data fetching)
const sampleProducts = [
  { id: 1, name: 'Heatwave Havoc', price: '$10.50', description: 'A fiery, heat bomb that is our hottest sauce--guaranteed to bring you tears.', spice: 'Blazing', img: heatwave_havoc },
  { id: 2, name: 'Chili Charge', price: '$9.70', description: 'A medium level chili-infused sauce that is sure to bring some heat!', spice: 'Hot', img: chili_charge },
  { id: 3, name: 'Flame Frenzy', price: '$9.70', description: 'A fun, savory hot sauce to make your mouth tingle.', spice: 'Mild', img: flame_frenzy },
  { id: 4, name: 'Zesty Zing', price: '$10.20', description: 'Our version of sweet and tangy with some ZING!', spice: 'Mild', img: zesty_zing },
  // { id: 5, name: 'Inferno Elixir', price: '$12.00', description: 'A dangerously spicy elixir for true heat seekers.', spice: 'Extreme', img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
  // { id: 6, name: 'Smoky Ember', price: '$8.50', description: 'A smoky, rich sauce with a subtle kick.', spice: 'Medium', img: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80' },
  // { id: 7, name: 'Garlic Blaze', price: '$11.00', description: 'Garlic-forward with a fiery finish.', spice: 'Hot', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
  // { id: 8, name: 'Sweet Heat', price: '$9.00', description: 'Sweet upfront, heat on the back end.', spice: 'Medium', img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' }
];

const ProductsPageComponent = () => {
    useEffect(() => {
    console.log("ProductsPageComponent mounted");
  }, []);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
   const [searchTerm, setSearchTerm] = useState(''); 
   const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate data fetching
    setProducts(sampleProducts);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredProducts = products.filter(product => 
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
    alert(`${selectedProduct.name} added to cart!`);
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
    </div>
  );
};

export default ProductsPageComponent;