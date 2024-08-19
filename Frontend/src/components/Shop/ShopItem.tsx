import { Link } from "react-router-dom";
import { useState } from "react";
import AddToCartButton from "../reuse/AddToCartButton";
import Product from "../../store/api/types/product/product";

interface ShopItemProps {
  item: Product;
  sizeClasses: string;
  hover: boolean;
}

export default function ShopItem({ item, sizeClasses, hover }: ShopItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`relative pb-4 overflow-hidden ${sizeClasses}`}
      key={item.productId}
      onMouseEnter={hover ? handleMouseEnter : undefined}
      onMouseLeave={hover ? handleMouseLeave : undefined}
    >
      <Link
        to={`/shop/${item?.productId}`}
        state={{ item }}
        className={`w-full h-full justify-between flex flex-col`}
      >
        <div className="self-center px-2 pt-4 w-10/12 pb-4">
          <img
            src={item.image.filePath}
            alt="image"
            className="self-center w-full"
          />
        </div>
        <div className="mx-2 border-b-4">
          <h4 className="text-3xl md:text-lg font-semibold text-shade-4">
            {item?.name}
          </h4>
          <p className="text-xl md:text-base">
            Low price of{"   "}
            <span className="text-3xl md:text-xl text-red-800 font-semibold">
              ${item?.price}
            </span>
          </p>
        </div>
      </Link>
      {window.innerWidth > 768 && hover && (
        <AddToCartButton
          item={item}
          classNames={`absolute inset-x-0 bottom-0 h-24 transform transition-transform duration-300 ease-in-out px-4 py-2 flex justify-center items-center text-2xl ${
            isHovered && item.clothing == null
              ? "translate-y"
              : "translate-y-full"
          }`}
        />
      )}
    </div>
  );
}
