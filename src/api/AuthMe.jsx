import { redirect } from "react-router-dom";
import { customFetch } from "./AxiosFetch";
import { toast } from "react-toastify";

const AuthMe = async () => {
  try {
    const response = await customFetch("/auth/me");
    return response.data;
  } catch (e) {
    if (e.response && e.response.status === 401) {
      toast.warning("Your session has expired. Please log in again.");
      redirect("/");
    }
    throw e;
  }
};

export default AuthMe;
