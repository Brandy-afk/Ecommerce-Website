import { Navigate, createBrowserRouter } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ContactPage from "./pages/ContactPage";
import Root from "./components/main/Root";
import ShopItemPage from "./pages/ShopItemPage";
import LoginPage from "./pages/Admin/LoginPage";
import AdminPage from "./pages/Admin/AdminPage";
import ProtectedComponent from "./components/reuse/ProtectedComponent";
import CheckoutPage from "./pages/CheckoutPage";
import CreateProductPage from "./pages/Admin/CreateProductPageFolder/CreateProductPage";
import ProductOverviewPage from "./pages/Admin/ProductOverviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/:id",
        element: <ShopItemPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },

      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/admin/home",
    element: (
      <ProtectedComponent>
        <AdminPage />
      </ProtectedComponent>
    ),
  },

  {
    path: "/admin/create/product",
    element: (
      <ProtectedComponent>
        <CreateProductPage />
      </ProtectedComponent>
    ),
  },
  {
    path: "/admin/product/:id",
    element: (
      <ProtectedComponent>
        <ProductOverviewPage />
      </ProtectedComponent>
    ),
  },
]);

export default router;
