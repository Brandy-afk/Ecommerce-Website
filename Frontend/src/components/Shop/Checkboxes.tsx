import {
  CheckBoxType,
  useFilterContext,
} from "../../pages/ShopPage/ShopContext";

interface CheckBoxChoice {
  choice: string;
  value: string;
}

interface CheckBoxesProps {
  heading: string;
  options: CheckBoxChoice[];
  choices: string[];
  dispatchType: CheckBoxType;
}

export default function CheckBoxes({
  heading,
  options,
  choices,
  dispatchType,
}: CheckBoxesProps) {
  const { dispatch } = useFilterContext();

  const handleCheckChange = (item: string, checked: boolean) => {
    if (checked) {
      dispatch({
        type: dispatchType,
        payload: [...choices, item],
      });
    } else {
      const updatedItems = choices.filter((i: string) => i !== item);
      dispatch({ type: dispatchType, payload: updatedItems });
    }
  };

  return (
    <div className="md:mb-0 mb-4">
      <h3 className="font-semibold text-2xl md:mb-0 mb-1 md:text-lg text-nowrap">
        {heading}
      </h3>
      <ul className="flex flex-col md:gap-0 gap-2">
        {options.map((item) => (
          <li key={item.value} className="flex gap-1 items-center text-nowrap">
            <input
              type="checkbox"
              className="size-8 md:size-4 border-none"
              checked={choices.includes(item.value)}
              onChange={(e) => handleCheckChange(item.value, e.target.checked)}
            />
            <label className="text-2xl md:text-lg">{item.choice}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
