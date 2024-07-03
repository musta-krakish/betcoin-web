import { configureStore } from "@reduxjs/toolkit";

const initialState = {};

export const store = configureStore({
  reducer: (state = initialState) => state,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
