import { createBrowserRouter} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../Pages/HomeLayout";
import MenPage from "../Pages/MenPage";
import SingleProductPage from "../Pages/SingleProductPage";
import WomenPage from "../Pages/WomenPage";
import ProductsPage from "../Pages/ProductsPage";
import NotFound from "../Component/Helper/NotFound";

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
