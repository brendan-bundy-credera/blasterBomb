import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Typography, Container, Box } from '@material-ui/core';
import rootRoutes from '../pages.config';
import './root.layout.css'; // Import the CSS file
import logo from '../../../assets/blaster_bomb_logo.png'

// State for order and navigation
export const RootLayout = () => {
  const [order, setOrder] = useState(null);
  // Custom route rendering for checkout/confirmation
  return (
    <Router>
      <nav className="navbar" style={{ display: 'flex', alignItems: 'center', padding: '1em' }}>
        <Box className="logo" style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
          <img src={logo} alt="Hot Sauce Logo" style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: '12px' }} />
        </Box>
        <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0, justifyContent: 'center', flexGrow: 1, gap: '2em' }}>
          {rootRoutes.filter(route => !!route.linkText).map((route, index) => (
            <Link key={index} to={route.path} style={{ textDecoration: 'none' }}>
              <li style={{ padding: '0.5em 1em', cursor: 'pointer' }}>
                {route.linkText}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Switch>
        {rootRoutes.map((route, index) => {
          if (route.path === '/checkout') {
            const CheckoutPage = route.routeComponent;
            return <Route key={index} path={route.path} exact={route.exact} render={() => <CheckoutPage onOrderComplete={setOrder} />} />;
          }
          if (route.path === '/confirmation') {
            const ConfirmationPage = route.routeComponent;
            return <Route key={index} path={route.path} exact={route.exact} render={() => <ConfirmationPage order={order} onReturnToShop={() => window.location.href = '/products'} />} />;
          }
          return <Route key={index} path={route.path} exact={route.exact} component={route.routeComponent} />;
        })}
      </Switch>
    </Router>
  );
};

export default RootLayout;