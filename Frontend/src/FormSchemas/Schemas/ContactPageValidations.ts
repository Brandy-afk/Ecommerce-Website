import * as Yup from "yup";
import {
  emailValidation,
  inquiryTypeValidation,
  messageValidation,
  nameValidation,
  orderIdValidation,
} from "../Validations/FormValidations";

export const contactPageValidations = Yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  contactType: inquiryTypeValidation,
  message: messageValidation,
  orderId: Yup.string().when("productType", {
    is: 2,
    then: () => orderIdValidation,
    otherwise: () => Yup.string().notRequired(),
  }),
});
