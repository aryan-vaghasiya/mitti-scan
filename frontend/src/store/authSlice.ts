import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
}

const initialToken = localStorage.getItem('token');

const initialState: AuthState = {
  token: initialToken,
  user: null,
  isAuthenticated: !!initialToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: any }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;