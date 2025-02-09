import { createBrowserRouter } from "react-router-dom";
import Admin from "../Pages/Admin/Admin";
import DashBoard from "../Pages/Admin/DashBoard";
import AllProduct from "../Component/Admin/AddProduct/ProductForm";
import AddCategoryForm from "../Component/Admin/AddCategory/AddCategoryForm";
import AddProduct from "../Component/Admin/AddProduct/AddProduct";
import NotFound from "../Component/Helper/NotFound";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "product",
        element: <AllProduct />,
      },
      {
        path: "/addProduct",
        element: <AddProduct />,
      },
      {
        path: "category",
        element: <AddCategoryForm />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default route;
