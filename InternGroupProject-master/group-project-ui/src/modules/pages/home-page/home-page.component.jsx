import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveCart } from '../../cart/retrieve-cart/retrieve-cart.slice';
import { RequestStatus } from '../../common/redux/redux.constants';
import { Typography, Container, Box } from '@material-ui/core';
import heatwave_havoc from '../../../assets/heatwave_havoc.png'
import chili_charge from '../../../assets/chili_charge.png'
import flame_frenzy from '../../../assets/flame_frenzy.png'
import zesty_zing from '../../../assets/zesty_zing.png'
import logo from '../../../assets/blaster_bomb_logo.png'
// import { styled } from '@mui/system';

export const HomePageComponent = () => {
  const dispatch = useDispatch();
  const retrieveCartState = useSelector(state => state.cart.retrieveCart);

  useEffect(() => {
    dispatch(retrieveCart(1));
  }, [dispatch]);

  // // Styled component for responsive typography
  // const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  //   color: 'var(--main)',
  //   fontWeight: 700,
  //   letterSpacing: '1px',
  //   textAlign: 'center',
  //   whiteSpace: 'nowrap',
  //   fontSize: '3rem', // Default size
  //   [theme.breakpoints.down('lg')]: {
  //     fontSize: '2.5rem',
  //   },
  //   [theme.breakpoints.down('md')]: {
  //     fontSize: '2rem',
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: '1.5rem',
  //   },
  // }));
  return (
    <Container maxWidth="sm" style={{ background: 'var(--timberwolf)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(43,44,40,0.08)', padding: '2em', marginTop: '2em' }}>
      <Box my={4}>
        <Typography variant="h3" component="h1" style={{ color: 'var(--main)', fontWeight: 700, letterSpacing: '1px', textAlign: 'center', whiteSpace: 'nowrap' }}
          sx={{
            fontSize: {
              xs: '1.5rem', // Small screens
              sm: '2rem',   // Medium screens
              md: '2.5rem', // Large screens
              lg: '3rem',   // Extra large screens
            },
          }}
        >
          Blaster Bomb Hot Sauce
        </Typography>
        {/* Image placeholder */}
        <Box display="flex" justifyContent="center" my={2}>
          <img src={logo} alt="Hot Sauce" style={{ width: 180, height: 180, objectFit: 'contain', borderRadius: '12px', border: '4px solid var(--main)' }} />
        </Box>
        {/* Product cards */}
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={16} justifyContent="center" style={{ paddingLeft: '16px', paddingRight: '16px' }}  sx={{
            gridTemplateColumns: {
              xs: '1fr', // Single column on small screens
              sm: '1fr',
              md: 'repeat(2, 1fr)', // Two columns on medium screens and above
            },
            gap: 2,
            paddingLeft: '16px',
            paddingRight: '16px',
          }} >
          { [
            {
              id: 1,
              name: 'Heatwave Havoc',
              price: '$10.50',
              description: 'A fiery, heat bomb that is our hottest sauce--guaranteed to bring you tears.',
              spice: 'Blazing',
              img: heatwave_havoc,
            },
            {
              id: 2,
              name: 'Chili Charge',
              price: '$9.70',
              description: 'A medium level chili-infused sauce that is sure to bring some heat!',
              spice: 'Hot',
              img: chili_charge,
            },
            {
              id: 3,
              name: 'Flame Frenzy',
              price: '$9.70',
              description: 'A fun, savory hot sauce to make your mouth tingle.',
              spice: 'Mild',
              img: flame_frenzy,
            },
            {
              id: 4,
              name: 'Zesty Zing',
              price: '$10.20',
              description: 'Our version of sweet and tangy with some ZING!',
              spice: 'Mild',
              img: zesty_zing,
            },
          ].map(product => (
            <Box key={product.id} style={{ background: 'var(--jet)', color: 'var(--timberwolf)', borderRadius: 12, margin: 8, width: 420, boxShadow: '0 2px 8px rgba(43,44,40,0.08)', padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={product.img} alt={product.name} style={{ background: 'var(--timberwolf', width: 240, height: 240, objectFit: 'contain', borderRadius: 8, marginBottom: 12, border: '2px solid var(--main)' }} />
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