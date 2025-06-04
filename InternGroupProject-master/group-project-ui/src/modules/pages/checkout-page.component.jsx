import React, { useState } from 'react';

const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
const clearCart = () => localStorage.removeItem('cart');

const CheckoutPage = ({ onOrderComplete }) => {
  const [form, setForm] = useState({ name: '', card: '' });
  const [error, setError] = useState('');
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price.replace('$','')) * (item.quantity || 1)), 0);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.card) {
      setError('Please fill out all fields.');
      return;
    }
    clearCart();
    onOrderComplete({
      orderId: Math.floor(Math.random() * 1000000),
      name: form.name,
      total,
      items: cart
    });
  };

  return (
    <div style={{ maxWidth: 500, margin: '2em auto', background: 'var(--timberwolf)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(43,44,40,0.08)', padding: '2em' }}>
      <h1 style={{ color: 'var(--main)' }}>Checkout</h1>
      <h3>Order Summary</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id}>{item.name} x{item.quantity || 1} - ${(parseFloat(item.price.replace('$','')) * (item.quantity || 1)).toFixed(2)}</li>
        ))}
      </ul>
      <div style={{ fontWeight: 700, marginBottom: '1em' }}>Total: <span style={{ color: 'var(--main)' }}>${total.toFixed(2)}</span></div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1em' }}>
          <label>Name on Card<br/>
            <input name="name" value={form.name} onChange={handleChange} style={{ width: '100%' }} />
          </label>
        </div>
        <div style={{ marginBottom: '1em' }}>
          <label>Card Number<br/>
            <input name="card" value={form.card} onChange={handleChange} style={{ width: '100%' }} />
          </label>
        </div>
        {error && <div style={{ color: 'var(--cinnabar)', marginBottom: '1em' }}>{error}</div>}
        <button type="submit">Complete Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
