interface FetchProductsParams {
  activeOnly?: boolean;
  productTypes?: string[];
  pageNumber?: number;
  limit?: number;
  colorQuery?: string[];
  manufacturers?: number[] | string[];
  discTypes?: number[] | string[];
  nameQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  idQuery?: string[];
  sortQuery?: string;
  isDescending?: boolean;
}

export default FetchProductsParams;
