import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.provider,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: !import.meta.env.PROD, // incase production disable redux dev tools
});
