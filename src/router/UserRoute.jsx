import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../Pages/HomeLayout";
import MenPage from "../Pages/MenPage";
import SingleProductPage from "../Pages/SingleProductPage";
import WomenPage from "../Pages/WomenPage";
import ProductsPage from "../Pages/ProductsPage";
import UserPage from "../Pages/UserPage";
import CartPage from "../Pages/CartPage";
import NotFound from "../Component/Helper/NotFound";
import WishListPage from "../Pages/WishListPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <MenPage />,
      },
      {
        path: "/women",
        element: <WomenPage />,
      },
      {
        path: "/men/products",
        element: <ProductsPage category="men" />,
      },
      {
        path: "/women/products",
        element: <ProductsPage category="women" />,
      },
      {
        path: "/products/:id",
        element: <SingleProductPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/wishlist",
        element: <WishListPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default route;
