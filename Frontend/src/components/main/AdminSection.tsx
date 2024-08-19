import { ReactNode } from "react";

interface AdminSectionProps {
  children: ReactNode;
  header: string;
}

export default function AdminSection({ children, header }: AdminSectionProps) {
  return (
    <div className="w-full">
      <div className="mx-auto lg:w-8/12 my-12 rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-b from-shade-6 to-shade-3 p-8 flex justify-center mb-8">
          <h1 className="text-tint-9 font-semibold text-4xl">{header}</h1>
        </div>
        <div className="flex flex-col mx-4 mb-4">{children}</div>
      </div>
    </div>
  );
}
