import InputField from "../FormComponents/InputField";
import InputSection from "../FormComponents/InputSection";
import ClothingInventoryForm from "./ClothingInventoryForm";
import { FormValues } from "../../pages/Admin/CreateProductPageFolder/CreateProductPage";
import { FormikProps } from "formik";
import { useFormCSS } from "../../hooks/useFormCSSContext";
import { ClothingInventory } from "../../store/api/types/inventory/clothingInventory";

interface ClothingFormProps {
  formik: FormikProps<FormValues>;
}

export default function ClothingForm({ formik }: ClothingFormProps) {
  const { input: inputCSS, error: errorCSS } = useFormCSS();

  const setInventoryState = (state: ClothingInventory[]) => {
    formik.setFieldValue("inventories", state);
  };

  return (
    <InputSection header="Clothing">
      <InputField title="Clothing Type" tip="Select the type of clothing item">
        <select
          className={inputCSS}
          id="clothingType"
          name="clothingType"
          onChange={(e) => {
            const value = e.target.value ? parseInt(e.target.value, 10) : "";
            formik.setFieldValue("clothingType", value);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.clothingType}
        >
          <option value={0}>None Selected</option>
          <option value={1}>Short-Sleeve</option>
          <option value={2}>Long-Sleeve</option>
          <option value={3}>Hoodie</option>
          <option value={4}>Hat</option>
        </select>
        {formik.touched.clothingType && formik.errors.clothingType ? (
          <div className={errorCSS}>{formik.errors.clothingType}</div>
        ) : null}
      </InputField>

      {formik.values.clothingType !== 0 && (
        <>
          <ClothingInventoryForm
            inputCSS={inputCSS}
            errorCSS={errorCSS}
            inventories={formik.values.inventories}
            setInventoryState={setInventoryState}
          />

          <div className="flex gap-2">
            <InputField title="Cotton" tip="Percentage of cotton">
              <input
                className={inputCSS}
                id="cotton"
                name="cotton"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cotton}
                placeholder="%"
              />
              {formik.touched.cotton && formik.errors.cotton ? (
                <div className={errorCSS}>{formik.errors.cotton}</div>
              ) : null}
            </InputField>

            <InputField title="Polyester" tip="Percentage of polyester">
              <input
                className={inputCSS}
                id="polyester"
                name="polyester"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.polyester}
                placeholder="%"
              />
              {formik.touched.polyester && formik.errors.polyester ? (
                <div className={errorCSS}>{formik.errors.polyester}</div>
              ) : null}
            </InputField>
          </div>

          <div className="flex gap-2">
            <InputField title="Wool" tip="Percentage of wool">
              <input
                className={inputCSS}
                id="wool"
                name="wool"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.wool}
                placeholder="%"
              />
              {formik.touched.wool && formik.errors.wool ? (
                <div className={errorCSS}>{formik.errors.wool}</div>
              ) : null}
            </InputField>

            <InputField title="Linen" tip="Percentage of linen">
              <input
                className={inputCSS}
                id="linen"
                name="linen"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.linen}
                placeholder="%"
              />
              {formik.touched.linen && formik.errors.linen ? (
                <div className={errorCSS}>{formik.errors.linen}</div>
              ) : null}
            </InputField>
          </div>
          {"materialSum" in formik.errors && formik.errors.materialSum ? (
            <div className={`${errorCSS} rounded-lg mb-2`}>
              {formik.errors.materialSum as string}
            </div>
          ) : null}
        </>
      )}
    </InputSection>
  );
}
