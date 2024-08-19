import ImageResponse from "../../store/api/types/image/imageUploadReponse";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../FormComponents/InputField";
import InputSection from "../FormComponents/InputSection";
import Button from "../reuse/Button";
import { useFormCSS } from "../../hooks/useFormCSSContext";
import { productNameSchema } from "../../FormSchemas/Validations/ProductValidations";
import {
  imageDescriptionSchema,
  imageSchema,
} from "../../FormSchemas/Validations/ImageValidations";
import { useState } from "react";
import { useUpdateImageMutation } from "../../store/store";
import ConfirmModel from "../reuse/ConfirmModel";

interface ImageSectionProps {
  image: ImageResponse;
  productId: string;
  refetch: any;
}

interface ImageUpdateParams {
  image: File | null;
  imageName: string;
  imageDescription: string;
}

const validationSchema = Yup.object({
  image: imageSchema,
  imageName: productNameSchema,
  imageDescription: imageDescriptionSchema,
});

export default function ImageUpdateForm({
  image,
  productId,
  refetch,
}: ImageSectionProps) {
  const { input: inputCSS, error: errorCSS } = useFormCSS();

  const [confirmState, setConfirmState] = useState(false);
  const [updateImage, { isLoading }] = useUpdateImageMutation();

  const formik = useFormik<ImageUpdateParams>({
    initialValues: {
      image: null,
      imageName: image.fileName,
      imageDescription: image.fileDescription as string,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateImage({
          imageId: image.imageId,
          fileName: values.imageName,
          fileDescription: values.imageDescription,
          file: values.image ?? undefined,
          productId: productId,
        }).unwrap();
        // Handle successful update
        alert("Image updated successfully");
        // Reset error message if there was one before
      } catch (err: any) {
        alert(err.data.title);
      }

      setConfirmState(false);
    },
  });

  return (
    <InputSection header="Image" onSubmit={() => setConfirmState(true)}>
      <div className="ml-4 mb-4 border-4 border-shade-3 shadow-xl size-40 overflow-hidden rounded-2xl">
        <img
          className="w-full h-full object-cover"
          src={image.filePath}
          alt={image.fileDescription}
        />
      </div>
      <InputField
        title="Image"
        tip="Upload a new image (JPEG, PNG, or GIF, max 5MB)"
      >
        <input
          className={inputCSS}
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/JPG"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.currentTarget.files
              ? event.currentTarget.files[0]
              : null;
            formik.setFieldValue("image", file);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.image && formik.errors.image ? (
          <div className={errorCSS}>{formik.errors.image}</div>
        ) : null}
      </InputField>

      <InputField title="Image Name" tip="Enter a name for the image">
        <input
          className={inputCSS}
          id="imageName"
          name="imageName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageName}
        />
        {formik.touched.imageName && formik.errors.imageName ? (
          <div className={errorCSS}>{formik.errors.imageName}</div>
        ) : null}
      </InputField>

      <InputField
        title="Image Description"
        tip="Enter a description for the image"
      >
        <textarea
          className={inputCSS}
          id="imageDescription"
          name="imageDescription"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageDescription}
        />
        {formik.touched.imageDescription && formik.errors.imageDescription ? (
          <div className={errorCSS}>{formik.errors.imageDescription}</div>
        ) : null}
      </InputField>

      <div className="flex justify-center">
        <Button
          primary
          type="submit"
          rounded
          className="text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={Object.keys(formik.errors).length > 0}
        >
          Update Image
        </Button>
      </div>
      <ConfirmModel
        body="You are about to update product details. Please ensure all is correct."
        onConfirm={formik.handleSubmit}
        onCancel={() => setConfirmState(false)}
        isOpen={confirmState}
        isLoading={isLoading}
      />
    </InputSection>
  );
}
