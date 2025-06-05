import HomePageComponent from './home-page/home-page.component';
import ProductsPageComponent from './product-page/product-page.component';
import CartPage from './cart-page.component';
import CheckoutPage from './checkout-page.component';
import ConfirmationPage from './confirmation-page.component';

// Page for navbar!!!


// Example component to demonstrate routing with multiple pages
const TestComp = () => (
  <div>Products</div>
)

// Config for root routes to easily add/omit routes
// NOTE: Including linkText property will include route in navigation menu; omit this property for routes which shouldn't be in navigation
// NOTE: You may need to update this config with more properties and map to the RootLayout if more complex routes are required
export const routes = [  { path: '/products', linkText: 'Products', routeComponent: ProductsPageComponent, exact: true },
  { path: '/cart', routeComponent: CartPage, exact: true },
  { path: '/checkout', routeComponent: CheckoutPage, exact: true },
  { path: '/confirmation', routeComponent: ConfirmationPage, exact: true },
  // Currently a fallback route which will match if any routes above are not exactly matched
  // NOTE: Fallback routes should always be last
  { path: '/', linkText: 'Home', routeComponent: HomePageComponent, exact: false },
];

export default routes;
