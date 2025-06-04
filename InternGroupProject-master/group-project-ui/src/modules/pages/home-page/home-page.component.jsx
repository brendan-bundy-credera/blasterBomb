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
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom style={{ color: 'red' }}>
          Blaster Bomb Hot Sauce
        </Typography>
        {retrieveCartState.status === RequestStatus.LOADING ? (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress data-testid='loading-spinner' />
          </Box>
        ) : (
          <Box>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => dispatch(retrieveCart(1))}
            >
              Retrieve Cart
            </Button>
            <Box mt={2}>
              <Typography variant="h6">
                Current Cart ID: {retrieveCartState?.response?.cartId || 'N/A'}
              </Typography>
              <Typography variant="body1">
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