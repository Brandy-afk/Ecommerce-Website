import Filter from "../../components/Shop/Filter";
import Shop from "../../components/Shop/Shop";
import Contact from "../../components/reuse/Contact";
import { FilterContext, FilterState, FilterAction } from "./ShopContext";
import { useReducer, useState, useEffect, act } from "react";
import Banner from "./Banner";
import { useFetchProductsQuery } from "../../store/store";
import FetchProductsParams from "../../store/api/types/product/fetchProductsParams";
// Initial state for the filters
const initialState: FilterState = {
  nameQuery: "",
  inStockOnly: false,
  manufacturers: [],
  colorQuery: [],
  discTypes: [],
  productTypes: [],
  minPrice: 0,
  maxPrice: 0,
  pageNumber: 1,
  // Add more filter options as needed
};

// Reducer function to handle filter state updates
const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "RESET_FILTERS":
      return initialState;
    case "SET_APPLY_INPUTS":
      return {
        ...state,
        nameQuery: action.payload.name,
        minPrice: action.payload.min,
        maxPrice: action.payload.max,
      };
    case "SET_SHOW_STOCK":
      return { ...state, inStockOnly: action.payload };
    case "SET_MANUFACTURER":
      return { ...state, manufacturers: action.payload };
    case "SET_COLOR":
      return { ...state, colorQuery: action.payload };
    case "SET_TYPE":
      return { ...state, discTypes: action.payload };
    case "SET_PRODUCT":
      return { ...state, productTypes: action.payload };
    case "SET_PAGE":
      return { ...state, pageNumber: action.payload.page };
    // Add more cases for other filter options
    default:
      return state;
  }
};

export default function ShopPage() {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const { data, isFetching, refetch, isLoading } = useFetchProductsQuery(
    state as unknown as FetchProductsParams
  );

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [filterState, setFilterState] = useState(false);

  useEffect(() => {
    refetch();
  }, [state]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleFilter = () => {
    setFilterState(!filterState);
  };

  const isSmallScreen = screenWidth < 768;

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      <main className="bg-gradient-to-r from-tint-8 via-white to-tint-8">
        <div className="max-w-7xl center-container-x py-24 flex gap-4 px-4">
          {!isSmallScreen && <Filter isLoading={isFetching} />}
          <div className="w-full">
            <Banner
              isFetching={isFetching}
              total={data ? data.products.length : 0}
              setFilterState={toggleFilter}
              smallScreen={isSmallScreen}
              filterState={filterState}
            />
            {!isSmallScreen ? (
              <Shop
                items={data?.products}
                isFetching={isFetching}
                totalCount={data?.count ?? 0}
              />
            ) : filterState ? (
              <Filter isLoading={isLoading} />
            ) : (
              <Shop
                items={data?.products}
                isFetching={isFetching}
                totalCount={data?.count ?? 0}
              />
            )}
          </div>
        </div>
        <Contact />
      </main>
    </FilterContext.Provider>
  );
}
