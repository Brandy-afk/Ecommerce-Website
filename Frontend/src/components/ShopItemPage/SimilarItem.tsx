import { useState } from "react";
import Product from "../../store/api/types/product/product";
import { Link } from "react-router-dom";
import AddToCartButton from "../reuse/AddToCartButton";

interface SimilarItemProps {
  item: Product;
}

export default function SimilarItem({ item }: SimilarItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`h-full w-10/12 relative pb-4 border-b-4 hover:shadow-xl`}
      key={item.productId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/shop/${item?.productId}`}
        state={{ item }}
        className={`size-full justify-between flex flex-col`}
      >
        <div className="self-center size-40 p-2">
          <img
            src={item.image.filePath}
            alt="image"
            className="self-center size-full object-contain"
          />
        </div>
        <div className="mx-2 flex flex-col justify-end">
          <h4 className="text-center text-xl md:text-lg font-semibold text-shade-4 text-balance">
            {item?.name}
          </h4>
          <p className="text-2xl text-3xl md:text-2xl text-red-800 font-semibold text-center">
            ${item?.price}
          </p>
        </div>
      </Link>
    </div>
  );
}
