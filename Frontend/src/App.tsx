import { RouterProvider } from "react-router-dom";
import router from "./router";
import ReactModal from "react-modal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCart } from "./store/store";
import Cookies from "js-cookie";

ReactModal.setAppElement("#root");

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCartItems = Cookies.get("cart");
    if (savedCartItems) {
      dispatch(loadCart(JSON.parse(savedCartItems)));
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
