export default interface ClothingInventoryUpdateRequest {
  productId: string;
  inventories: ClothingInventory[];
}

export interface ClothingInventory {
  size: number;
  quantity: number;
}
