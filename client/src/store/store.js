import { configureStore } from "@reduxjs/toolkit";
import authReducer, { loginUser } from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.dispatch(loginUser());
