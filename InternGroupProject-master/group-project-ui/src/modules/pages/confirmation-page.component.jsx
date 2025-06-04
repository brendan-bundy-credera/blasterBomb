import React from 'react';

const ConfirmationPage = ({ order, onReturnToShop }) => {
  if (!order) return <div style={{ padding: '2em', textAlign: 'center' }}>No order found.</div>;
  return (
    <div style={{ maxWidth: 500, margin: '2em auto', background: 'var(--timberwolf)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(43,44,40,0.08)', padding: '2em', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--main)' }}>Order Confirmed!</h1>
      <div style={{ fontSize: 22, margin: '1em 0' }}>Thank you, {order.name}!</div>
      <div style={{ marginBottom: '1em' }}>Your order ID: <b style={{ color: 'var(--main)' }}>{order.orderId}</b></div>
      <h3>Order Summary</h3>
      <ul style={{ textAlign: 'left', display: 'inline-block' }}>
        {order.items.map(item => (
          <li key={item.id}>{item.name} x{item.quantity || 1} - ${(parseFloat(item.price.replace('$','')) * (item.quantity || 1)).toFixed(2)}</li>
        ))}
      </ul>
      <div style={{ fontWeight: 700, margin: '1em 0' }}>Total: <span style={{ color: 'var(--main)' }}>${order.total.toFixed(2)}</span></div>
      <button onClick={onReturnToShop}>Return to Shop</button>
    </div>
  );
};

export default ConfirmationPage;
