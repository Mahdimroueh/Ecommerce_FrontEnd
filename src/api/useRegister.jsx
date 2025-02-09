import { useMutation } from "react-query";
import { customFetch } from "./AxiosFetch";
import { toast } from "react-toastify";

const useRegister = () => {
  const { mutateAsync: register, isLoading } = useMutation(
    async (credential) => {
      const response = await customFetch.post("/auth/register", credential);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("you are successfully registered");
        window.location.href = "/login";
      },
      onError: (e) => {
        toast.error(e.response.data.message);
      },
    }
  );

  return {
    register,
    isLoading,
  };
};

export default useRegister;
