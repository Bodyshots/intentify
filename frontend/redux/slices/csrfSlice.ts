"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CsrfState {
  token: string;
}

const initialState: CsrfState = {
  token: "",
};

const csrfSlice = createSlice({
  name: 'csrf',
  initialState,
  reducers: {
    setCsrfToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearCsrfToken: (state) => {
      state.token = "";
    },
  },
});

export const { setCsrfToken, clearCsrfToken } = csrfSlice.actions;
export default csrfSlice.reducer;
