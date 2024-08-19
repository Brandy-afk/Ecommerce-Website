import { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

export type ActiveState = "all" | "active" | "unactive";

export interface ListState {
  searchString: string;
  active: ActiveState;
}

export const useListState = () => {
  const [listState, setListState] = useState<ListState>({
    searchString: "",
    active: "all",
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [sort, setSort] = useState<SortingState>([]);

  const [deleteModalState, setDeleteModalState] = useState({
    state: false,
    id: "",
  });

  const setPageSize = (value: string) => {
    setPagination({
      ...pagination,
      pageSize: parseInt(value),
    });
  };

  const setActiveState = (value: ActiveState) =>
    setListState({
      ...listState,
      active: value,
    });

  const setSearchState = (value: string) => {
    setListState({
      ...listState,
      searchString: value,
    });
  };

  return {
    listState,
    setSearchState,
    setActiveState,
    deleteModalState,
    setDeleteModalState,
    pagination,
    setPagination,
    setPageSize,
    sort,
    setSort,
  };
};
