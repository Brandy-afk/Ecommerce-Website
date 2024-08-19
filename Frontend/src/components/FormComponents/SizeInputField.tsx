import Button from "../reuse/Button";

interface SizeInputFieldProps {
  size: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (size: string) => void;
}

export default function SizeInputField({
  size,
  value,
  onChange,
  onRemove,
}: SizeInputFieldProps) {
  const onRemovePressed = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onRemove(size);
  };

  const textClasses = "text-xl";
  const sizeMap = new Map<string, string>([
    ["0", "None"],
    ["1", "SM"],
    ["2", "MD"],
    ["3", "LG"],
    ["4", "XL"],
    ["5", "XXL"],
  ]);

  return (
    <div
      key={size}
      className="flex items-center gap-2 mx-4 border-b-2 pb-2 mb-1 border-gray-100"
    >
      <Button
        onClick={onRemovePressed}
        rounded
        warning
        className="px-4 w-20 py-1 text-xl"
      >
        Delete
      </Button>
      <p className={`${textClasses} text-shade-4 w-16 text-center`}>
        {sizeMap.get(size)}
      </p>
      <input
        type="number"
        className={`${textClasses} p-2 text-xl border-2 rounded`}
        name={size}
        value={value}
        onChange={onChange}
        placeholder="Stock*"
        required
      />
    </div>
  );
}
