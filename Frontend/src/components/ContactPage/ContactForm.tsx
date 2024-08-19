import { FormikProps } from "formik";
import Button from "../reuse/Button";
import { ContactFormValues } from "../../pages/ContactPage";

interface ContactFormProps {
  formik: FormikProps<ContactFormValues>;
  isLoading: boolean;
}

export default function ContactForm({ formik, isLoading }: ContactFormProps) {
  const errorCSS =
    "w-full rounded-b-xl text-lg font-black text-white py-1 px-4 bg-red-500 rounded-b-lg";

  return (
    <form
      className="grid grid-rows-custom-3"
      onSubmit={(e) => {
        if (isLoading) return;
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <div className="flex">
        <div className="flex flex-col w-full text-3xl md:text-xl">
          <input
            name="name"
            type="text"
            placeholder="Name*"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`p-2 border-2 rounded ${
              !(formik.touched.name && formik.errors.name) ? "mb-2" : ""
            }`}
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={`${errorCSS} mb-2`}>{formik.errors.name}</div>
          ) : null}

          <input
            name="email"
            type="email"
            placeholder="Email Address*"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`p-2 border-2 rounded ${
              !(formik.touched.email && formik.errors.email) ? "mb-2" : ""
            }`}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={`${errorCSS} mb-2`}>{formik.errors.email}</div>
          ) : null}

          <select
            value={formik.values.contactType}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value, 10) : "";
              formik.setFieldValue("contactType", value);
            }}
            className={`p-2 border-2 rounded ${
              formik.values.contactType === 0 ? "text-gray-400" : ""
            } ${
              !(formik.touched.contactType && formik.errors.contactType)
                ? "mb-2"
                : ""
            }`}
            required
            name="contactType"
          >
            <option value="">Contact type*</option>
            <option value={1}>General Inquiry</option>
            <option value={2}>Order Inquiry</option>
            <option value={3}>Business Inquiry</option>
            <option value={4}>Custom Disc</option>
            <option value={5}>Other</option>
          </select>
          {formik.touched.contactType && formik.errors.contactType ? (
            <div className={`${errorCSS} mb-2`}>
              {formik.errors.contactType}
            </div>
          ) : null}

          {formik.values.contactType === 2 && (
            <>
              <input
                type="text"
                placeholder="Order ID*"
                className={`p-2 border-2 rounded ${
                  !(formik.touched.orderId && formik.errors.orderId)
                    ? "mb-2"
                    : ""
                }`}
                name="orderId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.orderId}
                required
              />
              {formik.touched.orderId && formik.errors.orderId ? (
                <div className={`${errorCSS} mb-2`}>
                  {formik.errors.orderId}
                </div>
              ) : null}
            </>
          )}

          <textarea
            placeholder="Message*"
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className={`p-2 grow border-2 rounded ${
              !(formik.touched.message && formik.errors.message) ? "mb-2" : ""
            }`}
            onChange={formik.handleChange}
            name="message"
            required
          />
          {formik.touched.message && formik.errors.message ? (
            <div className={`${errorCSS} mb-2`}>{formik.errors.message}</div>
          ) : null}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          type="submit"
          primary
          disabled={Object.keys(formik.errors).length > 0 || isLoading}
          className="text-4xl w-full self-end text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <p className="w-full">Send</p>
        </Button>
      </div>
    </form>
  );
}
