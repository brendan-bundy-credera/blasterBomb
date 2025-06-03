import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../common/redux/redux.constants';
import * as cartService from '../cart.service';

const initialState = {
  status: RequestStatus.IDLE,
  response: undefined,
  error: undefined,
  requestParams: undefined
}

// https://redux-toolkit.js.org/tutorials/quick-start
export const retrieveCartSlice = createSlice({
  // The name of the reducer which will become the base property for this slice's state (e.g. state.cart.retrieveCart)
  name: 'retrieveCart',
  initialState,
  reducers: {
    // Set the status to 'LOADING' so components can determine when the response is in flight
    retrieveCartStart: (state, action) => {
      state.status = RequestStatus.LOADING;
      state.requestParams = {
        cartId: action.payload
      }
    },
    // Set the response and change the status to 'SUCCESS' so components know the data is ready to be used
    retrieveCartSuccess: (state, action) => {
      state.status = RequestStatus.SUCCESS;
      state.response = action.payload;
    },
    // Set the error object
    retrieveCartError: (state, action) => {
      state.status = RequestStatus.ERROR;
      state.error = action.payload;
    },
  },
  // Only necessary if you need to intercept actions handled by other slices to modify data in this slice of the state
  extraReducers: {

  }
});

const {
  retrieveCartStart,
  retrieveCartSuccess,
  retrieveCartError
} = retrieveCartSlice.actions;

export const retrieveCart = (cartId) => async (dispatch) => {
  dispatch(retrieveCartStart(cartId));
  try {
    const response = await cartService.retrieveCartById(cartId);
    dispatch(retrieveCartSuccess(response));
  } catch (err) {
    dispatch(retrieveCartError(err?.message));
  }
}

export default retrieveCartSlice;
