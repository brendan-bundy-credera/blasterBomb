import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveCart } from '../../cart/retrieve-cart/retrieve-cart.slice';
import { RequestStatus } from '../../common/redux/redux.constants';
import { CircularProgress, Typography, Container, Box } from '@material-ui/core';

export const HomePageComponent = () => {
  const dispatch = useDispatch();
  const retrieveCartState = useSelector(state => state.cart.retrieveCart);

  useEffect(() => {
    dispatch(retrieveCart(1));
  }, [dispatch]);

  return (
    <Container maxWidth="sm" style={{ background: 'var(--timberwolf)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(43,44,40,0.08)', padding: '2em', marginTop: '2em' }}>
      <Box my={4}>
        <Typography variant="h3" component="h1" style={{ color: 'var(--main)', fontWeight: 700, letterSpacing: '1px', textAlign: 'center', whiteSpace: 'nowrap' }}>
          Blaster Bomb Hot Sauce
        </Typography>
        {/* Image placeholder */}
        <Box display="flex" justifyContent="center" my={2}>
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" alt="Hot Sauce" style={{ width: 180, height: 180, objectFit: 'cover', borderRadius: '12px', border: '4px solid var(--main)' }} />
        </Box>
        {/* Product cards */}
        <Box display="flex" flexWrap="wrap" justifyContent="center" style={{ gap: 16 }}>
          { [
            {
              id: 1,
              name: 'Heatwave Havoc',
              price: '$10.50',
              description: 'A fiery, heat bomb that is our hottest sauce--guaranteed to bring you tears.',
              spice: 'Blazing',
              img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: 2,
              name: 'Chili Charge',
              price: '$9.70',
              description: 'A medium level chili-infused sauce that is sure to bring some heat!',
              spice: 'Hot',
              img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: 3,
              name: 'Flame Frenzy',
              price: '$9.70',
              description: 'A fun, savory hot sauce to make your mouth tingle.',
              spice: 'Mild',
              img: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: 4,
              name: 'Zesty Zing',
              price: '$10.20',
              description: 'Our version of sweet and tangy with some ZING!',
              spice: 'Mild',
              img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
            },
          ].map(product => (
            <Box key={product.id} style={{ background: 'var(--jet)', color: 'var(--timberwolf)', borderRadius: 12, margin: 8, width: 220, boxShadow: '0 2px 8px rgba(43,44,40,0.08)', padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={product.img} alt={product.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 12, border: '2px solid var(--main)' }} />
              <Typography variant="h6" style={{ color: 'var(--main)', fontWeight: 600 }}>{product.name}</Typography>
              <Typography variant="body2" style={{ margin: '8px 0', minHeight: 40 }}>{product.description}</Typography>
              <Typography variant="body2" style={{ color: 'var(--main)', fontWeight: 500 }}>Heat Level: {product.spice}</Typography>
              <Typography variant="body1" style={{ fontWeight: 700, margin: '8px 0' }}>{product.price}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default HomePageComponent;