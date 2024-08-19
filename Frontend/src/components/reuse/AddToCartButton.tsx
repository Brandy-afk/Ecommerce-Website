import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setLoading, addItem, getState } from "../../store/store";
import { toast, ToastOptions } from "react-toastify";
import Product from "../../store/api/types/product/product";
import { SizeEnum } from "../../enums/ClothingEnums";
import { validateStockQuantity } from "../../helpers/cartHelpers";

interface AddCartProps {
  item: Product;
  classNames: string;
  clothingSize?: SizeEnum;
  activeState?: boolean;
}

export default function AddToCartButton({
  item,
  classNames,
  clothingSize,
  activeState,
}: AddCartProps) {
  const dispatch = useDispatch();
  const loading: boolean = useSelector(
    (state: RootState) => state.cart.loading
  );

  const notify = (state: boolean, error?: string) => {
    const traits: ToastOptions = {
      theme: "colored",
      position: "top-center",
    };
    state
      ? toast.success("Added to cart!", traits)
      : toast.error(error, traits);
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(setLoading(true));
    setTimeout(() => {
      const response = validateStockQuantity(item, clothingSize);
      if (response.state) {
        dispatch(
          addItem({
            productId: item.productId,
            size: clothingSize,
          })
        );
        notify(true);
      } else {
        notify(false, response.error);
      }
      dispatch(setLoading(false));
    }, 750); // Buffer time of 1 second (adjust as needed)
  };

  const active =
    !loading &&
    (activeState === undefined || activeState === true) &&
    item.stock > 0;

  return (
    <Button
      oos={item.stock < 1 || activeState === false}
      primary={item.stock > 0 && !loading}
      loading={loading}
      rounded
      onClick={!active ? undefined : handleAddToCart}
      className={`${classNames}`}
    >
      <p>Add to Cart</p>
    </Button>
  );
}
