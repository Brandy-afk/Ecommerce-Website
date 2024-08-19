import ReactDOM from "react-dom";
import { useEffect } from "react";
import NavLink from "../reuse/NavLink";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FaRegWindowClose } from "react-icons/fa";
import ReactModal from "react-modal";
import { BsCart3 } from "react-icons/bs";

interface OptionsProps {
  onClosePressed: () => void;
  onCartPressed: () => void;
}

export default function Options({
  onClosePressed,
  onCartPressed,
}: OptionsProps) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden", "w-full", "fixed");
    return () => {
      document.body.classList.remove("overflow-hidden", "w-full", "fixed");
    };
  }, []);

  const cart = useSelector((state: RootState) => state.cart.items);
  const count = cart.reduce((a, c) => a + c.quantity, 0);

  const handleCartClick = () => {
    onCartPressed();
  };

  const navClasses = "text-tint-8 text-5xl text-center";

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClosePressed}
      className="transparent"
      overlayClassName="fixed inset-0 z-[49] bg-black backdrop-blur-sm opacity-95 flex justify-center items-center"
      contentLabel="Confirm Action"
    >
      <nav
        className="grid grid-rows-5 content-center gap-12"
        onClick={onClosePressed}
      >
        <NavLink to={"/"} classNames={navClasses}>
          Home
        </NavLink>
        <NavLink to={"/shop"} classNames={navClasses}>
          Shop
        </NavLink>
        <NavLink to={"/about"} classNames={navClasses}>
          about
        </NavLink>
        <NavLink to={"/contact"} classNames={navClasses}>
          contact
        </NavLink>
        <div
          className="size-20 relative justify-self-center cursor-pointer flex"
          onClick={handleCartClick}
        >
          <BsCart3 className="size-20 hover:scale-110 text-tint-8 mb-2" />
          {count > 0 && (
            <div className="flex absolute items-center justify-center text-white bg-red-500 size-20 text-6xl px-4 top-0 left-full">
              <p>{count}</p>
            </div>
          )}
        </div>

        {/* <div
          className="size-10 cursor-pointer hover:opacity-50 relative"
          onClick={handleCartClick}
        >
          <BsCart3 className="w-full h-full text-tint-9" />
          {count > 0 && (
            <div className="flex absolute items-center justify-center text-white bg-red-500 size-10 text-3xl px-4 top-0 left-full">
              <p>{count}</p>
            </div>
          )}
        </div> */}
      </nav>
    </ReactModal>
  );
}
{
  /* <aside>
      {" "}
      <div
        className="fixed inset-0 z-[49] bg-black backdrop-blur-sm opacity-95 flex justify-center items-center"
        onClick={onClosePressed}
      >
        <nav className="grid grid-rows-5 content-center gap-16">
          <NavLink to={"/"} classNames={navClasses}>
            Home
          </NavLink>
          <NavLink to={"/shop"} classNames={navClasses}>
            Shop
          </NavLink>
          <NavLink to={"/about"} classNames={navClasses}>
            about
          </NavLink>
          <NavLink to={"/contact"} classNames={navClasses}>
            contact
          </NavLink>
          <div
            className="size-20 relative justify-self-center cursor-pointer flex"
            onClick={handleCartClick}
          >
            <FaShoppingCart className="size-20 hover:scale-110 text-tint-8 mb-2" />
            {count > 0 && (
              <div className="flex size-20 absolute items-center justify-center text-white bg-red-400 font-black size-10 text-7xl md:text-4xl px-4 top-0 left-full rounded-full">
                <p>{count}</p>
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside> */
}
