"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export const getAuthStatus = createAsyncThunk('auth/getAuthStatus', async () => {
//   const response = await fetch("http://localhost:4000/api/auth/status", {
//     method: 'GET',
//     credentials: 'include',
//   });
//   const data = await response.json();
//   return data.isAuth;
// });

interface AuthState {
  auth: boolean;
}

const initialState: AuthState = {
  auth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
