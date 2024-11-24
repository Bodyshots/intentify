"use client"

import { createSlice } from '@reduxjs/toolkit';
import { ThemeConstants } from '@/constants/theme';

interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: ThemeConstants.light
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLight: (state) => {
      state.theme = ThemeConstants.light;
    },
    setDark: (state) => {
      state.theme = ThemeConstants.dark;
    }
  },
});

export const { setLight, setDark } = themeSlice.actions;
export default themeSlice.reducer;
