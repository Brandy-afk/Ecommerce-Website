import ImageResponse from "../image/imageUploadReponse";
import { ClothingWithInventory } from "./clothing";
import Disc from "./disc";

interface Product {
  description: string;
  trackingId: string;
  colors: string[];
  disc: Disc | null | undefined;
  clothing: ClothingWithInventory | null | undefined;
  productId: string;
  manufacturer: number;
  image: ImageResponse;
  productType: number;
  active: boolean;
  name: string;
  price: number;
  stock: number;
}

export default Product;
