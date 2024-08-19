import * as Yup from "yup";
import { DiscTypeEnum } from "../../enums/DiscEnums";

export const discCustomSchema = Yup.boolean();

export const discTypeSchema = Yup.number()
  .oneOf(Object.values(DiscTypeEnum) as number[], "Invalid Disc Type")
  .required("Disc type is required");

export const discDiameterSchema = Yup.number()
  .positive("Diameter must be positive")
  .max(30, "Diameter must be 30cm or less")
  .required("Diameter is required");

export const discThicknessSchema = Yup.number()
  .positive("Thickness must be positive")
  .max(5, "Thickness must be 5cm or less")
  .required("Thickness is required");

export const discWeightSchema = Yup.number()
  .positive("Weight must be positive")
  .max(200, "Weight must be 200g or less")
  .required("Weight is required");
