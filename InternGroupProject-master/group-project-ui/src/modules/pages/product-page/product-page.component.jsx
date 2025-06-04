import React, { useState, useEffect } from 'react';

// Placeholder data for products (can be replaced with actual data fetching)
const sampleProducts = [
  { id: 1, name: 'Heatwave Havoc', price: '$10.50', description: 'A fiery, heat bomb that is our hottest sauce--guaranteed to bring you tears.' , spice: 'Blazing'},
  { id: 2, name: 'Chili Charge', price: '$9.70', description: 'A medium level chili-infused sauce that is sure to bring some heat! ', spice: 'Hot' },
  { id: 3, name: 'Flame Frenzy', price: '9.70', description: 'A fun, savory hot sauce to make your mouth tingle.', spice: 'Mild' },
  { id: 4, name: 'Zesty Zing', price: '10.20', description: 'Our version of sweet and tangy with some ZING!', spice: 'Mild'}
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
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {selectedProduct ? (
        <div>
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p>Price: {selectedProduct.price}</p>
          <p>Heat Level: {selectedProduct.spice}</p>
          <button onClick={addToCart}>Add to Cart</button>
          <button onClick={handleBackToList}>Back to Products</button>
        </div>
      ) : (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id} onClick={() => handleProductClick(product)}>
              {product.name} - {product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPageComponent;