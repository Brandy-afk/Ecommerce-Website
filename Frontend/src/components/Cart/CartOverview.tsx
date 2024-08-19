import CartItem from "./CartItem";
import { useState } from "react";
import { CartItemType } from "../../store/slices/cartSlice";
import Product from "../../store/api/types/product/product";
import { getProductStock } from "../../helpers/cartHelpers";

interface CartOverviewProps {
  products: Product[] | undefined;
  total: number;
  cartItems: CartItemType[];
  note: string;
  setNote: (value: string) => void;
}

export default function CartOverview({
  products,
  cartItems,
  total,
  setNote,
  note,
}: CartOverviewProps) {
  const [noteToggle, setNoteToggle] = useState(false);

  let content: JSX.Element[] | null = null;

  if (products && Array.isArray(products)) {
    content = cartItems.map((cartItem, index) => {
      const product = products.find(
        (ci) => ci.productId === cartItem.productId
      );

      if (!product) return <div>Error</div>;

      return (
        <CartItem
          item={product}
          cartItem={cartItem}
          key={index}
          stock={getProductStock(product, cartItem.size)}
        />
      );
    });
  }

  return (
    <section className="w-full border-t-2 border-b-2 max-h-[80%] overflow-y-scroll">
      <div>{content && content}</div>
      <div className="bg-tint-8 py-10 px-4 md:p-4 border-t-2">
        <div className="flex items-center gap-2 text-nowrap mb-1">
          <input
            className="size-10 md:size-7 lg:size-5"
            type="checkbox"
            checked={noteToggle}
            onChange={(e) => setNoteToggle(!noteToggle)}
          />
          <label className="text-3xl md:text-2xl lg:text-xl font-light">
            Add note to order.
          </label>
        </div>
        {noteToggle && (
          <textarea
            className="w-full border-2 text-2xl md:text-xl lg:text-lg p-1"
            rows={5}
            cols={50}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter your note here"
          />
        )}
      </div>
      <div className="border-t-2 py-10 px-4 md:p-4 bg-tint-8 flex items-center justify-between font-bold text-4xl md:text-3xl lg:text-2xl">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </section>
  );
}
