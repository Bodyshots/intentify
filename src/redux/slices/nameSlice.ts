"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameState } from './types';

const initialState: NameState = {
  firstName: "",
  lastName: ""
};

const nameSlice = createSlice({
  name: 'names',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
  },
});

export const { setFirstName, setLastName } = nameSlice.actions;
export default nameSlice.reducer;
