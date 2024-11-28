"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserIDState } from './types';

const initialState: UserIDState = {
  user_id: -1,
};

const emailSlice = createSlice({
  name: 'user_id',
  initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<number>) => {
      state.user_id = action.payload;
    },
  },
});

export const { setUserID } = emailSlice.actions;
export default emailSlice.reducer;
