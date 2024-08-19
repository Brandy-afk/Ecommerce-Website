import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { findCartItem, filterOutItem } from "../../helpers/cartHelpers";
import Cookies from "js-cookie";

export interface CartItemType extends CartPayload {
  quantity: number;
}

export interface CartPayload {
  productId: string;
  size?: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as CartItemType[],
    loading: false,
  },
  reducers: {
    // setAmount(state, action: PayloadAction<CartItemType>) {
    //   if (action.payload.quantity >= 1 && action.payload.quantity <= 5) {
    //     const item = findCartItem(state.items, action.payload);
    //     if (item) {
    //       item.quantity = action.payload.quantity;
    //     }
    //   }
    // },
    addItem(state, action: PayloadAction<CartPayload>) {
      const existingItem = findCartItem(state.items, action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          productId: action.payload.productId,
          quantity: 1,
          size: action.payload.size,
        });
      }
      Cookies.set("cart", JSON.stringify(state.items));
    },
    removeItem(state, action: PayloadAction<CartPayload>) {
      const existingItem = findCartItem(state.items, action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      } else if (existingItem) {
        state = filterOutItem(
          state.items,
          state.loading,
          action.payload.productId,
          action.payload.size
        );
      } else {
        throw new Error(
          `Item not found with ID:${action.payload.productId} - REMOVE`
        );
      }
      Cookies.set("cart", JSON.stringify(state.items));
    },
    deleteItem(state, action: PayloadAction<CartPayload>) {
      const existingItem = findCartItem(state.items, action.payload);
      if (existingItem) {
        state = filterOutItem(
          state.items,
          state.loading,
          action.payload.productId,
          action.payload.size
        );
        Cookies.set("cart", JSON.stringify(state.items));
        return state;
      } else {
        throw new Error(
          `Item not found with ID:${action.payload.productId} - DELETE`
        );
      }
    },
    clearCart(state) {
      state.items = [];
      Cookies.set("cart", JSON.stringify(state.items));
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    loadCart(state, action: PayloadAction<CartItemType[]>) {
      state.items = action.payload;
    },
  },
});

export { cartSlice };
