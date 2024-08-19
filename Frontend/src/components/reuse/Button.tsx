import className from "classnames";
import { ReactNode } from "react";
import { GoSync } from "react-icons/go";

interface ButtonType {
  children: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  loading?: boolean;
  shadow?: boolean;
  oos?: boolean; //out of stock
  disable?: boolean;
  outline?: boolean;
  rainbow?: boolean;
  roundedMed?: boolean;
  roundedLG?: boolean;
  roundedFull?: boolean;
  loadingFit?: boolean;
  selected?: boolean;
  outlineWithBackground?: boolean;
  scale?: boolean;
  [key: string]: any; // Rest parameter
}

export default function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  outlineWithBackground, // New prop
  oos,
  disable,
  rainbow,
  rounded,
  shadow,
  loading,
  loadingFit,
  scale,
  selected,
  ...rest
}: ButtonType) {
  const finalClassName = className(
    "flex",
    "items-center",
    "justify-center",
    "px-10",
    "py-2",
    "font-semibold",
    "transition-all duration-300", // Added transition for smooth effects
    rest.className,
    {
      "border-2": outline || outlineWithBackground,
      "shadow-lg": shadow,
      "rounded-xl": rounded,
      "hover:scale-110 transition-all": scale,
      "text-gray-400 bg-gray-200 cursor-auto": disable,
      "text-shade-2 rainbow-button": rainbow,
      "bg-gray-300 cursor-auto": oos,
      "bg-gray-400 cursor-auto text-tint-9": loading,
      "bg-shade-4 text-white cursor-auto": selected,
    },
    {
      "bg-blue-500 text-tint-9 hover:bg-blue-600":
        (primary && !outline) || (primary && outlineWithBackground),
      "border-blue-500 text-blue-500 hover:bg-blue-50":
        primary && outline && !outlineWithBackground,
      "border-blue-600 bg-blue-500 text-white hover:bg-blue-600":
        primary && outlineWithBackground,

      "bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-md":
        (secondary && !outline) || (secondary && outlineWithBackground),
      "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400":
        secondary && outline && !outlineWithBackground,
      "border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 hover:border-gray-400":
        secondary && outlineWithBackground,

      "bg-green-200 text-shade-6 hover:bg-green-300":
        (success && !outline) || (success && outlineWithBackground),
      "border-green-500 text-green-700 hover:bg-green-50":
        success && outline && !outlineWithBackground,
      "border-green-600 bg-green-200 text-shade-6 hover:bg-green-300":
        success && outlineWithBackground,

      "bg-red-200 text-red-600 hover:bg-red-300":
        (warning && !outline) || (warning && outlineWithBackground),
      "border-red-400 text-red-500 hover:bg-red-50":
        warning && outline && !outlineWithBackground,
      "border-red-500 bg-red-200 text-red-600 hover:bg-red-300":
        warning && outlineWithBackground,

      "bg-yellow-300 text-yellow-700 hover:bg-yellow-400":
        (danger && !outline) || (danger && outlineWithBackground),
      "border-yellow-500 text-yellow-600 hover:bg-yellow-50":
        danger && outline && !outlineWithBackground,
      "border-yellow-600 bg-yellow-300 text-yellow-700 hover:bg-yellow-400":
        danger && outlineWithBackground,
    }
  );

  let content: any;
  if (oos) {
    content = <p className="text-gray-400">Out of stock</p>;
  } else {
    content = loading ? (
      <GoSync
        className={`animate-spin ${
          loadingFit ? "max-w-full max-h-full" : "w-full h-full"
        }`}
      />
    ) : (
      children
    );
  }

  return (
    <button {...rest} className={finalClassName}>
      {content}
    </button>
  );
}
