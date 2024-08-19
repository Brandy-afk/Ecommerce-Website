import { useState, useEffect } from "react";
import ShopItem from "./ShopItem";
import PaginationComp from "./Pagination/PaginationComp";
import Pagination from "./Pagination/Pagination";
import { createSkeletons } from "../reuse/Skeleton";
import EmptyItem from "./EmptyItem";
import Product from "../../store/api/types/product/product";

const ITEMS_PER_PAGE: number = 12;

interface ShopProps {
  items: Product[] | undefined;
  totalCount: number;
  isFetching: boolean;
}

export default function Shop({ items, totalCount, isFetching }: ShopProps) {
  const sizeClass = "h-[22rem] w-64 md:h-72 md:w-48 lg:h-80 lg:w-60";

  let renderedItems: JSX.Element[] | null = null;
  if (items) {
    renderedItems = items.map((item) => {
      return (
        <ShopItem
          key={item.productId}
          item={item}
          sizeClasses={sizeClass}
          hover={true}
        />
      );
    });
  }

  while (renderedItems && renderedItems.length < ITEMS_PER_PAGE) {
    renderedItems.push(
      <EmptyItem sizeClasses={sizeClass} key={crypto.randomUUID()} />
    );
  }

  return (
    <div className="flex flex-col border-b-0 flex-grow">
      <div className="flex-grow grid grid-cols-2 justify-items-center md:grid-cols-3 lg:grid-cols-4 p-4 gap-8 mb-8">
        {!isFetching
          ? renderedItems
          : createSkeletons({
              times: 12,
              className: "h-80 w-60 pb-4",
            })}
      </div>
      {items && (
        <PaginationComp totalCount={totalCount} itemsPerPage={ITEMS_PER_PAGE} />
      )}
    </div>
  );
}
