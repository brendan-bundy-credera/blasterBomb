import React from 'react';

const ConfirmationPage = ({ order, onReturnToShop }) => {
  if (!order) return <div style={{ padding: '2em', textAlign: 'center' }}>No order found.</div>;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // 5 days delivery estimate

  return (
    <div style={{ maxWidth: 800, margin: '2em auto', background: 'var(--timberwolf)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(43,44,40,0.08)', padding: '2em' }}>
      <div style={{ textAlign: 'center', marginBottom: '2em' }}>
        <h1 style={{ color: 'var(--main)' }}>Order Confirmed!</h1>
        <div style={{ fontSize: 22, margin: '1em 0' }}>Thank you, {order.name}!</div>
        <div style={{ marginBottom: '1em' }}>
          Your order ID: <b style={{ color: 'var(--main)' }}>{order.orderId}</b>
        </div>
        <div style={{ color: 'var(--main)', fontWeight: 'bold' }}>
          Estimated Delivery: {estimatedDelivery.toLocaleDateString()}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2em', marginBottom: '2em' }}>
        <div>
          <h3>Shipping Details</h3>
          <div style={{ background: 'white', padding: '1em', borderRadius: '8px' }}>
            <p style={{ margin: '0.5em 0' }}>{order.name}</p>
            <p style={{ margin: '0.5em 0' }}>{order.email}</p>
            <p style={{ margin: '0.5em 0' }}>{order.address}</p>
            <p style={{ margin: '0.5em 0' }}>{order.city}, {order.state} {order.zip}</p>
          </div>
        </div>

        <div>
          <h3>Order Summary</h3>
          <div style={{ background: 'white', padding: '1em', borderRadius: '8px' }}>
            {order.items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5em 0' }}>
                <span>{item.name} x{item.quantity || 1}</span>
                <span>${(parseFloat(item.price.replace('$','')) * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
            <hr style={{ margin: '1em 0', border: 'none', borderTop: '1px solid #eee' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5em 0' }}>
              <span>Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5em 0' }}>
              <span>Shipping:</span>
              <span>${order.shippingCost.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5em 0' }}>
              <span>Tax:</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5em 0', fontWeight: 'bold', fontSize: '1.2em' }}>
              <span>Total:</span>
              <span style={{ color: 'var(--main)' }}>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2em' }}>
        <p style={{ marginBottom: '1em' }}>A confirmation email has been sent to {order.email}</p>
        <button 
          onClick={onReturnToShop}
          style={{ 
            background: 'var(--main)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '1em 2em',
            cursor: 'pointer'
          }}
        >
          Return to Shop
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
