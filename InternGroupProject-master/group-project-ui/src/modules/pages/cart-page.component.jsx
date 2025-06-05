import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchProductById } from '../products/product.service';

const getCart = async () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Fetch latest product info for each item
  const updatedCart = await Promise.all(cart.map(async item => {
    try {
      const product = await fetchProductById(item.id);
      return {
        ...item,
        name: product.name,
        price: product.price,
        img: product.img || product.image_url,
      };
    } catch {
      return item;
    }
  }));
  return updatedCart;
};

const setCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const CartPage = () => {
  const [cart, setCartState] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getCart().then(setCartState);
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
    );
    setCart(updated);
    setCartState(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    setCartState(updated);
  };

  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price.replace('$','')) * (item.quantity || 1)), 0);

  return (
    <div style={{ maxWidth: 700, margin: '2em auto', background: 'var(--timberwolf)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(43,44,40,0.08)', padding: '2em' }}>
      <h1 style={{ color: 'var(--main)' }}>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--main)', color: 'var(--timberwolf)' }}>
              <th style={{ padding: '0.5em' }}>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--jet)' }}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span style={{ margin: '0 0.5em' }}>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </td>
                <td>${(parseFloat(item.price.replace('$','')) * (item.quantity || 1)).toFixed(2)}</td>
                <td><button style={{ background: 'var(--cinnabar)' }} onClick={() => removeItem(item.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ textAlign: 'right', marginTop: '1em', fontWeight: 700 }}>
        Total: <span style={{ color: 'var(--main)' }}>${total.toFixed(2)}</span>
      </div>      {cart.length > 0 && (
        <div style={{ textAlign: 'right', marginTop: '2em' }}>
          <button 
            onClick={() => history.push('/checkout')}
            style={{ 
              background: 'var(--main)',
              color: 'white',
              padding: '1em 2em',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1em',
              fontWeight: 'bold'
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
