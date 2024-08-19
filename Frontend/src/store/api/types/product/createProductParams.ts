import { ClothingWithInventory } from "./clothing";
import Disc from "./disc";

export default interface CreateProductParams {
  name: string;
  trackingId: string;
  imageId: string;
  description: string;
  price: number;
  colors: string[];
  manufacturer: number;
  productType: number;
  active: boolean;
  stock: number;
  disc?: Disc;
  clothing?: ClothingWithInventory;
}
