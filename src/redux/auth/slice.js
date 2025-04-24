import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, setLoading, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
