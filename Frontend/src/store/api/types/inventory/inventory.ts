export default interface InventoryWithID extends Inventory {
  productId: string;
}

export interface Inventory {
  quantity: number;
}
