import { useState } from "react";
import Button from "../reuse/Button";
import InputField from "../FormComponents/InputField";
import SizeInputField from "../FormComponents/SizeInputField";
import { ClothingInventory } from "../../store/api/types/inventory/clothingInventory";

interface ClothingInventoryFormProps {
  inventories: ClothingInventory[];
  inputCSS: string;
  errorCSS: string;
  setInventoryState: (value: ClothingInventory[]) => void;
}

export default function ClothingInventoryForm({
  inputCSS,
  errorCSS,
  inventories,
  setInventoryState,
}: ClothingInventoryFormProps) {
  const [sizeState, setSizeState] = useState("");

  const onClothingInventoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    const size = Number(name);
    const updatedInventories = inventories.map((inv) =>
      inv.size === size
        ? { ...inv, quantity: value ? parseInt(value, 10) : 0 }
        : inv
    );

    setInventoryState(updatedInventories);
  };

  const onClothingInventoryAdded = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const size = Number(sizeState);

    if (sizeState === "" || inventories.find((i) => i.size === size)) {
      return;
    }

    const newInventory: ClothingInventory = {
      size: size,
      quantity: 1,
    };

    setInventoryState([...inventories, newInventory]);
  };

  const onClothingInventoryRemoved = (size: string) => {
    const numberSize = Number(size);
    const filteredInventories = inventories.filter(
      (i) => i.size !== numberSize
    );

    setInventoryState(filteredInventories);
  };

  return (
    <>
      <InputField
        title="Clothing Size"
        tip="Add inventory/availability of various sizes according to typical standards. Ensure you select one from the dropdown menu and press add."
      >
        <div className="flex gap-2 mb-2">
          <select
            className={`${inputCSS} w-20 h-12`}
            name="size"
            value={`${sizeState}`}
            onChange={(e) => setSizeState(e.target.value)}
          >
            <option value="">None*</option>
            <option value="1">SM</option>
            <option value="2">MD</option>
            <option value="3">LG</option>
            <option value="4">XL</option>
            <option value="5">XXL</option>
          </select>
          <Button
            onClick={onClothingInventoryAdded}
            success
            className="w-20 h-12"
          >
            <p className="text-xl">Add</p>
          </Button>
        </div>
      </InputField>
      <div className="flex flex-col gap-1 mb-4">
        {inventories.map((i) => (
          <SizeInputField
            key={i.size}
            size={i.size.toString()}
            value={i.quantity}
            onChange={onClothingInventoryChange}
            onRemove={onClothingInventoryRemoved}
          />
        ))}
      </div>
    </>
  );
}
