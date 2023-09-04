import { AnyAction, configureStore, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector
} from "react-redux";
import { listenerMiddleware } from "./middleware.ts";
import taskReducer, { add, remove, update } from './reducer.ts';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
const persistedReducer = persistReducer({
  key: 'root',
  storage,
}, taskReducer)

const tasksState = localStorage.getItem('TASKS_STATE') || null

const store = configureStore({
    preloadedState: {
      tasks: tasksState === null ? [{title: '', priority: 0, complexity: 0, dueDatex: 0, checklist: [], tags: [], originalTitle: '', done: false }] : tasksState
    },
    reducer: {
      task: persistedReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), listenerMiddleware.middleware]
  }
)

store.subscribe(()=>{
  localStorage.setItem('TASKS_STATE', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Action = AnyAction;

export const useDispatch: () => AppDispatch = _useDispatch;

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
export default store;

export const persistor = persistStore(store)