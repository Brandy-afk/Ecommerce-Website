import { CellContext } from "@tanstack/react-table";
import Button from "../reuse/Button";
import { SlOptions } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";

export interface MenuOption {
  value: string;
  onInteraction: (id: string) => void;
}

interface OptionsCellsProps<TData> {
  column: CellContext<TData, string>;
  options: MenuOption[];
}

export default function OptionsCell<TData>({
  column,
  options,
}: OptionsCellsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex relative" ref={dropdownRef}>
      <SlOptions
        className={`size-10 cursor-pointer ${isOpen ? "opacity-50" : ""}`}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <ul className="absolute text-tint-9 shadow-2xl top-full right-0 bg-shade-4 border-2 border-shade-2 z-50">
          {options.map((option, index) => (
            <li
              key={index}
              className={`hover:bg-shade-5 px-6 cursor-pointer py-1 text-xl ${
                index > 0 ? "border-t-2 border-shade-2" : ""
              }`}
              onClick={() => {
                option.onInteraction(column.getValue());
                setIsOpen(false);
              }}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>

    // <div className="grid grid-cols-2 p-4 items-center gap-2 justify-center">
    //   <Button
    //     roundedLG
    //     danger
    //     className="text-2xl"
    //     onClick={() => onEdit(column.getValue())}
    //   >
    //     Edit
    //   </Button>
    //   <Button
    //     warning
    //     roundedLG
    //     className="text-2xl"
    //     onClick={() =>
    //       setDeleteModalState({ state: true, id: info.getValue() })
    //     }
    //   >
    //     Delete
    //   </Button>
    // </div>
  );
}
