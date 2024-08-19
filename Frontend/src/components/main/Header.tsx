import { BsCart3 } from "react-icons/bs";
import NavLink from "../reuse/NavLink";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FiMenu } from "react-icons/fi";

interface HeaderProps {
  handleCartClick: () => void;
  handleOptionsPressed: () => void;
}

export default function Header({
  handleCartClick,
  handleOptionsPressed,
}: HeaderProps) {
  const cart = useSelector((state: RootState) => state.cart.items);
  const count = cart.reduce((a, c) => a + c.quantity, 0);

  return (
    <header className="fixed top-0 z-[48] w-full flex justify-between pt-2 pb-2 h-24 lg:px-16 lg:pl-2 pl-2 md:pr-10 sm:pr-2 bg-tint-9 bg-opacity-85">
      <Logo isBlack={true} />
      <nav className="md:flex gap-8 items-center hidden uppercase">
        <NavLink
          to={"/shop"}
          classNames="font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
      hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-transparent bg-clip-text text-3xl
          "
        >
          SHOP
        </NavLink>
        <NavLink to={"/about"} classNames="text-shade-1 text-2xl">
          ABOUT
        </NavLink>
        <NavLink to={"/contact"} classNames="text-shade-1 text-2xl">
          CONTACT
        </NavLink>
        <div
          className="size-10 cursor-pointer hover:opacity-50 relative"
          onClick={handleCartClick}
        >
          <BsCart3 className="w-full h-full" />
          {count > 0 && (
            <div className="flex absolute items-center justify-center text-white bg-red-500 size-10 text-3xl px-4 top-0 left-full">
              <p>{count}</p>
            </div>
          )}
        </div>
      </nav>
      <div className="md:hidden flex justify-content items-center">
        <FiMenu
          className="size-16 cursor-pointer text-shade-2"
          onClick={handleOptionsPressed}
        />
      </div>
    </header>
  );
}
