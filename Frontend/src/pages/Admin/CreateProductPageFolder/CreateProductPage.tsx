import AdminSection from "../../../components/main/AdminSection";
import Button from "../../../components/reuse/Button";
import { discState, productState, clothingState } from "./InitialValues";
import ClothingForm from "../../../components/CreateProductPage/ClothingForm";
import ProductForm from "../../../components/CreateProductPage/ProductForm";
import DiscForm from "../../../components/CreateProductPage/DiscForm";
import ConfirmModel from "../../../components/reuse/ConfirmModel";
import { useNavigate } from "react-router-dom";
import { useUploadProductMutation } from "../../../store/api/productApi";
import { useUploadImageMutation } from "../../../store/store";
import CreateProductParams from "../../../store/api/types/product/createProductParams";
import {
  CSSFormContext,
  errorCSS,
  inputCSS,
} from "../../../hooks/useFormCSSContext";
import { useFormik } from "formik";
import { createProductValidation } from "../../../FormSchemas/Schemas/CreateProductValidations";
import { useState } from "react";
import { ClothingInventory } from "../../../store/api/types/inventory/clothingInventory";

export interface FormValues {
  name: string;
  trackingId: string;
  description: string;
  price: number;
  colors: string; // string of colors such that the field looks like this red,blue,green
  manufacturer: number; // Based off an enum and should be a certain number of choices
  productType: number; // Based off an enum and should be a certain number of choices
  active: boolean;
  stock: number;
  imageDescription: string;
  image: File | null; // Should be a file as it will be where the image is uploaded
  clothingType: number; // Based off an enum and should be a certain number of choices
  inventories: ClothingInventory[]; // Array of ClothingInventory objects
  cotton: number;
  polyester: number;
  wool: number;
  linen: number;
  custom: boolean;
  discType: number; // Based off an enum and should be a certain number of choices
  diameter: number;
  thickness: number;
  weight: number;
}

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [confirmState, setConfirmState] = useState(false);
  const [uploadProduct, { isLoading: productLoading }] =
    useUploadProductMutation();
  const [uploadImage, { isLoading: imageLoading }] = useUploadImageMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      ...discState,
      ...productState,
      ...clothingState,
    },
    validationSchema: createProductValidation,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        var imageResponse = await uploadImage({
          file: values.image as File,
          fileName: values.name,
          fileDescription: values.imageDescription,
        }).unwrap();

        if (!imageResponse) throw new Error("Image error!");

        const params: CreateProductParams = {
          name: values.name,
          trackingId: values.trackingId,
          imageId: imageResponse.imageId, // Assuming you have an imageId field, otherwise use an empty string
          description: values.description,
          price: Number(values.price), // Ensure this is a number
          colors: values.colors.split(",").map((color) => color.trim()), // Assuming colors is a comma-separated string
          manufacturer: Number(values.manufacturer), // Ensure this is a number
          productType: Number(values.productType), // Ensure this is a number
          active: values.active,
          stock: Number(values.stock), // Ensure this is a number
          disc:
            Number(values.productType) === 1
              ? {
                  custom: values.custom,
                  discType: Number(values.discType),
                  diameter: Number(values.diameter),
                  thickness: Number(values.thickness),
                  weight: Number(values.weight),
                }
              : undefined,
          clothing:
            Number(values.productType) === 2
              ? {
                  clothingType: Number(values.clothingType),
                  inventories: values.inventories, // Assuming this is already in the correct format
                  cotton: Number(values.cotton),
                  polyester: Number(values.polyester),
                  wool: Number(values.wool),
                  linen: Number(values.linen),
                }
              : undefined,
        };

        const productReponse = await uploadProduct(params).unwrap();
        if (!productReponse) throw new Error("Product Error");

        alert(`Product uploaded!`);
        navigate("/admin/home");
      } catch (error: any) {
        alert("Error submitting form: " + error.data.title);
        setConfirmState(false);
      }
    },
  });

  return (
    <CSSFormContext.Provider
      value={{
        input: inputCSS,
        error: errorCSS,
      }}
    >
      <AdminSection header="Create a Product">
        <ProductForm formik={formik} />
        {(formik.values.productType == 1 && <DiscForm formik={formik} />) ||
          (formik.values.productType == 2 && <ClothingForm formik={formik} />)}
        <Button
          primary
          rounded
          className="text-2xl py-4 px-20 mx-auto my-4 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            setConfirmState(true);
          }}
          disabled={Object.keys(formik.errors).length > 0}
        >
          Submit
        </Button>

        <ConfirmModel
          body="Ensure all details are correct and filled out correctly. After submission, please check the list to ensure quality."
          onConfirm={formik.handleSubmit}
          onCancel={() => setConfirmState(false)}
          isOpen={confirmState}
          isLoading={productLoading || imageLoading}
        />
      </AdminSection>
    </CSSFormContext.Provider>
  );
}
