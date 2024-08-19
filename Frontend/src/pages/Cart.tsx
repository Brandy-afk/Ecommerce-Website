import { IoMdClose } from "react-icons/io";
import { useCreateCheckoutSessionMutation } from "../store/store";
import CartOverview from "../components/Cart/CartOverview";
import CartFooter from "../components/Cart/CartFooter";
import { Skeleton } from "../components/reuse/Skeleton";
import EmptyCart from "../components/Cart/EmptyCart";
import ReactModal from "react-modal";
import { useCart } from "../hooks/Cart/useCart";
import { useCartQuery } from "../hooks/Cart/useCartQuery";
import { cartAggregator } from "../helpers/cartAggregator";
import { loadStripe } from "@stripe/stripe-js";
import { GoSync } from "react-icons/go";

interface CartProps {
  onClosePressed: () => void;
  isOpen: boolean;
}

export default function Cart({ onClosePressed, isOpen }: CartProps) {
  const { note, setNoteValue, cartItems } = useCart();
  const { data, isFetching } = useCartQuery(cartItems);
  const { emptyCart, totalCost, itemsInCart } = cartAggregator(
    cartItems,
    data?.products
  );

  const [createCheckoutSession, { isLoading: isLoadingCheckoutSession }] =
    useCreateCheckoutSessionMutation();

  const onCheckout = async () => {
    try {
      const stripe = await loadStripe("PUT_STRIPE_PRODUCTION_KEY");

      const createCheckoutResponse = await createCheckoutSession({
        cart: cartItems,
        note: note ? note : undefined,
      }).unwrap();

      const result = stripe?.redirectToCheckout({
        sessionId: createCheckoutResponse.sessionId,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClosePressed}
      className="fixed top-0 right-0 h-screen w-full md:w-6/12 lg:w-5/12 xl:w-4/12 bg-tint-9 text-shade-2 py-2 z-[100] outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[99]"
      contentLabel="Confirm Action"
    >
      <div className="flex items-center px-2 justify-between mb-2">
        <IoMdClose
          onClick={onClosePressed}
          className="size-16 lg:size-14 text-gray-200 cursor-pointer"
        />
        <span className="text-4xl lg:text-3xl">{`Cart (${itemsInCart})`}</span>
      </div>
      <div className="flex flex-col justify-between items-center h-full pb-20">
        {(!emptyCart && data && (
          <CartOverview
            note={note}
            setNote={setNoteValue}
            products={data?.products ?? undefined}
            total={totalCost}
            cartItems={cartItems}
          />
        )) ||
          (isFetching && (
            <Skeleton
              className="w-11/12 h-full
        "
            />
          )) || <EmptyCart onClosePressed={onClosePressed} />}
        {(!isFetching && (
          <CartFooter
            onCheckout={onCheckout}
            price={totalCost}
            onClose={onClosePressed}
            empty={emptyCart}
          />
        )) || <Skeleton className="h-32 w-11/12" />}

        {isLoadingCheckoutSession && (
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-white text-center">
              <GoSync className="animate-spin text-8xl mx-auto mb-4" />
              <p className="text-3xl">Processing your checkout...</p>
            </div>
          </div>
        )}
      </div>
    </ReactModal>
  );
}
