"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
