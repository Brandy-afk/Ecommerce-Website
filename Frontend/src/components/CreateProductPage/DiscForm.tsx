import { FormikProps } from "formik";
import { HandleChangeType } from "../../hooks/createHandleChange";
import { FormValues } from "../../pages/Admin/CreateProductPageFolder/CreateProductPage";
import Disc from "../../store/api/types/product/disc";
import InputField from "../FormComponents/InputField";
import InputSection from "../FormComponents/InputSection";
import { useFormCSS } from "../../hooks/useFormCSSContext";
import { useContext } from "react";

interface DiscFormProps {
  formik: FormikProps<FormValues>;
}

export default function DiscForm({ formik }: DiscFormProps) {
  const { input: inputCSS, error: errorCSS } = useFormCSS();
  return (
    <InputSection header="Disc">
      <InputField
        title="Custom Disc"
        tip="If the disc is custom made and unique, meaning it can't be replicated."
      >
        <input
          className="mr-2 size-6 my-2"
          id="custom"
          name="custom"
          type="checkbox"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.custom}
        />
        {formik.touched.custom && formik.errors.custom ? (
          <div className={errorCSS}>{formik.errors.custom}</div>
        ) : null}
      </InputField>

      <InputField
        title="Disc Type"
        tip="The disc type, the purpose of the disc. Ensure you select one from the dropdown menu."
      >
        <select
          className={inputCSS}
          id="discType"
          name="discType"
          value={formik.values.discType}
          onChange={(e) => {
            const value = e.target.value ? parseInt(e.target.value, 10) : "";
            formik.setFieldValue("discType", value);
          }}
          onBlur={formik.handleBlur}
        >
          <option value={""}>None Selected*</option>
          <option value={1}>Distance Driver</option>
          <option value={2}>Fairway Driver</option>
          <option value={3}>Mid-Range</option>
          <option value={4}>Putt And Approach</option>
          <option value={5}>Touch</option>
        </select>
        {formik.touched.discType && formik.errors.discType ? (
          <div className={errorCSS}>{formik.errors.discType}</div>
        ) : null}
      </InputField>

      <InputField title="Diameter" tip="The Diameter of the Disc. (inch)">
        <input
          className={inputCSS}
          id="diameter"
          name="diameter"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.diameter}
          placeholder="Diameter*"
        />
        {formik.touched.diameter && formik.errors.diameter ? (
          <div className={errorCSS}>{formik.errors.diameter}</div>
        ) : null}
      </InputField>

      <InputField title="Thickness" tip="The Thickness of the Disc. (cm)">
        <input
          className={inputCSS}
          id="thickness"
          name="thickness"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.thickness}
          placeholder="Thickness*"
        />
        {formik.touched.thickness && formik.errors.thickness ? (
          <div className={errorCSS}>{formik.errors.thickness}</div>
        ) : null}
      </InputField>

      <InputField title="Weight" tip="The Weight of the Disc. (ounces)">
        <input
          className={inputCSS}
          id="weight"
          name="weight"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.weight}
          placeholder="Weight*"
        />
        {formik.touched.weight && formik.errors.weight ? (
          <div className={errorCSS}>{formik.errors.weight}</div>
        ) : null}
      </InputField>
    </InputSection>
  );
}
