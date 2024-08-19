import Button from "../reuse/Button";
import { useNavigate } from "react-router-dom";

export default function EmptyCart({
  onClosePressed,
}: {
  onClosePressed: () => void;
}) {
  const navigate = useNavigate();

  const onPressed = () => {
    onClosePressed();
    navigate("/shop");
  };

  return (
    <div className="h-full w-full flex gap-4 md:gap-2 flex-col justify-center items-center">
      <p className="text-5xl md:text-3xl lg:text-2xl">Empty Cart!</p>
      <Button
        primary
        rounded
        onClick={onPressed}
        className="text-5xl font-normal md:text-3xl lg:text-2xl"
      >
        <p className="p-4">Add Discs</p>
      </Button>
    </div>
  );
}
