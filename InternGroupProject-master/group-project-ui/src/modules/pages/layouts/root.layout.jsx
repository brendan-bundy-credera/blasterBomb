import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import rootRoutes from '../pages.config';
import './root.layout.css'; // Import the CSS file

// State for order and navigation
export const RootLayout = () => {
  const [order, setOrder] = useState(null);
  // Custom route rendering for checkout/confirmation
  return (
    <Router>
      <nav className="navbar">
        <ul>
          {rootRoutes.filter(route => !!route.linkText).map((route, index) => (
            <li key={index}>
              <Link to={route.path}>{route.linkText}</Link>
            </li>
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