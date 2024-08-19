import { useEffect } from "react";
import { CartItemType } from "../../store/slices/cartSlice";
import { useFetchProductsQuery } from "../../store/store";

export const useCartQuery = (cartItems: CartItemType[]) => {
  const { data, refetch, isFetching } = useFetchProductsQuery(
    {
      idQuery: cartItems.map((i) => i.productId),
    },
    {
      skip: cartItems.length === 0,
    }
  );

  useEffect(() => {
    if (cartItems.length > 0) {
      refetch();
    }
  }, [cartItems.length, refetch]);

  return { data, isFetching };
};
