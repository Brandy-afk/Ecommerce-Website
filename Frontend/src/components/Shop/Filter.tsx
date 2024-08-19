import { useFilterContext } from "../../pages/ShopPage/ShopContext";
import { useState } from "react";
import Button from "../reuse/Button";
import CheckBoxes from "./Checkboxes";
import { Skeleton } from "../reuse/Skeleton";

interface ApplyInputState {
  name: string;
  min: string | number;
  max: string | number;
}

export default function Filter({ isLoading }: { isLoading: boolean }) {
  const { state, dispatch } = useFilterContext();
  const [applyInputs, setApplyInputs] = useState<ApplyInputState>({
    name: "",
    min: 0,
    max: 0,
  });

  const onApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      (applyInputs.min as number) >= 0 &&
      applyInputs.min <= applyInputs.max
    ) {
      dispatch({
        type: "SET_APPLY_INPUTS",
        payload: {
          name: applyInputs.name,
          min: (applyInputs.min as number) ?? 0,
          max: (applyInputs.max as number) ?? 0,
        },
      });
    } else {
      setApplyInputs({ ...applyInputs, min: 0, max: 0 });
    }
  };

  return isLoading ? (
    <Skeleton className="md:w-36 lg:w-48 p-2 gap-2" />
  ) : (
    <aside className="flex flex-col  md:w-36 lg:w-48 p-2 gap-2">
      <div>
        <p
          className="cursor-pointer text-2xl md:text-lg font"
          onClick={() => dispatch({ type: "RESET_FILTERS" })}
        >
          Reset Filters
        </p>
        <h2 className="text-4xl md:text-3xl font-semibold tracking-tight">
          Filter By
        </h2>
      </div>
      <form onSubmit={onApply}>
        <input
          type="text"
          placeholder="Product Name"
          name="name"
          value={applyInputs.name}
          onChange={(e) =>
            setApplyInputs({ ...applyInputs, name: e.target.value })
          }
          className="w-full bg-gray-300 rounded p-2 text-xl md:text-md"
        />
        <div>
          <label className="font-semibold text-2xl md:text-lg">Price</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={applyInputs.min}
              onChange={(e) => {
                const value = e.target.value;
                setApplyInputs({
                  ...applyInputs,
                  min:
                    value === ""
                      ? ""
                      : isNaN(parseInt(value))
                      ? ""
                      : parseInt(value),
                });
              }}
              className="bg-gray-300 rounded text-2xl md:text-lg p-1"
              name="min"
            />
            <input
              type="number"
              placeholder="Max"
              value={applyInputs.max}
              onChange={(e) => {
                const value = e.target.value;
                setApplyInputs({
                  ...applyInputs,
                  max:
                    value === ""
                      ? ""
                      : isNaN(parseInt(value))
                      ? ""
                      : parseInt(value),
                });
              }}
              className="bg-gray-300 rounded text-2xl md:text-lg p-1"
              name="max"
            />
          </div>
        </div>
        <Button
          secondary
          type="submit"
          className="my-4 text-3xl md:h-content h-20 md:text-xl w-full hover:bg-shade-3 hover:text-tint-9 active:bg-shade-2"
        >
          <p className="w-full text-center">Apply</p>
        </Button>
      </form>
      <label className="flex items-center gap-1 text-nowrap">
        <input
          type="checkbox"
          className="size-8 md:size-4"
          checked={state.inStockOnly}
          onChange={(e) =>
            dispatch({ type: "SET_SHOW_STOCK", payload: e.target.checked })
          }
        />
        <p className="text-2xl md:text-lg">Show in stock only</p>
      </label>
      <CheckBoxes
        choices={state.manufacturers}
        heading="Manufacturer"
        options={[
          { choice: "ZDyes", value: "1" },
          { choice: "Innova", value: "4" },
          { choice: "Discraft", value: "3" },
          { choice: "Lone Star Disc", value: "5" },
          { choice: "MVP", value: "6" },
          { choice: "Discmania", value: "2" },
        ]}
        dispatchType="SET_MANUFACTURER"
      />
      <CheckBoxes
        choices={state.productTypes}
        heading="Product Type"
        options={[
          { choice: "Disc", value: "1" },
          { choice: "Clothing", value: "2" },
        ]}
        dispatchType="SET_PRODUCT"
      />
      <CheckBoxes
        choices={state.discTypes}
        heading="Disc Types"
        options={[
          { choice: "Distance Driver", value: "1" },
          { choice: "Fairway Driver", value: "2" },
          { choice: "Mid-Range", value: "3" },
          { choice: "Putt and Approach", value: "4" },
          { choice: "Touch", value: "5" },
        ]}
        dispatchType="SET_TYPE"
      />
      <CheckBoxes
        choices={state.colorQuery}
        heading="Colors"
        options={[
          { choice: "Red", value: "Red" },
          { choice: "Blue", value: "Blue" },
          { choice: "Green", value: "Green" },
          { choice: "Yellow", value: "Yellow" },
          { choice: "White", value: "White" },
          { choice: "Black", value: "Black" },
          { choice: "Orange", value: "Orange" },
          { choice: "Purple", value: "Purple" },
          { choice: "Pink", value: "Pink" },
          { choice: "Grey", value: "Grey" },
        ]}
        dispatchType="SET_COLOR"
      />
    </aside>
  );
}
