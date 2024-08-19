import Product from "../../../store/api/types/product/product";
import DiscOverview from "./DiscOverview";
import ClothingOverview from "./ClothingOverview";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../../reuse/Skeleton";

interface OverviewProps {
  item: Product | undefined;
  isFetching: boolean;
}

export interface OverviewChildProps {
  item: Product;
}

export const accordionCSS =
  "w-10/12 border-2 border-neutral-400 text-neutral-700 shadow-xl mb-2";

export default function ItemOverview({ item, isFetching }: OverviewProps) {
  const nav = useNavigate();

  if (item && !isFetching) {
    if (item.disc) return <DiscOverview item={item} />;
    if (item.clothing) return <ClothingOverview item={item} />;
  }

  if (!item && !isFetching) nav("/shop");

  return (
    <div className="grid-cols-2 md:grid-cols-1/2 grid pb-20 min-h-[60vh]">
      <div className="flex justify-center">
        <Skeleton className="w-10/12 h-full" />
      </div>
      <div className="flex justify-start">
        <Skeleton className="w-10/12 h-full" />
      </div>
    </div>
  );
}
