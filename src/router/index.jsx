import { RouterProvider } from "react-router-dom";
import publicRoute from "./PublicRoute";
import adminRoute from "./AdminRoute";
import userRoute from "./UserRoute";
import { useUserContext } from "../AuthProvider";

const Routes = () => {
  const { user } = useUserContext();

  let appRoute = publicRoute;
  if (user.authenticated && user.roles === "ROLE_USER") {
    appRoute = userRoute;
  } else if (user.authenticated && user.roles === "ROLE_ADMIN") {
    appRoute = adminRoute;
  }

  return <RouterProvider router={appRoute} />;
};

export default Routes;
