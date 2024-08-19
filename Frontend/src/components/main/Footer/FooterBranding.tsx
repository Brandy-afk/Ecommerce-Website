import { emailValidation } from "../../../FormSchemas/Validations/FormValidations";
import Button from "../../reuse/Button";
import Logo from "../Logo";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSubToNewsletterMutation } from "../../../store/store";
import { useEffect } from "react";

export default function FooterBranding() {
  const [subscribe, { data, error, isLoading }] = useSubToNewsletterMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: emailValidation,
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        await subscribe(values.email).unwrap();
        formik.resetForm();
      } catch (error: any) {}
    },
  });

  const renderResponse = () => {
    if (error) {
      console.log("Rendering error:", error);
      return (
        <div className="text-red-400 text-lg">
          An error has occurred: {(error as any).data?.error || "Unknown error"}
        </div>
      );
    } else if (data) {
      return (
        <div className="text-white mb-1 text-tint-5 text-lg">
          Thanks for subscribing!
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-rows-custom-2 md:col-span-3 col-span-3 lg:col-auto">
      <div className="flex justify-start h-20">
        <Logo isBlack={false} />
      </div>
      <div>
        <h3 className="md:text-2xl text-3xl font-semibold mb-2">Newsletter</h3>
        <p className="md:w-8/12 md:text-lg text-2xl w-full mb-4">
          Subscribe to our newsletter and recieve updates on new inventory and
          specials.
        </p>
        <form
          className="mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <input
            name="email"
            type="email"
            placeholder="Email Address*"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-black rounded md:text-lg text-4xl lg:w-8/12 md:w-10/12 w-full h-16 p-2 sm:h-max pl-1 mb-2"
          />
          <Button
            disabled={Object.keys(formik.errors).length > 0 || isLoading}
            primary
            type="submit"
            className="text-3xl md:text-xl w-full md:w-max disabled:opacity-50 disabled:cursor-not-allowed mb-1"
          >
            <p className="w-full text-center">Subscribe</p>
          </Button>
          {renderResponse()}
        </form>
        <p className="text-xl md:text-sm">
          We promise not to spam like other companies!
        </p>
      </div>
    </div>
  );
}
