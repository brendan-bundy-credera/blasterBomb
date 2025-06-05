import React, { useEffect, useState } from 'react';
import { Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const CartIconWithBadge = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCount(totalItems);
    };

    // Initial count
    updateCartCount();

    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);

    // Listen for cart changes in current tab
    const origSetItem = localStorage.setItem;
    localStorage.setItem = function(...args) {
      origSetItem.apply(this, args);
      updateCartCount();
    };

    return () => {
      window.removeEventListener('storage', updateCartCount);
      localStorage.setItem = origSetItem;
    };
  }, []);

  return (
    <Badge 
      badgeContent={count} 
      color="secondary"
      invisible={count === 0}
      style={{
        '& .MuiBadge-badge': {
          backgroundColor: 'var(--cinnabar)',
          color: 'white',
        }
      }}
    >
      <ShoppingCartIcon style={{ 
        fontSize: 28,
        color: 'var(--main)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        }
      }} />
    </Badge>
  );
};

export default CartIconWithBadge;
