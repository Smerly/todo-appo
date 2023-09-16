import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { add, remove, update } from './reducer.ts';
import type { RootState } from "./index.ts";


export const listenerMiddleware = createListenerMiddleware()
  listenerMiddleware.startListening({
    matcher: isAnyOf(add, update, remove),
    effect: (action, listenerApi) => localStorage.setItem("TASKS_STATE", JSON.stringify((listenerApi.getState() as RootState).task))
  })