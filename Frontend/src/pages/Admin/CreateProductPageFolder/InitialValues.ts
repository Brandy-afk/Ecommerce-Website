import Clothing, {
  ClothingWithInventory,
} from "../../../store/api/types/product/clothing";
import Disc from "../../../store/api/types/product/disc";

export interface ProductFormInputs {
  name: string;
  trackingId: string;
  description: string;
  price: number;
  colors: string;
  manufacturer: number;
  productType: number;
  active: boolean;
  stock: number;
  imageDescription: string;
  image: File | null;
}

export const productState: ProductFormInputs = {
  name: "", //string
  trackingId: "", //string
  description: "", //string
  price: 0, //number
  colors: "", //string of colors such that the field looks like this red,blue,green
  manufacturer: 0, // Based off an enum and should be a certain number of choices
  productType: 0, // Based off an enum and should be a certain number of choices
  active: true, // boolean
  stock: 0, // number
  imageDescription: "", // string
  image: null, // Should be a file as it will be where the image is uploaded
};

export const clothingState: ClothingWithInventory = {
  clothingType: 0, // Based off an enum and should be a certain number of choices
  inventories: [], // Is a list of this class -> (
  //export interface ClothingInventory {
  //size: number;
  //quantity: number;
  //} )
  cotton: 0, // number
  polyester: 0, // number
  wool: 0, // number
  linen: 0, // number
};

export const discState: Disc = {
  custom: true, //boolean
  discType: 0, // Based off an enum and should be a certain number of choices
  diameter: 0, // number
  thickness: 0, // number
  weight: 0, // number
};
