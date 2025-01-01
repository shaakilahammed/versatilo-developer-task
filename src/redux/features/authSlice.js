import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    removeAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});


export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
