import React, { useState, useEffect } from 'react';

// Placeholder data for products (can be replaced with actual data fetching)
const sampleProducts = [
  { id: 1, name: 'Heatwave Havoc', price: '$10.50', description: 'A fiery, heat bomb that is our hottest sauce--guaranteed to bring you tears.' , spice: 'Blazing'},
  { id: 2, name: 'Chili Charge', price: '$9.70', description: 'A medium level chili-infused sauce that is sure to bring some heat! ', spice: 'Hot' },
  { id: 3, name: 'Flame Frenzy', price: '$9.70', description: 'A fun, savory hot sauce to make your mouth tingle.', spice: 'Mild' },
  { id: 4, name: 'Zesty Zing', price: '$10.20', description: 'Our version of sweet and tangy with some ZING!', spice: 'Mild'}
];

const ProductsPageComponent = () => {
    useEffect(() => {
    console.log("ProductsPageComponent mounted");
  }, []);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
   const [searchTerm, setSearchTerm] = useState(''); 

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
    cart.push(selectedProduct);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${selectedProduct.name} added to cart!`);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  return (
    <div style={{ maxWidth: 700, margin: '2em auto', background: 'var(--timberwolf)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(43,44,40,0.08)', padding: '2em' }}>
      <h1 style={{ color: 'var(--asparagus)', fontWeight: 700, letterSpacing: '1px' }}>Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: '100%', marginBottom: '1em' }}
      />
      {selectedProduct ? (
        <div style={{ textAlign: 'left' }}>
          {/* Image placeholder for product */}
          <div style={{ width: 220, height: 220, background: 'var(--jet)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--timberwolf)', fontSize: 28, fontWeight: 600, marginBottom: 24 }}>
            Product Image
          </div>
          <h2 style={{ color: 'var(--pumpkin)' }}>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p><b>Price:</b> {selectedProduct.price}</p>
          <p><b>Heat Level:</b> {selectedProduct.spice}</p>
          <button onClick={addToCart}>Add to Cart</button>
          <button onClick={handleBackToList} style={{ background: 'var(--cinnabar)' }}>Back to Products</button>
        </div>
      ) : (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id} onClick={() => handleProductClick(product)} style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
              {/* Small image placeholder */}
              <div style={{ width: 48, height: 48, background: 'var(--jet)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--timberwolf)', fontSize: 16, fontWeight: 600 }}>
                Img
              </div>
              <span style={{ flex: 1 }}>{product.name} - {product.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPageComponent;