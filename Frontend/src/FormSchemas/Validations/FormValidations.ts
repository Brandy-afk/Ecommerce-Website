import * as Yup from "yup";
import { ContactTypeEnum } from "../../enums/ContactEnums";

export const nameValidation = Yup.string().required("Name is Required");

export const messageValidation = Yup.string().required("A Message is Required");

export const emailValidation = Yup.string()
  .email("Invalid email address")
  .required("Email is required")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email format"
  );

export const inquiryTypeValidation = Yup.number()
  .oneOf(Object.values(ContactTypeEnum) as number[], "Invalid Inquiry Type")
  .required("Inquiry Type Required");

export const orderIdValidation = Yup.string().required("Order ID is Required");
