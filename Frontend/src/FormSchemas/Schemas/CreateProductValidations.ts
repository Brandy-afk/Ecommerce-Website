import * as Yup from "yup";
import { ManufacturerEnum, ProductTypeEnum } from "../../enums/ProductEnums";
import { percentageSchema } from "../Validations/DefaultValidations";
import {
  clothingInventoryArraySchema,
  clothingInventorySchema,
  clothingTypeSchema,
} from "../Validations/ClothingValidations";
import {
  productNameSchema,
  productTrackingIdSchema,
  productDescriptionSchema,
  productPriceSchema,
  productColorsSchema,
  productManufacturerSchema,
  productTypeSchema,
  productActiveSchema,
  productStockSchema,
} from "../Validations/ProductValidations";
import {
  imageDescriptionSchema,
  imageSchema,
} from "../Validations/ImageValidations";
import {
  discCustomSchema,
  discDiameterSchema,
  discThicknessSchema,
  discTypeSchema,
  discWeightSchema,
} from "../Validations/DiscValidations";

export const createProductValidation = Yup.object()
  .shape({
    // Product fields
    name: productNameSchema,
    trackingId: productTrackingIdSchema,
    description: productDescriptionSchema,
    price: productPriceSchema,
    colors: productColorsSchema,
    manufacturer: productManufacturerSchema,
    productType: productTypeSchema,
    active: productActiveSchema,
    stock: productStockSchema,
    imageDescription: imageDescriptionSchema,
    image: imageSchema,

    // Clothing fields
    inventories: Yup.array().when("productType", {
      is: 2,
      then: () => clothingInventoryArraySchema,
      otherwise: () => Yup.array().notRequired(),
    }),
    clothingType: Yup.number().when("productType", {
      is: 2,
      then: () => clothingTypeSchema,
      otherwise: () => Yup.number().notRequired(),
    }),
    cotton: Yup.number().when("productType", {
      is: 2,
      then: () => percentageSchema,
      otherwise: () => Yup.number().notRequired(),
    }),
    polyester: Yup.number().when("productType", {
      is: 2,
      then: () => percentageSchema,
      otherwise: () => Yup.number().notRequired(),
    }),
    wool: Yup.number().when("productType", {
      is: 2,
      then: () => percentageSchema,
      otherwise: () => Yup.number().notRequired(),
    }),
    linen: Yup.number().when("productType", {
      is: 2,
      then: () => percentageSchema,
      otherwise: () => Yup.number().notRequired(),
    }),

    // Disc fields
    customDisc: Yup.boolean().when("productType", {
      is: 1,
      then: () => discCustomSchema,
      otherwise: () => Yup.boolean().notRequired(),
    }),
    discType: Yup.number().when("productType", {
      is: 1,
      then: () => discTypeSchema,
      otherwise: () => Yup.number().notRequired(),
    }),
    diameter: Yup.number().when("productType", {
      is: 1,
      then: () => discDiameterSchema,
      otherwise: () => Yup.number().notRequired(),
    }),
    thickness: Yup.number().when("productType", {
      is: 1,
      then: () => discThicknessSchema,
      otherwise: () => Yup.number().notRequired(),
    }),
    weight: Yup.number().when("productType", {
      is: 1,
      then: () => discWeightSchema,
      otherwise: () => Yup.number().notRequired(),
    }),
  })
  .test(
    "sum-100",
    "The sum of all materials must equal 100%",
    function (values) {
      const sum =
        (values.cotton || 0) +
        (values.polyester || 0) +
        (values.wool || 0) +
        (values.linen || 0);
      return sum === 100 || values.productType !== 2
        ? true
        : this.createError({
            message: `The sum of all materials must equal 100%. Current sum: ${sum}%`,
            path: "materialSum", // this is a custom error key
          });
    }
  )
  .test(
    "Unique Product",
    "You must choose a unique product type",
    function (values) {
      return values.productType !== 0
        ? true
        : this.createError({
            message: `Choose a unique product!`,
            path: "uniqueProduct", // this is a custom error key
          });
    }
  );
