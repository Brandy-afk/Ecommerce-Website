import Product from "../store/api/types/product/product";
import { CartItemType } from "../store/slices/cartSlice";

export const cartAggregator = (
  cartItems?: CartItemType[],
  products?: Product[]
) => {
  //is the cart empty?
  const emptyCart = cartItems?.length === 0 ?? true;

  //Total cost of cart
  const totalCost = emptyCart
    ? 0
    : products?.reduce(
        (accumulator, item) =>
          accumulator +
          item.price *
            (cartItems?.find(
              (cartItem) => cartItem.productId === item.productId
            )?.quantity || 0),
        0
      ) ?? 0;

  //Total amount of items in the cart
  const itemsInCart =
    cartItems?.reduce(
      (accumulator, current) => accumulator + current.quantity,
      0
    ) ?? 0;

  return { emptyCart, totalCost, itemsInCart };
};
