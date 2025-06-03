import apiClient from '../common/api/api.client';

export const retrieveCartById = (cartId) => {
  return apiClient.get(`carts/${cartId}`).then(resp => resp.data);
}
