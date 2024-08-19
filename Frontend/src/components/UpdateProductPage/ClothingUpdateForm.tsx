import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../FormComponents/InputField";
import InputSection from "../FormComponents/InputSection";
import Button from "../reuse/Button";
import { ClothingTypeEnum } from "../../enums/ClothingEnums";
import { useFormCSS } from "../../hooks/useFormCSSContext";
import { clothingTypeSchema } from "../../FormSchemas/Validations/ClothingValidations";
import Clothing from "../../store/api/types/product/clothing";
import ConfirmModel from "../reuse/ConfirmModel";
import { useState } from "react";
import { useUpdateClothingMutation } from "../../store/store";

interface ClothingSectionProps {
  clothing: Clothing;
  productId: string;
}

const percentageSchema = Yup.number()
  .min(0, "Percentage must be between 0 and 100")
  .max(100, "Percentage must be between 0 and 100");

const validationSchema = Yup.object({
  type: clothingTypeSchema,
  cotton: percentageSchema,
  polyester: percentageSchema,
  wool: percentageSchema,
  linen: percentageSchema,
}).test(
  "sum-100",
  "The sum of all materials must equal 100%",
  function (values) {
    const sum =
      (values.cotton || 0) +
      (values.polyester || 0) +
      (values.wool || 0) +
      (values.linen || 0);
    return sum === 100
      ? true
      : this.createError({
          message: `The sum of all materials must equal 100%. Current sum: ${sum}%`,
          path: "materialSum", // this is a custom error key
        });
  }
);

export default function ClothingUpdateForm({
  clothing,
  productId,
}: ClothingSectionProps) {
  const [confirmState, setConfirmState] = useState(false);
  const [updateClothing, { isLoading }] = useUpdateClothingMutation();

  const formik = useFormik({
    initialValues: {
      type: clothing.clothingType, // Enum type of clothing type enum above.
      cotton: clothing.cotton, // Number (percentage)
      polyester: clothing.polyester, // Number (percentage)
      wool: clothing.wool, // Number (percentage)
      linen: clothing.linen, // Number (percentage)
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateClothing({
          productId: productId,
          clothingType: values.type,
          cotton: values.cotton,
          polyester: values.polyester,
          wool: values.wool,
          linen: values.linen,
        });

        alert("Clothing updated!");
      } catch (error: any) {
        alert("An error occured - " + error);
      }

      setConfirmState(false);
    },
  });

  const { input: inputCSS, error: errorCSS } = useFormCSS();

  return (
    <InputSection header="Clothing" onSubmit={() => setConfirmState(true)}>
      <InputField title="Clothing Type" tip="Select the type of clothing">
        <select
          className={inputCSS}
          id="type"
          name="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.type}
        >
          {Object.entries(ClothingTypeEnum).map(
            ([key, value]) =>
              typeof value === "number" && (
                <option key={key} value={value}>
                  {key}
                </option>
              )
          )}
        </select>
        {formik.touched.type && formik.errors.type ? (
          <div className={errorCSS}>{formik.errors.type}</div>
        ) : null}
      </InputField>

      <InputField title="Cotton (%)" tip="Enter the percentage of cotton">
        <input
          className={inputCSS}
          id="cotton"
          name="cotton"
          type="number"
          min="0"
          max="100"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cotton}
        />
        {formik.touched.cotton && formik.errors.cotton ? (
          <div className={errorCSS}>{formik.errors.cotton}</div>
        ) : null}
      </InputField>

      <InputField title="Polyester (%)" tip="Enter the percentage of polyester">
        <input
          className={inputCSS}
          id="polyester"
          name="polyester"
          type="number"
          min="0"
          max="100"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.polyester}
        />
        {formik.touched.polyester && formik.errors.polyester ? (
          <div className={errorCSS}>{formik.errors.polyester}</div>
        ) : null}
      </InputField>

      <InputField title="Wool (%)" tip="Enter the percentage of wool">
        <input
          className={inputCSS}
          id="wool"
          name="wool"
          type="number"
          min="0"
          max="100"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.wool}
        />
        {formik.touched.wool && formik.errors.wool ? (
          <div className={errorCSS}>{formik.errors.wool}</div>
        ) : null}
      </InputField>

      <InputField title="Linen (%)" tip="Enter the percentage of linen">
        <input
          className={inputCSS}
          id="linen"
          name="linen"
          type="number"
          min="0"
          max="100"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.linen}
          placeholder={clothing.linen.toString()}
        />
        {formik.touched.linen && formik.errors.linen ? (
          <div className={errorCSS}>{formik.errors.linen}</div>
        ) : null}
      </InputField>

      {"materialSum" in formik.errors && formik.errors.materialSum ? (
        <div className={`${errorCSS} rounded-lg mb-2`}>
          {formik.errors.materialSum as string}
        </div>
      ) : null}

      <div className="flex justify-center">
        <Button
          primary
          type="submit"
          rounded
          className="text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={Object.keys(formik.errors).length > 0}
        >
          Update Clothing
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
