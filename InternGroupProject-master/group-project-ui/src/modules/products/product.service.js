// Service for fetching product data from backend
import axios from 'axios';

const API_BASE = '/api/products';

export const fetchAllProducts = async () => {
  try {
    const res = await axios.get(API_BASE);
    console.log('fetchAllProducts response:', res.data); // Logging
    return res.data;
  } catch (err) {
    console.error('fetchAllProducts error:', err);
    throw err;
  }
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};
