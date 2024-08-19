import { useFormik } from "formik";
import { useSubmitContactFormMutation } from "../store/store";
import { contactPageValidations } from "../FormSchemas/Schemas/ContactPageValidations";
import ContactForm from "../components/ContactPage/ContactForm";

export interface ContactFormValues {
  name: string;
  email: string;
  contactType: number;
  message: string;
  orderId?: string;
}

export default function ContactPage() {
  const [uploadRequest, { data, isLoading, error }] =
    useSubmitContactFormMutation();
  const formik = useFormik<ContactFormValues>({
    initialValues: {
      name: "",
      email: "",
      contactType: 0,
      message: "",
      orderId: "",
    },
    validationSchema: contactPageValidations,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        await uploadRequest(values).unwrap();
        formik.resetForm();
      } catch (error: any) {}
    },
  });

  const renderResponse = () => {
    if (error) {
      console.log("Rendering error:", error);
      return (
        <div className="text-red-700 text-xl">
          An error has occurred: {(error as any).data?.error || "Unknown error"}
        </div>
      );
    } else if (data) {
      return (
        <div className="text-green-600 text-xl">
          Form submitted successfully! We will be in contact.
        </div>
      );
    }
    return null;
  };

  return (
    <main className="py-32 bg-gradient-to-b from-tint-9 to-tint-7 w-full">
      <div className="bg-white center-container-x max-w-3xl mx-2 md:h-[80vh] h-max shadow-2xl grid grid-rows-custom-1 gap-2 p-8">
        <div>
          <h2 className="text-7xl font-black mb-4 text-shade-2">
            Get in Touch
          </h2>
          <p className="text-2xl leading-10 border-b-4 border-b-shade-2 pb-4 mb-4 w-10/12 md:w-6/12">
            All inquiries will be answered as fast as possible.
          </p>
          {renderResponse()}
        </div>
        <ContactForm formik={formik} isLoading={isLoading} />
      </div>
    </main>
  );
}
