"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types';

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
