import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axiosInstance';

// Fetch user profile details
export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async () => {
  try {
    const response = await axiosInstance({
      url: '/user/profile',
      method: 'GET',
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user profile');
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    details: {},
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
