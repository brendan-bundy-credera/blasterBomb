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
          <img src={logo} alt="Hot Sauce" style={{ width: 180, height: 180, objectFit: 'contain', borderRadius: '12px' }} />
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
            {
              id: 5,
              name: 'Spice Surge',
              price: '$11.00',
              description: 'An electrifying blend of spices that will awaken your taste buds.',
              spice: 'Hot',
              img: zesty_zing, // Change this
            },
            {
              id: 6,
              name: 'Inferno Infusion',
              price: '$12.50',
              description: 'A dangerously addictive sauce with an infernal kick.',
              spice: 'Blazing',
              img: zesty_zing, // Change this
            },
            {
              id: 7,
              name: 'Pepper Pulse',
              price: '$9.00',
              description: 'A vibrant peppery sauce that adds a lively pulse to your dishes.',
              spice: 'Medium',
              img: zesty_zing, // Change this
            },
            {
              id: 8,
              name: 'Fiery Fusion',
              price: '$10.80',
              description: 'A harmonious fusion of flavors with a fiery finish.',
              spice: 'Hot',
              img: zesty_zing, // Change this
            }
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