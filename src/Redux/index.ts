import { AnyAction, configureStore } from "@reduxjs/toolkit"
import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector
} from "react-redux";
import taskReducer from './reducer.ts';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistedReducer = persistReducer({
  key: 'root',
  storage,
}, taskReducer)

const tasksState = localStorage.getItem('TASKS_STATE') || null

const store = configureStore({
    reducer: {
      task: persistedReducer
    },
  }
)

// Types and Vars

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Action = AnyAction;
export const useDispatch: () => AppDispatch = _useDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
export default store;
export const persistor = persistStore(store)