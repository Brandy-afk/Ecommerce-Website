import { Link } from "react-router-dom";
import Product from "../../../store/api/types/product/product";

export default function RecentItem({ item }: { item: Product }) {
  return (
    <Link
      key={item.productId}
      to={`/shop/${item.productId}`}
      className={`hover:scale-110 transition-all rounded-full p-6 size-672 cursor-pointer shadow-xl border-4`}
    >
      <img src={item.image.filePath} alt="disc" className="w-full" />
    </Link>
  );
}
