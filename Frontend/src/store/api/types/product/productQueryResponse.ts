import Product from "./product";

export default interface ProductQueryReponse {
  products: Product[];
  count: number;
}
