import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import rootRoutes from '../pages.config';
import './root.layout.css'; // Import the CSS file

export const RootLayout = () => (
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
      {rootRoutes.map((route, index) => (
        <Route exact={route.exact} key={index} path={route.path} component={route.routeComponent} />
      ))}
    </Switch>
  </Router>
);

export default RootLayout;