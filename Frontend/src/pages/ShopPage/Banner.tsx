import { Skeleton } from "../../components/reuse/Skeleton";
import { IoFilterCircle } from "react-icons/io5";
import { IoFilterCircleOutline } from "react-icons/io5";

export default function Banner({
  isFetching,
  total,
  setFilterState,
  smallScreen,
  filterState,
}: {
  total: number;
  isFetching: boolean;
  setFilterState: () => void;
  smallScreen: boolean;
  filterState: boolean;
}) {
  return (
    (!isFetching && (
      <div className="contact-container h-44 md:h-32 rounded-lg flex justify-between items-center">
        <h2 className="ml-4 md:ml-10 text-6xl font-black text-tint-9">
          {total} Products
        </h2>
        {smallScreen &&
          (filterState ? (
            <IoFilterCircle
              className={`size-28 mr-6 shadow-2xl text-tint-8`}
              onClick={setFilterState}
            />
          ) : (
            <IoFilterCircleOutline
              className={`size-28 mr-6 shadow-2xl text-tint-8`}
              onClick={setFilterState}
            />
          ))}
      </div>
    )) || <Skeleton className="h-32 rounded-lg" />
  );
}
