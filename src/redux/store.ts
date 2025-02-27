'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import nameReducer from './slices/nameSlice';
import convosReducer from './slices/convoSlice';
import userIDReducer from './slices/userIDSlice';
import { AuthState, NameState, ConvosState, UserIDState } from './slices/types';
import { persistReducer, PersistedState } from 'redux-persist';
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

//// Helpers
// Helper for creating persistent configs
const createPersistConfig = (key: string, whitelist: string[]) => ({
  key,
  storage,
  whitelist,
});

// Helper to create persistent reducers
const createPersistedReducer = (sliceReducer: any, persistConfig: any) => 
  persistReducer(persistConfig, sliceReducer);

const authPersistConfig = createPersistConfig('auth', ['auth']);
const namePersistConfig = createPersistConfig('names', ['firstName', 'lastName']);
const convosPersistConfig = createPersistConfig('convos', ['convos']);
const userIDPersistConfig = createPersistConfig('user_id', ['user_id']);

const rootReducer = combineReducers({
  auth_persist: createPersistedReducer(authReducer, authPersistConfig),
  name_persist: createPersistedReducer(nameReducer, namePersistConfig),
  convos_persist: createPersistedReducer(convosReducer, convosPersistConfig),
  userID_persist: createPersistedReducer(userIDReducer, userIDPersistConfig),
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
})

export interface RootState {
  auth_persist: PersistedState & AuthState;
  name_persist: PersistedState & NameState;
  convos_persist: PersistedState & ConvosState;
  userID_persist: PersistedState & UserIDState;
}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;