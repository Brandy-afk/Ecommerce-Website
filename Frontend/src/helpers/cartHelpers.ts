import { error } from "console";
import { SizeEnum } from "../enums/ClothingEnums";
import Product from "../store/api/types/product/product";
import { CartItemType, CartPayload } from "../store/slices/cartSlice";
import { getState } from "../store/store";

export function findCartItem(
  cart: CartItemType[],
  payload: CartPayload
): CartItemType | undefined {
  return cart.find((item) => {
    return (
      item.productId === payload.productId &&
      (!payload.size || payload.size === item.size)
    );
  });
}

export function filterOutItem(
  cart: CartItemType[],
  loading: boolean,
  itemId: string,
  size?: number
): { items: CartItemType[]; loading: boolean } {
  return {
    items: cart.filter(
      (item) => item.productId !== itemId || item.size !== size
    ),
    loading: loading,
  };
}

export interface StockValidationReponse {
  state: boolean;
  error?: string;
}

export function validateStockQuantity(
  product: Product,
  size?: SizeEnum,
  cartItem?: CartItemType
): StockValidationReponse {
  if (!cartItem) {
    cartItem = getState().cart.items.find(
      (i) => i.productId === product.productId && i.size === size
    );
  }

  const check = (cartItem: CartItemType): StockValidationReponse => {
    const isValid =
      cartItem?.quantity + 1 <= getProductStock(product, cartItem.size);
    return {
      state: isValid,
      error: "Can't add more of this item!",
    };
  };

  return cartItem
    ? product.disc
      ? product.disc.custom
        ? { state: false, error: "Can't add more of this item!" }
        : check(cartItem)
      : check(cartItem)
    : { state: true };
}

export function getProductStock(product: Product, size?: SizeEnum) {
  return (
    (size
      ? product?.clothing?.inventories.find((i) => i.size === size)?.quantity
      : product?.stock) ?? 0
  );
}
