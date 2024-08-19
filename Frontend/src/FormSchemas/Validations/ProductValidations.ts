import * as Yup from "yup";
import { ManufacturerEnum, ProductTypeEnum } from "../../enums/ProductEnums";

export const productNameSchema = Yup.string().required(
  "Product name is required"
);

export const productTrackingIdSchema = Yup.string().required(
  "Tracking ID is required"
);

export const productDescriptionSchema = Yup.string().required(
  "Description is required"
);

export const productPriceSchema = Yup.number()
  .positive("Price must be positive")
  .required("Price is required");

export const productColorsSchema = Yup.string().matches(
  /^[\w\s]+(,[\w\s]+)*$/,
  "Colors should be comma-separated"
);

export const productManufacturerSchema = Yup.number()
  .oneOf(Object.values(ManufacturerEnum) as number[], "Invalid manufacturer")
  .required("Manufacturer is required");

export const productTypeSchema = Yup.number()
  .oneOf(Object.values(ProductTypeEnum) as number[], "Invalid product type")
  .required("Product type is required");

export const productActiveSchema = Yup.boolean();

export const productStockSchema = Yup.number().when("productType", {
  is: (value: number) => value !== 2,
  then: (schema) =>
    schema
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative")
      .required("Stock is required"),
  otherwise: (schema) =>
    schema
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative")
      .notRequired(),
});
