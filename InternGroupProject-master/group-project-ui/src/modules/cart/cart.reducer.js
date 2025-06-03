import { combineReducers } from "@reduxjs/toolkit";
import retrieveCartSlice from './retrieve-cart/retrieve-cart.slice';

const cartReducer = combineReducers({
  retrieveCart: retrieveCartSlice.reducer
});

export default cartReducer;
