import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: null,
    email: null,
    isLoggedIn: false,
    isLoading: false,
  },
  reducers: {
    login(state, action) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    setLoading(state) {
      state.isLoading = false;
    },
    logout(state) {
      state.uid = null;
      state.email = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
  },
});

export const { login, setLoading, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
