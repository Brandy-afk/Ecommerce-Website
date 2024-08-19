import { TbCircleLetterZFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import logoImage from "../../resources/logos/Logo.png";

export default function Logo({ isBlack }: { isBlack: boolean }) {
  // const color = isBlack ? "text-shade-1" : "text-tint-6";
  // const background = isBlack ? "bg-tint-9" : "bg-shade-2";
  // const borderClass = isBlack ? "border-shade-1" : "border-tint-6";

  return (
    <Link to={"/"} className={`h-22 hover:cursor-pointer rounded`}>
      {/* <TbCircleLetterZFilled className={`w-16 h-16 disc-icon`} />
      <h1 className={`font-bold text-5xl`}>Dyes</h1> */}

      <img src={logoImage} className="size-full object-contain" />
    </Link>
  );
}
