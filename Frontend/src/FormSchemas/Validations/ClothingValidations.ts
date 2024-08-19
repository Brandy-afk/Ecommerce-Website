import * as Yup from "yup";
import { ClothingTypeEnum } from "../../enums/ClothingEnums";
import { ClothingInventory } from "../../store/api/types/inventory/clothingInventory";

export const clothingTypeSchema = Yup.number()
  .oneOf(Object.values(ClothingTypeEnum) as number[], "Invalid Clothing Type")
  .required("Clothing type is required");

export const clothingInventorySchema: Yup.ObjectSchema<ClothingInventory> =
  Yup.object().shape({
    size: Yup.number().required("Size is required"),
    quantity: Yup.number()
      .integer("Quantity must be an integer")
      .min(0, "Quantity cannot be negative")
      .required("Quantity is required"),
  });

export const clothingInventoryArraySchema = Yup.array().of(
  clothingInventorySchema
);
