import { IoWarningOutline } from "react-icons/io5";

export default function Warning({
  warning,
  classNames,
}: {
  warning: string;
  classNames?: string;
}) {
  return (
    <div className={`mb-4 text-neutral-400 flex items-center ${classNames}`}>
      <IoWarningOutline className="size-10 md:size-6" />
      <p className="text-2xl md:text-base">{warning}</p>
    </div>
  );
}
