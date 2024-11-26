"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmailState } from './types';

const initialState: EmailState = {
  email: '',
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = emailSlice.actions;
export default emailSlice.reducer;
