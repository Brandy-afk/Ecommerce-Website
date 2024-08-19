import ClothingInventoryForm from "../CreateProductPage/ClothingInventoryForm";
import InputSection from "../FormComponents/InputSection";
import { useState } from "react";
import Button from "../reuse/Button";
import { useFormCSS } from "../../hooks/useFormCSSContext";
import { ClothingInventory } from "../../store/api/types/inventory/clothingInventory";
import ConfirmModel from "../reuse/ConfirmModel";
import { useUpdateClothingInventoryMutation } from "../../store/store";

interface ClothingInventoryUpdateFormProps {
  inventories: ClothingInventory[];
  productId: string;
}

export default function ClothingInventoryUpdateForm({
  inventories,
  productId,
}: ClothingInventoryUpdateFormProps) {
  const { input: inputCSS, error: errorCSS } = useFormCSS();
  const [inventoryState, setState] = useState<ClothingInventory[]>(inventories);
  const [confirmState, setConfirmState] = useState(false);
  const [updateInventory, { isLoading }] = useUpdateClothingInventoryMutation();

  const setInventoryState = (value: ClothingInventory[]) => {
    setState(value);
  };

  const onSubmit = async () => {
    try {
      await updateInventory({
        productId: productId,
        inventories: inventoryState,
      });

      alert("Inventory updated!");
    } catch (error: any) {
      alert("An error occured - " + error.data.title);
    }

    setConfirmState(false);
  };

  return (
    <InputSection header="Inventory" onSubmit={() => setConfirmState(true)}>
      <ClothingInventoryForm
        inputCSS={inputCSS}
        errorCSS={errorCSS}
        inventories={inventoryState}
        setInventoryState={setInventoryState}
      />
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
