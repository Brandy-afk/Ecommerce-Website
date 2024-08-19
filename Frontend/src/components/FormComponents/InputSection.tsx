import { ReactNode } from "react";

interface InputSectionProps {
  header: string;
  children: ReactNode;
  onSubmit?: () => void;
}

export default function InputSection({
  header,
  children,
  onSubmit,
}: InputSectionProps) {
  const onSectionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form
      onSubmit={onSectionSubmit}
      className="border-2 border-gray-200 p-2 rounded-lg mb-4"
    >
      <h2 className="font-black text-3xl text-start pl-2 uppercase text-tint-9 bg-gradient-to-r from-shade-4 to-transparent rounded-lg mb-4 p-2">
        {header}
      </h2>
      {children}
    </form>
  );
}
