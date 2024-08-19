import Product from "../../store/api/types/product/product";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../FormComponents/InputField";
import InputSection from "../FormComponents/InputSection";
import Button from "../reuse/Button";
import { useFormCSS } from "../../hooks/useFormCSSContext";
import {
  productActiveSchema,
  productColorsSchema,
  productDescriptionSchema,
  productManufacturerSchema,
  productNameSchema,
  productPriceSchema,
  productTrackingIdSchema,
} from "../../FormSchemas/Validations/ProductValidations";
import { useUpdateProductMutation } from "../../store/store";
import ConfirmModel from "../reuse/ConfirmModel";
import { useState } from "react";

interface ProductSectionProps {
  product: Product;
}

const validationSchema = Yup.object({
  name: productNameSchema,
  trackingId: productTrackingIdSchema,
  description: productDescriptionSchema,
  price: productPriceSchema,
  colors: productColorsSchema,
  manufacturer: productManufacturerSchema,
  active: productActiveSchema,
});

export default function ProductUpdateForm({ product }: ProductSectionProps) {
  const { input: inputCSS, error: errorCSS } = useFormCSS();

  const [confirmState, setConfirmState] = useState(false);
  const [updateProduct, { data, error, isLoading }] =
    useUpdateProductMutation();

  const formik = useFormik({
    initialValues: {
      name: product.name,
      trackingId: product.trackingId,
      description: product.description,
      price: product.price,
      colors: product.colors.join(","),
      active: product.active,
      manufacturer: product.manufacturer,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateProduct({
          productId: product.productId,
          name: values.name,
          trackingId: values.trackingId,
          description: values.description,
          price: Number(values.price), // Ensure this is a number
          colors: values.colors.split(",").map((color) => color.trim()), // Assuming colors is a comma-separated string
          manufacturer: Number(values.manufacturer), // Ensure this is a number
          active: values.active,
        }).unwrap();
        // Handle successful update
        alert("Product updated successfully");
        // Reset error message if there was one before
      } catch (err: any) {
        alert(err.data.title);
      }

      setConfirmState(false);
    },
  });

  return (
    <InputSection header="Product" onSubmit={() => setConfirmState(true)}>
      <InputField title="Name" tip="A meaningful name for the product.">
        <input
          className={inputCSS}
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={errorCSS}>{formik.errors.name}</div>
        ) : null}
      </InputField>

      <InputField title="Tracking ID" tip="Unique identifier for the product.">
        <input
          className={inputCSS}
          id="trackingId"
          name="trackingId"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.trackingId}
        />
        {formik.touched.trackingId && formik.errors.trackingId ? (
          <div className={errorCSS}>{formik.errors.trackingId}</div>
        ) : null}
      </InputField>

      <InputField
        title="Description"
        tip="Detailed description of the product."
      >
        <textarea
          className={inputCSS}
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className={errorCSS}>{formik.errors.description}</div>
        ) : null}
      </InputField>

      <InputField title="Price" tip="Price of the product.">
        <input
          className={inputCSS}
          id="price"
          name="price"
          type="number"
          step="0.01"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price ? (
          <div className={errorCSS}>{formik.errors.price}</div>
        ) : null}
      </InputField>

      <InputField title="Colors" tip="Comma-separated list of colors.">
        <input
          className={inputCSS}
          id="colors"
          name="colors"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.colors}
        />
        {formik.touched.colors && formik.errors.colors ? (
          <div className={errorCSS}>{formik.errors.colors}</div>
        ) : null}
      </InputField>

      <InputField title="Active" tip="Whether the product is active.">
        <input
          className="size-6 mt-2"
          id="active"
          name="active"
          type="checkbox"
          onChange={(e) => {
            formik.setFieldValue("active", e.target.checked);
          }}
          onBlur={formik.handleBlur}
          checked={formik.values.active}
        />
        {formik.touched.active && formik.errors.active ? (
          <div className={errorCSS}>{formik.errors.active}</div>
        ) : null}
      </InputField>

      <InputField title="Manufacturer" tip="Select the manufacturer.">
        <select
          className={inputCSS}
          id="manufacturer"
          name="manufacturer"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.manufacturer}
        >
          <option key={0} value={""}>
            Select a manufacturer
          </option>
          <option value={1}>Zdyes</option>
          <option value={2}>Discmania</option>
          <option value={3}>Discraft</option>
          <option value={4}>Innova</option>
          <option value={5}>LoneStarDisc</option>
          <option value={6}>MVP</option>
        </select>
        {formik.touched.manufacturer && formik.errors.manufacturer ? (
          <div className={errorCSS}>{formik.errors.manufacturer}</div>
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
          Update Product
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
