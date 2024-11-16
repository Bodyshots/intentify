'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import nameReducer from './slices/nameSlice';
import { persistReducer } from 'redux-persist'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["auth"],
};

const namePersistConfig = {
  key: "names",
  storage: storage,
  whitelist: ["firstName", "lastName"],
}

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const namePersistedReducer = persistReducer(namePersistConfig, nameReducer);

const authPersistReducer = combineReducers({
  auth_reduce: authPersistedReducer
})
const namePersistReducer = combineReducers({
  name_reduce: namePersistedReducer
})

export const store = configureStore({
    reducer: {
      auth_persist: authPersistReducer,
      name_persist: namePersistReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;