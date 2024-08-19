import { ReactNode } from "react";

interface InputProps {
  title: string;
  tip: string;
  children: ReactNode;
}

export default function InputField({ title, tip, children }: InputProps) {
  return (
    <div className="mb-5 px-4">
      <h3 className="text-shade-4 font-bold text-2xl">{title}</h3>
      <div className="flex gap-4">
        <p className="text-gray-400">{tip}</p>
      </div>
      {children}
    </div>
  );
}
