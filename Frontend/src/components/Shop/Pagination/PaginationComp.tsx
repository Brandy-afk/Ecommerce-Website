import Pagination from "./Pagination";
import classNames from "classnames";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
} from "react-icons/fa";
import Button from "../../reuse/Button";
import { useFilterContext } from "../../../pages/ShopPage/ShopContext";

interface PaginationCompProps {
  totalCount: number;
  itemsPerPage: number;
}

export default function PaginationComp({
  totalCount,
  itemsPerPage,
}: PaginationCompProps) {
  const { state, dispatch } = useFilterContext();

  const maxPage = Math.ceil(totalCount / itemsPerPage);

  const isFirstPage = () => state.pageNumber === 1;
  const isLastPage = () => state.pageNumber === maxPage;

  const setPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, maxPage));
    dispatch({ type: "SET_PAGE", payload: { page: newPage } });
  };

  const setNextPage = () => {
    if (!isLastPage()) {
      setPage(state.pageNumber + 1);
    }
  };

  const setPreviousPage = () => {
    if (!isFirstPage()) {
      setPage(state.pageNumber - 1);
    }
  };

  const startingPage = Math.max(1, state.pageNumber - 4);
  const renderedNumbers = Array.from({ length: 9 }, (_, index) => {
    const page = startingPage + index;
    const isCurrentPage = page === state.pageNumber;
    const notPage = page > maxPage;

    const classes = classNames({
      "font-black": isCurrentPage,
      "cursor-pointer": !isCurrentPage && !notPage,
    });

    return (
      <li
        key={index}
        className={classes}
        onClick={
          isCurrentPage || notPage
            ? undefined
            : () => {
                setPage(index + 1);
              }
        }
      >
        {notPage ? "." : page}
      </li>
    );
  });

  const iconClasses = "md:size-7 lg:size-5 text-gray-300 hover:text-shade-2";
  const leftIconClasses = classNames(iconClasses, {
    "cursor-pointer": isFirstPage(),
  });
  const rightIconClasses = classNames(iconClasses, {
    "cursor-pointer": isLastPage(),
  });

  return (
    <div className="w-full">
      {(window.innerWidth > 768 && (
        <>
          <p className="text-center text-lg md:text-sm mb-2">Page</p>
          <ul className="flex justify-center gap-4 items-center text-2xl lg:text-lg">
            <li>
              <div className="flex items-center gap-1">
                <FaAngleDoubleLeft
                  className={leftIconClasses}
                  onClick={
                    isFirstPage()
                      ? undefined
                      : () => {
                          setPage(1);
                        }
                  }
                />
                <FaAngleLeft
                  className={leftIconClasses}
                  onClick={
                    isFirstPage()
                      ? undefined
                      : () => {
                          setPreviousPage();
                        }
                  }
                />
              </div>
            </li>
            <ul className="grid grid-cols-9 content-center text-center w-4/12">
              {renderedNumbers}
            </ul>
            <li>
              <div className="flex items-center gap-1">
                <FaAngleRight
                  className={rightIconClasses}
                  onClick={
                    isLastPage()
                      ? undefined
                      : () => {
                          setNextPage();
                        }
                  }
                />
                <FaAngleDoubleRight
                  className={rightIconClasses}
                  onClick={
                    isLastPage()
                      ? undefined
                      : () => {
                          setPage(maxPage);
                        }
                  }
                />
              </div>
            </li>
          </ul>
        </>
      )) || (
        <div className="flex justify-center gap-4 items-center">
          <Button
            secondary
            className="text-xl h-20"
            onClick={
              isFirstPage()
                ? undefined
                : () => {
                    setPreviousPage();
                  }
            }
          >
            Prev
          </Button>
          <p className="text-2xl">Page {state.pageNumber}</p>
          <Button
            secondary
            className="text-xl h-20"
            onClick={
              isLastPage()
                ? undefined
                : () => {
                    setNextPage();
                  }
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
