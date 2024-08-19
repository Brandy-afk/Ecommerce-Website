import Product from "../../store/api/types/product/product";
import { useFetchProductsQuery } from "../../store/store";
import ShopItem from "../Shop/ShopItem";
import { CiShop } from "react-icons/ci";
import { Link } from "react-router-dom";
import { createSkeletons } from "../reuse/Skeleton";
import SimilarItem from "./SimilarItem";

interface SimilarProductProps {
  item: Product | undefined;
  isFetching: boolean;
}

export default function SimilarProducts({
  item,
  isFetching,
}: SimilarProductProps) {
  const { data } = useFetchProductsQuery(
    {
      colorQuery: item?.colors,
      productTypes: [item?.productType.toString() ?? ""],
      limit: 5,
    },
    {
      skip: item === undefined,
    }
  );

  return (
    <div className="max-w-7xl center-container-x px-8 pb-20">
      <h3 className="uppercase font-extrabold text-2xl text-shade-5 mb-4 tracking-tight">
        Similar Products
      </h3>
      <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 lg:grid-cols-6 lg:grid-rows-1 h-max gap-0">
        {data && !isFetching
          ? data.products.map((p, i) => {
              if (p.productId === item?.productId) return;
              return <SimilarItem key={i} item={p} />;
            })
          : createSkeletons({
              times: 5,
              className: "size-10/12 p-4",
            })}
        <Link
          to={"/shop"}
          className="ml-8 flex flex-col w-32 text-shade-5 p-2 rounded-lg justify-center items-center
      cursor-pointer hover:scale-110"
        >
          <CiShop className="size-48 md:size-32" />
          <p className="text-5xl md:text-3xl font-black">Shop</p>
        </Link>
      </div>
    </div>
  );
}
