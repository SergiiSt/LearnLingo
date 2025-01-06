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
  },
});

export const { login, setLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
