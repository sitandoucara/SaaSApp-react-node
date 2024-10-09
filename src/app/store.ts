import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// Middleware pour le logging des actions
const loggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  //console.log("Dispatching action:", action);
  let result = next(action);
  //console.log("Next state:", storeAPI.getState());
  return result;
};

// Configuration du store Redux
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
