import { useContext } from "react";
import { createContext } from "react";

interface CSSContextProps {
  input: string;
  error: string;
}
export const inputCSS = "w-10/12 p-2 text-xl border-2 rounded";
export const errorCSS =
  "w-10/12 rounded-b-xl font-black text-white py-1 px-4 bg-red-500 rounded-b-lg";

export const CSSFormContext = createContext<CSSContextProps>({
  input: inputCSS,
  error: errorCSS,
});

export const useFormCSS = () => useContext(CSSFormContext);
