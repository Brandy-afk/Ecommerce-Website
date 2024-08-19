import * as Yup from "yup";

export const percentageSchema = Yup.number()
  .min(0, "Percentage must be between 0 and 100")
  .max(100, "Percentage must be between 0 and 100");

