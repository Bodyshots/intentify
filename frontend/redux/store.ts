'use client';

import { configureStore } from '@reduxjs/toolkit';
import csrfReducer from './slices/csrfSlice';

export const store = configureStore({
    reducer: {
        csrf: csrfReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;