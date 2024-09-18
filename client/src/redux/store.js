import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../services/cartSlice';
import userReducer from '../services/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
