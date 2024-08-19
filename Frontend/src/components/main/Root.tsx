import Footer from "./Footer/Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import Cart from "../../pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Options from "./Options";

export default function Root() {
  const location = useLocation();
  const [showCart, setShowCart] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const handleOptionsClicked = () => {
    setShowOptions(!showOptions);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="w-screen">
      <Header
        handleCartClick={handleCartClick}
        handleOptionsPressed={handleOptionsClicked}
      />
      <Outlet />
      <Footer />
      <Cart onClosePressed={handleCartClick} isOpen={showCart} />
      {showOptions && (
        <Options
          onCartPressed={handleCartClick}
          onClosePressed={handleOptionsClicked}
        />
      )}
      <ToastContainer />
    </div>
  );
}
