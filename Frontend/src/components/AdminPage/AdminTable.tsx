import {
  flexRender,
  PaginationState,
  SortingState,
  Table,
} from "@tanstack/react-table";
import Button from "../reuse/Button";
import PaginationInfo from "./PaginationInfo";
import Product from "../../store/api/types/product/product";

interface TableProps {
  count: number;
  states: { pagination: PaginationState; sort: SortingState };
  isFetching: boolean;
  table: Table<Product>;
}

export default function AdminTable({
  count,
  states,
  isFetching,
  table,
}: TableProps) {
  return (
    <>
      <table className="w-full table-fixed bg-shade-4 rounded-lg mb-4">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-center py-4 text-white text-xl"
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              } text-lg text-shade-2 font-semibold`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                  }}
                  className="text-center mx-1"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="flex justify-between items-start">
        <PaginationInfo
          pageIndex={states.pagination.pageIndex}
          pageSize={states.pagination.pageSize}
          totalCount={count ?? 0}
        />
        <div className="flex gap-1 items-center">
          <span className="text-lg">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            secondary
            className="text-xl disabled:opacity-90 disabled:scale-90 disabled:bg-white"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isFetching}
          >
            Prev
          </Button>
          <Button
            secondary
            className="text-xl disabled:opacity-90 disabled:scale-90 disabled:bg-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isFetching}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
