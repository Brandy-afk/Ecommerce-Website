import RecentItem from "./RecentItem";
import Section from "../../main/Section";
import { Link } from "react-router-dom";
import { CiShop } from "react-icons/ci";
import { useFetchRecentDiscsQuery } from "../../../store/api/productApi";
import { createSkeletons } from "../../reuse/Skeleton";

export default function ShopInfo() {
  const { data, isLoading } = useFetchRecentDiscsQuery();

  const content = (
    <div className="grid lg:grid-cols-4 lg:grid-rows-2 md:grid-cols-3 grid-cols-2 justify-between items-center gap-8 max-h-max">
      {!isLoading && data
        ? data.map((item) => <RecentItem item={item} />)
        : createSkeletons({
            times: 7,
            className: "rounded-full p-6 size-72",
          })}
      <Link
        to={"/shop"}
        className="flex flex-col size-full text-shade-5 p-2 rounded-lg justify-center items-center
      cursor-pointer hover:scale-110"
      >
        <CiShop className="size-48" />
        <p className="text-5xl font-black ">Shop</p>
      </Link>
    </div>
  );

  return (
    <div>
      <Section
        heading="Brand new inventory!"
        subheading="Recently Added"
        container={content}
        isBackground={false}
        id="shopPreview"
      />
    </div>
  );
}
