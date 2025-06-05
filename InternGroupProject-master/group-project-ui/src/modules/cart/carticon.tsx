import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

const getCartCount = () => {
  const cartString = localStorage.getItem('cart');
  const cart = cartString ? JSON.parse(cartString) : [];
  return cart.reduce((sum: any, item: { quantity: any; }) => sum + (item.quantity || 1), 0);
};

interface CartIconWithBadgeProps {
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

const CartIconWithBadge = ({ onClick }: CartIconWithBadgeProps) => {
  const [count, setCount] = useState(getCartCount());

  useEffect(() => {
    const handler = () => setCount(getCartCount());
    window.addEventListener('storage', handler);
    // Listen for cart changes in this tab
    const origSetItem = localStorage.setItem;
    localStorage.setItem = function (...args) {
      origSetItem.apply(this, args);
      handler();
    };
    return () => {
      window.removeEventListener('storage', handler);
      localStorage.setItem = origSetItem;
    };
  }, []);

  return (
    <Badge badgeContent={count} color="secondary" invisible={count === 0}>
      <ShoppingCartIcon 
        style={{ fontSize: 32, cursor: 'pointer', color: 'var(--main)' }} 
        onClick={onClick}
        titleAccess="View Cart"
      />
    </Badge>
  );
};

export default CartIconWithBadge;