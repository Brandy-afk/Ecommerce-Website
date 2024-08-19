import { useMemo } from "react";
import { Skeleton } from "../reuse/Skeleton";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useProductModification } from "../../hooks/AdminLists/ProductList/useProductModification";
import ConfirmModel from "../reuse/ConfirmModel";
import Product from "../../store/api/types/product/product";
import { useFetchProductsQuery } from "../../store/store";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import ButtonOptions from "./ButtonOptions";
import { ActiveState, useListState } from "../../hooks/AdminLists/useListState";
import ListFilterPanel from "./ListFilterPanel";
import AdminTable from "./AdminTable";
import OptionsCell from "./OptionsCell";

export default function ProductList() {
  const {
    listState, //const listState: ProductListState
    setActiveState, // const setActiveState: (value: activeState) => void
    setSearchState,
    setDeleteModalState,
    deleteModalState,
    setPageSize,
    pagination,
    setPagination,
    sort,
    setSort,
  } = useListState();

  const { data, isLoading, isFetching } = useFetchProductsQuery({
    nameQuery: listState.searchString ?? undefined,
    activeOnly:
      listState.active !== "all"
        ? listState.active === "active"
          ? true
          : false
        : undefined,
    pageNumber: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    isDescending: sort.length > 0 ? sort[0].desc : undefined,
    sortQuery: sort.length > 0 ? sort[0].id : undefined,
  });

  const {
    handleDelete,
    handleEdit,
    isLoading: loadingDelete,
  } = useProductModification();

  const onDeleteConfirm = async () => {
    try {
      await handleDelete(deleteModalState.id);
      alert("Item has been deleted!");
    } catch (error: any) {
      alert(`An error occured - ${error.data.title}`);
    }

    setDeleteModalState({ state: false, id: "" });
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Product>();

    return [
      columnHelper.accessor("image.filePath", {
        id: "image",
        header: "Image",
        cell: (info) => (
          <div className="p-1 border-1">
            <img
              className="size-full object-cover rounded-lg p-2"
              src={info.getValue()}
              alt={`Product image`}
            />
          </div>
        ),
        size: 80,
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("active", {
        header: "Active",
        cell: (info) => <div>{info.getValue() ? "True" : "False"}</div>,
      }),
      columnHelper.accessor("price", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => column.toggleSorting()}
          >
            Name
            {column.getIsSorted() === "asc" ? (
              <FaSortUp className="ml-2" />
            ) : column.getIsSorted() === "desc" ? (
              <FaSortDown className="ml-2" />
            ) : (
              <FaSort className="ml-2" />
            )}
          </div>
        ),
        cell: (info) => `$${info.getValue()}`,
      }),
      columnHelper.accessor("productType", {
        header: "Product Type",
        cell: (info) => {
          switch (info.getValue()) {
            case 1:
              return <p>Disc</p>;
            case 2:
              return <p>Clothing</p>;
            default:
              return <div>Error</div>;
          }
        },
      }),
      columnHelper.accessor("stock", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => column.toggleSorting()}
          >
            Stock
            {column.getIsSorted() === "asc" ? (
              <FaSortUp className="ml-2" />
            ) : column.getIsSorted() === "desc" ? (
              <FaSortDown className="ml-2" />
            ) : (
              <FaSort className="ml-2" />
            )}
          </div>
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("productId", {
        header: "",
        cell: (info) => (
          <OptionsCell
            column={info}
            options={[
              { value: "Edit", onInteraction: handleEdit },
              {
                value: "Delete",
                onInteraction: () =>
                  setDeleteModalState({ state: true, id: info.getValue() }),
              },
            ]}
          />
        ),
        size: 50,
      }),
    ];
  }, [handleEdit, handleDelete]); // Only re-create if these functions change

  const table = useReactTable({
    columns,
    data: data?.products ?? [],
    pageCount: data ? Math.ceil(data?.count / pagination.pageSize) : -1,
    state: {
      pagination: pagination,
      sorting: sort,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSort,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[36rem]" />
      ) : (
        <div>
          <div className="mb-2">
            <ButtonOptions<ActiveState>
              textValues={["all", "active", "unactive"]}
              setSelected={setActiveState}
              activeState={listState.active}
            />
          </div>

          <ListFilterPanel
            sizeOptions={[5, 10, 50, 100]}
            pageSize={pagination.pageSize}
            setPageSize={setPageSize}
            setSearch={setSearchState}
          />

          <AdminTable
            table={table}
            count={data?.count ?? 0}
            states={{ pagination, sort }}
            isFetching={isFetching}
          />

          <ConfirmModel
            body="Please ensure that you really want to delete this product as this action is not reversible!"
            header="Delete Product"
            risk={true}
            onConfirm={onDeleteConfirm}
            onCancel={() => setDeleteModalState({ state: false, id: "" })}
            isOpen={deleteModalState.state}
            isLoading={loadingDelete}
          />
        </div>
      )}
    </>
  );
}
