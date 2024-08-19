import { createContext, useContext } from "react";
import Filter from "../../components/Shop/Filter";

// Define the shape of the filter state
export interface FilterState {
  nameQuery: string;
  inStockOnly: boolean;
  manufacturers: string[];
  colorQuery: string[];
  discTypes: string[];
  productTypes: string[];
  minPrice: number;
  maxPrice: number;
  pageNumber: number;
  // Add more filter options as needed
}

// Special type for checkboxes for more generic behaviour
export type CheckBoxType =
  | "SET_MANUFACTURER"
  | "SET_COLOR"
  | "SET_TYPE"
  | "SET_PRODUCT";

// Define the shape of the filter actions
export type FilterAction =
  | { type: "RESET_FILTERS" }
  | {
      type: "SET_APPLY_INPUTS";
      payload: { name: string; min: number; max: number };
    }
  | { type: "SET_PAGE"; payload: { page: number } }
  | { type: "SET_SHOW_STOCK"; payload: boolean }
  | { type: CheckBoxType; payload: string[] };
// Add more action types as needed

// Create a context for the filter state
export const FilterContext = createContext<{
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
}>({
  state: {
    nameQuery: "",
    inStockOnly: true,
    manufacturers: [],
    colorQuery: [],
    discTypes: [],
    productTypes: [],
    minPrice: 0,
    maxPrice: 200,
    pageNumber: 1,
  },
  dispatch: () => {},
});

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
