import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveCart } from '../../cart/retrieve-cart/retrieve-cart.slice';
import { RequestStatus } from '../../common/redux/redux.constants';
import { Typography, Box, Grid } from '@material-ui/core';
import hotSauces from '../../../data/hotSauces';
import logo from '../../../assets/blaster_bomb_logo.png'
// import { styled } from '@mui/system';

export const HomePageComponent = () => {
  const dispatch = useDispatch();
  const retrieveCartState = useSelector(state => state.cart.retrieveCart);

  useEffect(() => {
    dispatch(retrieveCart(1));
  }, [dispatch]); 

  return (
    // dynamic box shadow wrapper, matching products page
    <Box
      sx={{
        background: 'var(--timberwolf)',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(43,44,40,0.08)',
        padding: { xs: '1em', sm: '2em' },
        margin: '2em auto',
        maxWidth: { xs: '90%', sm: '600px', md: '900px' },
        width: '100%',
        transition: 'max-width 0.3s',
      }}
    >
      <Box my={4}>
        <Typography
          variant="h1"
          component="h1"
          style={{
            color: 'var(--main)',
            textAlign: 'center',
            fontFamily: "'Bangers', cursive",
            fontSize: '4.7rem', 
            letterSpacing: '1px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            lineHeight: '1.2',
          }}
        >
          Blaster Bomb Hot Sauce
        </Typography>
        {/* Image placeholder */}
        <Box display="flex" justifyContent="center" my={2}>
          <img src={logo} alt="Hot Sauce" style={{ width: 180, height: 180, objectFit: 'contain', borderRadius: '12px' }} />
        </Box>
        {/* Product cards */}
        <Grid container spacing={6} style={{ margin: '0 -12px', width: 'calc(100% + 24px)' }}>
          {hotSauces.map(product => (
            <Grid item xs={12} sm={12} md={6} key={product.id}>
              <Box sx={{
                background: 'var(--jet)',
                color: 'var(--timberwolf)',
                borderRadius: 12,
                margin: 1,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: {
                  xs: '0 2px 8px rgba(43,44,40,0.08)',
                  md: '0 4px 16px rgba(43,44,40,0.15)',
                },
              }}>
              <img src={product.img} alt={product.name} style={{ background: 'var(--timberwolf)', width: 240, height: 240, objectFit: 'contain', borderRadius: 8, marginBottom: 12, border: '2px solid var(--main)' }} />
              <Typography variant="h6" style={{ color: 'var(--main)', fontWeight: 600 }}>{product.name}</Typography>
              <Typography variant="body2" style={{ margin: '8px 0', minHeight: 40 }}>{product.description}</Typography>
              <Typography variant="body2" style={{ color: 'var(--main)', fontWeight: 500 }}>Heat Level: {product.spice}</Typography>
              <Typography variant="body1" style={{ fontWeight: 700, margin: '8px 0' }}>{product.price}</Typography>
            </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePageComponent;