import { To } from "react-router-dom";
import Button from "../reuse/Button";

interface ButtonOptionsProps<TOption extends string> {
  textValues: TOption[];
  setSelected: (value: TOption, index: number) => void;
  activeState: TOption;
  buttonStates?: boolean[];
}

export default function ButtonOptions<TOption extends string>({
  textValues,
  setSelected,
  activeState,
  buttonStates,
}: ButtonOptionsProps<TOption>) {
  const buttonClasses = "w-32 text-2xl py-4 md:text-base md:w-24 md:py-2";

  return (
    <div className="flex w-max">
      {textValues.map((text, index) => {
        const active = !buttonStates || buttonStates[index];
        return (
          <Button
            disable={buttonStates && !buttonStates[index]}
            outline
            key={text}
            onClick={active ? () => setSelected(text, index) : undefined}
            selected={activeState === text}
            className={`${buttonClasses} ${
              index > 0 ? "ml-[-2px]" : ""
            } flex-grow`}
          >
            {text}
          </Button>
        );
      })}
    </div>
  );
}
