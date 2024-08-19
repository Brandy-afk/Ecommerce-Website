import Button from "../reuse/Button";

interface CartFooterProps {
  price: number;
  empty: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartFooter({
  price,
  empty,
  onClose,
  onCheckout,
}: CartFooterProps) {
  const buttonClasses = "justify-center w-full py-6 md:py-4 lg:py-2";

  return (
    <section className="flex flex-col lg:h-32 gap-2 justify-end text-4xl md:text-3xl lg:text-2xl w-full px-4">
      {!empty && (
        <Button
          primary
          outlineWithBackground
          className={buttonClasses}
          onClick={onCheckout}
        >
          <p>{`Checkout - $${price.toFixed(2)}`}</p>
        </Button>
      )}
      <Button
        secondary
        outlineWithBackground
        className={buttonClasses}
        onClick={onClose}
      >
        <p>Continue Shopping</p>
      </Button>
    </section>
  );
}
