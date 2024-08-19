import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../FormComponents/InputField";
import InputSection from "../FormComponents/InputSection";
import Button from "../reuse/Button";
import { useFormCSS } from "../../hooks/useFormCSSContext";
import {
  discCustomSchema,
  discDiameterSchema,
  discTypeSchema,
  discThicknessSchema,
  discWeightSchema,
} from "../../FormSchemas/Validations/DiscValidations";
import { DiscTypeEnum } from "../../enums/DiscEnums";
import ConfirmModel from "../reuse/ConfirmModel";
import { useState } from "react";
import { useUpdateDiscMutation } from "../../store/store";
import Disc from "../../store/api/types/product/disc";

interface DiscSectionProps {
  disc: Disc;
  productId: string;
}

const validationSchema = Yup.object({
  customDisc: discCustomSchema,
  discType: discTypeSchema,
  diameter: discDiameterSchema,
  thickness: discThicknessSchema,
  weight: discWeightSchema,
});

export default function DiscUpdateForm({ disc, productId }: DiscSectionProps) {
  const { input: inputCSS, error: errorCSS } = useFormCSS();
  const [updateDisc, { isLoading }] = useUpdateDiscMutation();
  const [confirmState, setConfirmState] = useState(false);
  const formik = useFormik({
    initialValues: {
      customDisc: disc.custom, //True or false boolean
      discType: Number(disc.discType), //Enum based field with enum above
      diameter: disc.diameter, //Number
      thickness: disc.thickness, //Number
      weight: disc.weight, //Number
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateDisc({
          productId: productId,
          custom: values.customDisc,
          discType: values.discType,
          diameter: values.diameter,
          thickness: values.thickness,
          weight: values.weight,
        }).unwrap();
        // Handle successful update
        alert("Disc updated successfully!");
        // Reset error message if there was one before
      } catch (err: any) {
        alert(`Error updating disc - ${err.data.title}`);
      }
      setConfirmState(false);
    },
  });

  return (
    <InputSection header="Disc" onSubmit={() => setConfirmState(true)}>
      <InputField title="Custom Disc" tip="Is this a custom disc?">
        <input
          className="size-6 mt-2"
          id="customDisc"
          name="customDisc"
          type="checkbox"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.customDisc}
        />
        {formik.touched.customDisc && formik.errors.customDisc ? (
          <div className={errorCSS}>{formik.errors.customDisc}</div>
        ) : null}
      </InputField>

      <InputField title="Disc Type" tip="Select the type of disc">
        <select
          className={inputCSS}
          id="discType"
          name="discType"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.discType}
        >
          <option value={0}>None Selected</option>
          <option value={DiscTypeEnum.DistanceDriver}>Distance Driver</option>
          <option value={DiscTypeEnum.FairwayDriver}>Fairway Driver</option>
          <option value={DiscTypeEnum.MidRange}>Mid Range</option>
          <option value={DiscTypeEnum.PuttAndApproach}>
            Putt and Approach
          </option>
          <option value={DiscTypeEnum.Touch}>Touch</option>
        </select>
        {formik.touched.discType && formik.errors.discType ? (
          <div className={errorCSS}>{formik.errors.discType}</div>
        ) : null}
      </InputField>

      <InputField
        title="Diameter (cm)"
        tip="Enter the diameter of the disc in centimeters"
      >
        <input
          className={inputCSS}
          id="diameter"
          name="diameter"
          type="number"
          step="0.1"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.diameter}
        />
        {formik.touched.diameter && formik.errors.diameter ? (
          <div className={errorCSS}>{formik.errors.diameter}</div>
        ) : null}
      </InputField>

      <InputField
        title="Thickness (cm)"
        tip="Enter the thickness of the disc in centimeters"
      >
        <input
          className={inputCSS}
          id="thickness"
          name="thickness"
          type="number"
          step="0.1"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.thickness}
        />
        {formik.touched.thickness && formik.errors.thickness ? (
          <div className={errorCSS}>{formik.errors.thickness}</div>
        ) : null}
      </InputField>

      <InputField
        title="Weight (g)"
        tip="Enter the weight of the disc in grams"
      >
        <input
          className={inputCSS}
          id="weight"
          name="weight"
          type="number"
          step="0.1"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.weight}
        />
        {formik.touched.weight && formik.errors.weight ? (
          <div className={errorCSS}>{formik.errors.weight}</div>
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
          Update Disc
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
