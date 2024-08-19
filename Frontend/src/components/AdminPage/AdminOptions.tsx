import Button from "../reuse/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface AdminOptionsProps {
  onChange: (value: boolean) => void;
  state: boolean;
}

export default function AdminOptions({ state, onChange }: AdminOptionsProps) {
  const navigate = useNavigate();

  const buttonClasses = "py-8";

  return (
    <div className="w-full flex justify-between mb-8 border-b-2 pb-8">
      <div className="flex gap-2 text-xl">
        {/* <Button
          selected={state}
          onClick={() => {
            onChange(true);
          }}
        >
          Order List
        </Button> */}
        <Button
          selected={!state}
          onClick={() => {
            onChange(false);
          }}
        >
          Product List
        </Button>
      </div>
      <div className="flex text-xl gap-2">
        <Button
          primary
          className="text-2xl py-3"
          roundedLG
          onClick={() => navigate("/admin/create/product")}
        >
          Create Product
        </Button>
        <Button
          primary
          className="text-2xl py-3"
          roundedLG
          onClick={() => navigate("/admin/create/order")}
        >
          Create Order
        </Button>
      </div>
    </div>
  );
}
