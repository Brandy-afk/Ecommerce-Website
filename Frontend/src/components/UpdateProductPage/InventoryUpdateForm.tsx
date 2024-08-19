import InputField from "../FormComponents/InputField";
import InputSection from "../FormComponents/InputSection";
import Button from "../reuse/Button";
import { useState } from "react";
import { useFormCSS } from "../../hooks/useFormCSSContext";
import ConfirmModel from "../reuse/ConfirmModel";
import { useUpdateInventoryMutation } from "../../store/store";

interface InventoryUpdateFormProps {
  inventory: number;
  productId: string;
}

export default function InventoryUpdateForm({
  inventory,
  productId,
}: InventoryUpdateFormProps) {
  const [confirmState, setConfirmState] = useState(false);
  const [inventoryState, setInventoryState] = useState(inventory);
  const [updateInventory, { isLoading }] = useUpdateInventoryMutation();

  const { input: inputCSS } = useFormCSS();

  const onSubmit = async () => {
    try {
      await updateInventory({
        productId: productId,
        quantity: inventoryState,
      }).unwrap();

      alert("Inventory has been updated!");
    } catch (error: any) {
      console.log(error);
      alert(`An error occured - ${error?.data?.title ?? ""}`);
    }
    setConfirmState(false);
  };

  return (
    <InputSection header="Inventory" onSubmit={() => setConfirmState(true)}>
      <InputField
        title="Inventory"
        tip="Set the stock of chosen item. Ensure this is correct!"
      >
        <input
          className={inputCSS}
          id="inventory"
          name="inventory"
          type="number"
          onChange={(e) => {
            e.preventDefault();
            setInventoryState(Number(e.target.value));
          }}
          value={inventoryState}
        />
      </InputField>
      <div className="flex justify-center">
        <Button
          primary
          type="submit"
          rounded
          className="text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Update Inventory
        </Button>
      </div>
      <ConfirmModel
        body="You are about to update product details. Please ensure all is correct."
        onConfirm={onSubmit}
        onCancel={() => setConfirmState(false)}
        isOpen={confirmState}
        isLoading={isLoading}
      />
    </InputSection>
  );
}
