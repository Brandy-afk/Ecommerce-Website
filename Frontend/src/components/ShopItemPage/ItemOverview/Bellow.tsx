import { ReactNode } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { HiOutlineChevronUp } from "react-icons/hi";

interface BellowProps {
  keyValue: number;
  label: string;
  content: ReactNode;
  state: boolean;
  onToggle: () => void;
}

export default function Bellow({
  keyValue,
  label,
  content,
  state,
  onToggle,
}: BellowProps) {
  const bodyText = state ? content : "";

  const icon = state ? (
    <HiOutlineChevronUp className="icon" />
  ) : (
    <HiOutlineChevronDown className="icon" />
  );

  return (
    <div className="" key={keyValue}>
      <div
        className={`flex justify-between p-5 md:p-3 text-4xl md:text-2xl cursor-pointer items-center ${
          keyValue > 0 ? "border-t-2 border-neutral-400" : ""
        }`}
        onClick={onToggle}
      >
        <h3 className="text-neutral-800">{label}</h3>
        {icon}
      </div>
      {bodyText}
    </div>
  );
}
