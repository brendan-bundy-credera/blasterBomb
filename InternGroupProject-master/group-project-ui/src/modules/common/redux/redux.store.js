import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cartReducer from "../../cart/cart.reducer";

// Add reducers from other modules to the store here
// These will be the root properties accessible from the state (e.g. state.cart)
const rootReducer = combineReducers({
  cart: cartReducer
});


const store = configureStore({
  reducer: rootReducer,
});

export default store;
