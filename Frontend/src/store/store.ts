import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/cartSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import tokenSlice from "./slices/authSlice";
import { productApi } from "./api/productApi";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    token: tokenSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export { store };
export const { getState } = store;
export type RootState = ReturnType<typeof store.getState>;
export const {
  removeItem,
  addItem,
  deleteItem,
  clearCart,
  setLoading,
  loadCart,
} = cartSlice.actions;

export const { setToken, clearToken } = tokenSlice.actions;

export * from "./api/productApi";
export * from "./api/authApi";
