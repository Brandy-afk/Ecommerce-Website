import { useState } from "react";

interface ListFilterPanelProps {
  sizeOptions: number[];
  pageSize: number;
  setPageSize: (value: string) => void;
  setSearch: (value: string) => void;
}

export default function ListFilterPanel({
  sizeOptions,
  pageSize,
  setPageSize,
  setSearch,
}: ListFilterPanelProps) {
  const [searchState, setSearchState] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchState);
  };

  return (
    <>
      <form className="flex justify-between mb-2" onSubmit={onSubmit}>
        <div className="flex gap-1 items-center">
          <p>Show</p>
          <select
            className="p-1"
            name="entries"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            required
          >
            {sizeOptions.map((size) => (
              <option key={size} value={size.toString()}>
                {size}
              </option>
            ))}
          </select>
          <p>entries</p>
        </div>
        <div className="flex gap-1 items-center w-3/12">
          <p>Search:</p>
          <input
            className="p-1 border-2 rounded-sm border-gray-300 w-full"
            name="search"
            type="text"
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}
