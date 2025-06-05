import React, { useEffect, useState } from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import { fetchAllProducts } from '../../products/product.service';

export const HomePageComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts().then(setProducts);
  }, []);

  return (
    <Container maxWidth="sm" style={{ background: 'var(--timberwolf)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(43,44,40,0.08)', padding: '2em', marginTop: '2em' }}>
      <Box my={4}>
        <Typography variant="h3" component="h1" style={{ color: 'var(--main)', fontWeight: 700, letterSpacing: '1px', textAlign: 'center', whiteSpace: 'nowrap' }}>
          Blaster Bomb Hot Sauce
        </Typography>
        {/* Image placeholder */}
        <Box display="flex" justifyContent="center" my={2}>
          <img src={process.env.PUBLIC_URL + '/blaster_bomb_logo.png'} alt="Hot Sauce" style={{ width: 180, height: 180, objectFit: 'contain', borderRadius: '12px' }} />
        </Box>
        {/* Product cards */}
        <Box display="flex" flexWrap="wrap" justifyContent="center" style={{ gap: 16 }}>
          {(Array.isArray(products) ? products : []).map(product => (
            <Box key={product.id} style={{ background: 'var(--jet)', color: 'var(--timberwolf)', borderRadius: 12, margin: 8, width: 420, boxShadow: '0 2px 8px rgba(43,44,40,0.08)', padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={product.img || product.image_url} alt={product.name} style={{ background: 'var(--timberwolf', width: 240, height: 240, objectFit: 'contain', borderRadius: 8, marginBottom: 12, border: '2px solid var(--main)' }} />
              <Typography variant="h6" style={{ color: 'var(--main)', fontWeight: 600 }}>{product.name}</Typography>
              <Typography variant="body2" style={{ margin: '8px 0', minHeight: 40 }}>{product.description}</Typography>
              {product.spice && <Typography variant="body2" style={{ color: 'var(--main)', fontWeight: 500 }}>Heat Level: {product.spice}</Typography>}
              <Typography variant="body1" style={{ fontWeight: 700, margin: '8px 0' }}>{product.price}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default HomePageComponent;