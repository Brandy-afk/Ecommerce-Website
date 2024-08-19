import { CartItemType } from "../../../slices/cartSlice";

export default interface CreateCheckoutResponse {
  sessionId: string;
}

export interface CreateCheckoutRequest {
  cart: CartItemType[];
  note?: string;
}
