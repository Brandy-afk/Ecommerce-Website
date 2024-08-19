import Clothing from "./clothing";
import Disc from "./disc";
import { ImageUploadRequest } from "../image/imageUploadRequest";

export default interface UpdateProductParams {
  productId: string;
  name: string;
  trackingId: string;
  description: string;
  price: number;
  colors: string[];
  manufacturer: number;
  active: boolean;
}
