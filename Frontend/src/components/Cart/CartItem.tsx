import { CartItemType } from "../../store/slices/cartSlice";
import { addItem, removeItem, deleteItem } from "../../store/store";
import { useDispatch } from "react-redux";
import Image from "../reuse/Image";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Product from "../../store/api/types/product/product";
import { toast } from "react-toastify";
import { ManufacturerEnum } from "../../enums/ProductEnums";
import { validateStockQuantity } from "../../helpers/cartHelpers";
import { SizeEnum } from "../../enums/ClothingEnums";
import { useNavigate } from "react-router-dom";

interface CartItemProp {
  item: Product | undefined;
  key: number;
  cartItem: CartItemType;
  stock: number;
}

export default function CartItem({ item, cartItem, key, stock }: CartItemProp) {
  const dispatch = useDispatch();
  const nav = useNavigate();

  if (!item) {
    return (
      <div key={key}>
        Error for {cartItem.productId} : {cartItem.size}
      </div>
    );
  }

  const validationResponse = validateStockQuantity(
    item,
    cartItem.size,
    cartItem
  );

  const onSubtractPressed = () => {
    console.log("pressed");
    dispatch(
      removeItem({
        productId: item.productId,
        size: cartItem.size,
      })
    );
  };

  const onAddPressed = () => {
    if (!validationResponse.state) {
      toast.error(validationResponse.error, {
        theme: "colored",
        position: "top-center",
      });
      return;
    }
    dispatch(
      addItem({
        productId: item.productId,
        size: cartItem.size,
      })
    );
  };

  const onDeletePressed = () => {
    dispatch(
      deleteItem({
        productId: item.productId,
        size: cartItem.size,
      })
    );
  };

  const customDisc: boolean = (item.disc && item.disc.custom) ?? false;

  const iconClasses = `size-12 border-4 border-shade-2 p-2 md:border-none md:p-0 md:size-7 lg:size-6`;

  return (
    <div
      key={key}
      className="border-t-2 flex items-center justify-between h-56 md:h-44 lg:h-36"
    >
      <div className="grid grid-cols-cart-item-md lg:grid-cols-cart-item content-center h-full w-10/12">
        <Image
          src={item.image.filePath}
          alt="Product Image"
          classNames="size-full p-2 cursor-pointer"
          onClick={() => nav(`/shop/${item.productId}`)}
        />
        <div className="flex flex-col flex-grow justify-around h-full py-3">
          <div>
            <h3 className="mb-2 md:mb-0 text-4xl md:text-xl lg:text-lg font-semibold md:leading-5">
              {item.name}
            </h3>
            <p className="text-2xl md:text-lg lg:text-base">
              {ManufacturerEnum[item.manufacturer]}
              {cartItem.size && (
                <>
                  <span className="mx-2">|</span>
                  <span className="font-bold">{SizeEnum[cartItem.size]}</span>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center justify-start gap-8 w-full">
            <FaMinus
              className={`${iconClasses} ${
                customDisc ? "text-gray-200" : "cursor-pointer active:scale-125"
              }`}
              onClick={customDisc ? undefined : onSubtractPressed}
            />
            <span className="text-center font-light text-6xl md:text-5xl lg:text-4xl">
              {cartItem.quantity}
            </span>
            <FaPlus
              className={`${iconClasses} ${
                customDisc || !validationResponse.state
                  ? "text-gray-200"
                  : "cursor-pointer active:scale-125"
              }`}
              onClick={
                customDisc || !validationResponse.state
                  ? undefined
                  : onAddPressed
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end flex-grow justify-between h-full pr-3 py-3">
        <strong className="text-4xl md:text-2xl lg:text-xl">
          ${(item.price * cartItem.quantity).toFixed(2)}
        </strong>
        <FaTrash
          className="size-12 md:size-7 lg:size-6 text-gray-300 hover:text-shade-2 cursor-pointer"
          onClick={onDeletePressed}
        />
      </div>
    </div>
  );
}
