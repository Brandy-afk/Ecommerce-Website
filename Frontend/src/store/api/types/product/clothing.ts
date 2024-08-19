import { ClothingInventory } from "../inventory/clothingInventory";

export default interface Clothing {
  clothingType: number;
  cotton: number;
  polyester: number;
  wool: number;
  linen: number;
}

export interface ClothingWithInventory extends Clothing {
  inventories: ClothingInventory[];
}

export interface ClothingWithId extends Clothing {
  productId: string;
}
