import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { axiosInstance } from '../config/axiosInstance';

// Fetch cart details from the server
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  try {
    const response = await axiosInstance({
      url: '/cart/active',
      method: 'GET',
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    toast.error('Failed to load cart');
    throw error;
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    subtotal: 0,
    total: 0,
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    // Actions to manually update the cart items or subtotal (if needed)
    updateCart: (state, action) => {
      // state.items = action.payload.items;
      state.subtotal = action.payload.subtotal;
      state.total = action.payload.total;
      state.restaurant = action.payload.restaurant;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.cart.items || [];
        state.subtotal = action.payload.cart.subtotal || 0;
        state.total = action.payload.cart.total || 0;
        state.user = action.payload.cart.user || null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export const { updateCartItems } = cartSlice.actions;
export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
