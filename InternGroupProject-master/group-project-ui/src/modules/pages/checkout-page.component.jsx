import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
const clearCart = () => localStorage.removeItem('cart');

const CheckoutPage = ({ onOrderComplete }) => {
  const history = useHistory();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [error, setError] = useState({});
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price.replace('$','')) * (item.quantity || 1)), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  const formatCardNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Limit to 16 digits
    const limited = digits.slice(0, 16);
    // Add spaces after every 4 digits
    return limited.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const formatExpiryDate = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Limit to 4 digits
    const limited = digits.slice(0, 4);
    // Add slash after first 2 digits if we have more than 2
    if (limited.length > 2) {
      return limited.slice(0, 2) + '/' + limited.slice(2);
    }
    return limited;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      // Limit CVV to 3 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setForm(prev => ({ ...prev, [name]: formattedValue }));
  };
  const validateForm = () => {
    const errors = {};
    if (!form.name) errors.name = 'Name is required';
    if (!form.email) errors.email = 'Email is required';
    if (!form.email?.includes('@')) errors.email = 'Invalid email format';
    if (!form.address) errors.address = 'Address is required';
    if (!form.city) errors.city = 'City is required';
    if (!form.state) errors.state = 'State is required';
    if (!form.zip) errors.zip = 'ZIP code is required';
    if (!form.zip?.match(/^\d{5}$/)) errors.zip = 'Invalid ZIP code';    if (!form.cardNumber) {
      errors.cardNumber = 'Card number is required';
    } else {
      const unformattedCard = form.cardNumber.replace(/\s/g, '');
      if (unformattedCard.length !== 16 || !/^\d+$/.test(unformattedCard)) {
        errors.cardNumber = 'Invalid card number';
      }
    }

    if (!form.expiry) {
      errors.expiry = 'Expiry date is required';
    } else {
      const [month, year] = form.expiry.split('/');
      if (!month || !year || month.length !== 2 || year.length !== 2) {
        errors.expiry = 'Invalid expiry date';
      } else if (parseInt(month) < 1 || parseInt(month) > 12) {
        errors.expiry = 'Invalid month';
      } else {
        // Check if card is expired
        const currentYear = new Date().getFullYear() % 100; // Get last 2 digits of year
        const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
        const cardYear = parseInt(year);
        const cardMonth = parseInt(month);
        
        if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
          errors.expiry = 'Card has expired';
        }
      }
    }

    if (!form.cvv) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3}$/.test(form.cvv)) {
      errors.cvv = 'Invalid CVV';
    }
    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }    const orderData = {
      orderId: Math.floor(Math.random() * 1000000),
      name: form.name,
      email: form.email,
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      total,
      items: cart,
      shippingCost: shipping,
      tax: tax,
      subtotal: subtotal
    };
    
    clearCart();
    onOrderComplete(orderData);
    // Navigate to confirmation page after order is complete
    history.push('/confirmation');
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
      <div style={{ fontWeight: 700, marginBottom: '1em' }}>Total: <span style={{ color: 'var(--main)' }}>${total.toFixed(2)}</span></div>      <form onSubmit={handleSubmit}>
        <h3>Shipping Information</h3>
        <div style={{ marginBottom: '1em' }}>
          <label>Full Name<br/>
            <input name="name" value={form.name} onChange={handleChange} style={{ width: '100%' }} />
          </label>
          {error.name && <div style={{ color: 'var(--cinnabar)', fontSize: '0.8em' }}>{error.name}</div>}
        </div>
        <div style={{ marginBottom: '1em' }}>
          <label>Email<br/>
            <input name="email" type="email" value={form.email} onChange={handleChange} style={{ width: '100%' }} />
          </label>
          {error.email && <div style={{ color: 'var(--cinnabar)', fontSize: '0.8em' }}>{error.email}</div>}
        </div>
        <div style={{ marginBottom: '1em' }}>
          <label>Street Address<br/>
            <input name="address" value={form.address} onChange={handleChange} style={{ width: '100%' }} />
          </label>
          {error.address && <div style={{ color: 'var(--cinnabar)', fontSize: '0.8em' }}>{error.address}</div>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1em', marginBottom: '1em' }}>
          <div>
            <label>City<br/>
              <input name="city" value={form.city} onChange={handleChange} style={{ width: '100%' }} />
            </label>
            {error.city && <div style={{ color: 'var(--cinnabar)', fontSize: '0.8em' }}>{error.city}</div>}
          </div>
          <div>
            <label>State<br/>
              <input name="state" value={form.state} onChange={handleChange} style={{ width: '100%' }} />
            </label>
            {error.state && <div style={{ color: 'var(--cinnabar)', fontSize: '0.8em' }}>{error.state}</div>}
          </div>
          <div>
            <label>ZIP Code<br/>
              <input name="zip" value={form.zip} onChange={handleChange} style={{ width: '100%' }} />
            </label>
            {error.zip && <div style={{ color: 'var(--cinnabar)', fontSize: '0.8em' }}>{error.zip}</div>}
          </div>
        </div>

        <h3>Payment Information</h3>
        <div style={{ marginBottom: '1em' }}>
          <label>Card Number<br/>
            <input name="cardNumber" value={form.cardNumber} onChange={handleChange} style={{ width: '100%' }} 
                   placeholder="1234 5678 9012 3456" />
          </label>
          {error.cardNumber && <div style={{ color: 'var(--cinnabar)', fontSize: '0.8em' }}>{error.cardNumber}</div>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', marginBottom: '1em' }}>
          <div>
            <label>Expiry Date<br/>
              <input name="expiry" value={form.expiry} onChange={handleChange} style={{ width: '100%' }}
                     placeholder="MM/YY" />
            </label>
            {error.expiry && <div style={{ color: 'var(--cinnabar)', fontSize: '0.8em' }}>{error.expiry}</div>}
          </div>
          <div>
            <label>CVV<br/>
              <input name="cvv" value={form.cvv} onChange={handleChange} style={{ width: '100%' }}
                     placeholder="123" />
            </label>
            {error.cvv && <div style={{ color: 'var(--cinnabar)', fontSize: '0.8em' }}>{error.cvv}</div>}
          </div>
        </div>

        <div style={{ background: '#f5f5f5', padding: '1em', borderRadius: '8px', marginBottom: '1em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5em' }}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5em' }}>
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5em' }}>
            <span>Tax (8%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '0.5em', paddingTop: '0.5em', borderTop: '1px solid #ddd' }}>
            <span>Total:</span>
            <span style={{ color: 'var(--main)' }}>${total.toFixed(2)}</span>
          </div>
        </div>

        <button type="submit" style={{ width: '100%', padding: '1em', background: 'var(--main)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Complete Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
