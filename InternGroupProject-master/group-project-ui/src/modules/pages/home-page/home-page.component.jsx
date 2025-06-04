import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveCart } from '../../cart/retrieve-cart/retrieve-cart.slice';
import { RequestStatus } from '../../common/redux/redux.constants';
import { Button, CircularProgress, Typography, Container, Box } from '@material-ui/core';

export const HomePageComponent = () => {
  const dispatch = useDispatch();
  const retrieveCartState = useSelector(state => state.cart.retrieveCart);

  useEffect(() => {
    dispatch(retrieveCart(1));
  }, [dispatch]);

  return (
    <Container maxWidth="sm" style={{ background: 'var(--timberwolf)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(43,44,40,0.08)', padding: '2em', marginTop: '2em' }}>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom style={{ color: 'var(--asparagus)', fontWeight: 700, letterSpacing: '1px' }}>
          Blaster Bomb Hot Sauce
        </Typography>
        {/* Image placeholder */}
        <Box display="flex" justifyContent="center" my={2}>
          <div style={{ width: 180, height: 180, background: 'var(--jet)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--timberwolf)', fontSize: 24, fontWeight: 600 }}>
            Image
          </div>
        </Box>
        {retrieveCartState.status === RequestStatus.LOADING ? (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress data-testid='loading-spinner' />
          </Box>
        ) : (
          <Box>
            <Button 
              variant="contained" 
              color="primary" 
              style={{ background: 'var(--asparagus)', color: 'var(--timberwolf)' }}
              onClick={() => dispatch(retrieveCart(1))}
            >
              Retrieve Cart
            </Button>
            <Box mt={2}>
              <Typography variant="h6" style={{ color: 'var(--jet)' }}>
                Current Cart ID: {retrieveCartState?.response?.cartId || 'N/A'}
              </Typography>
              <Typography variant="body1" style={{ color: 'var(--jet)' }}>
                {JSON.stringify(retrieveCartState?.response, null, 2)}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default HomePageComponent;