import { useState } from "react";
import InputField from "../FormComponents/InputField";
import InputSection from "../FormComponents/InputSection";
import { FormikProps } from "formik";
import { FormValues } from "../../pages/Admin/CreateProductPageFolder/CreateProductPage";
import { useFormCSS } from "../../hooks/useFormCSSContext";

interface ProductFormProps {
  formik: FormikProps<FormValues>;
}

export default function ProductForm({ formik }: ProductFormProps) {
  const { input: inputCSS, error: errorCSS } = useFormCSS();
  return (
    <InputSection header="Product">
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

      <InputField title="Price" tip="Product price in the default currency.">
        <input
          className={inputCSS}
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price ? (
          <div className={errorCSS}>{formik.errors.price}</div>
        ) : null}
      </InputField>

      <InputField
        title="Colors"
        tip="Comma-separated list of colors (e.g., red,blue,green)"
      >
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

      <InputField title="Manufacturer" tip="Select the manufacturer.">
        <select
          className={inputCSS}
          id="manufacturer"
          name="manufacturer"
          onChange={(e) => {
            const value = e.target.value ? parseInt(e.target.value, 10) : "";
            formik.setFieldValue("manufacturer", value);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.manufacturer}
        >
          <option value="">Select a manufacturer</option>
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

      <InputField title="Active" tip="Is the product currently active?">
        <input
          className="size-6 my-2"
          id="active"
          name="active"
          type="checkbox"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.active}
        />
        {formik.touched.active && formik.errors.active ? (
          <div className={errorCSS}>{formik.errors.active}</div>
        ) : null}
      </InputField>

      {formik.values.productType != 2 && (
        <InputField title="Stock" tip="Current stock quantity.">
          <input
            className={inputCSS}
            id="stock"
            name="stock"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.stock}
          />
          {formik.touched.stock && formik.errors.stock ? (
            <div className={errorCSS}>{formik.errors.stock}</div>
          ) : null}
        </InputField>
      )}

      <InputField title="Image" tip="Upload product image.">
        <input
          className={inputCSS}
          id="image"
          name="image"
          type="file"
          onChange={(event) => {
            formik.setFieldValue(
              "image",
              event.currentTarget.files ? event.currentTarget.files[0] : null
            );
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.image && formik.errors.image ? (
          <div className={errorCSS}>{formik.errors.image}</div>
        ) : null}
      </InputField>

      <InputField
        title="Image Description"
        tip="Description of the product image."
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

      <InputField title="Product Type" tip="Select the product type.">
        <select
          className={inputCSS}
          id="productType"
          name="productType"
          onChange={(e) => {
            const value = e.target.value ? parseInt(e.target.value, 10) : "";
            formik.setFieldValue("productType", value);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.productType}
        >
          <option key={0} value={""}>
            None
          </option>
          <option key={1} value={1}>
            Disc
          </option>
          <option key={2} value={2}>
            Clothing
          </option>
        </select>
        {formik.touched.productType && formik.errors.productType ? (
          <div className={errorCSS}>{formik.errors.productType}</div>
        ) : null}
      </InputField>
    </InputSection>
  );
}
