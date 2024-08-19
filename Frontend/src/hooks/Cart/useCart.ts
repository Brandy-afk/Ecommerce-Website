import { CartItemType } from "../../store/slices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";

export const useCart = () => {
  const cartItems: CartItemType[] = useSelector(
    (state: RootState) => state.cart.items
  );

  const [note, setNote] = useState("");

  const setNoteValue = (value: string) => {
    setNote(value);
  };

  return { note, setNoteValue, cartItems };
};
