import { useQuery, useMutation, useQueryClient } from "react-query";
import AuthMe from "./AuthMe";
import { customFetch } from "./AxiosFetch";
import { toast } from "react-toastify";

const useAuth = (navigateToHome) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch,
  } = useQuery(["user"], AuthMe, {
    retry: false,
  });

  const {
    mutateAsync: login,
    isLoading: isLoginLoading,
    isError: isLoginError,
    isSuccess: isLoginSuccess,
  } = useMutation(
    async (credentials) => {
      const response = await customFetch.post("/auth/login", credentials);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
        window.location.href = "/";
      },
      onError: (e) => {
        console.log(e);
        toast.error(e.response.data.message);
      },
    }
  );

  const {
    mutateAsync: logout,
    isLoading: isLogoutLoading,
    isError: isLogoutError,
  } = useMutation(
    async () => {
      try {
        await customFetch.post("/auth/logout");
      } catch (e) {
        console.log(e);
      }
    },
    {
      onSuccess: () => {
        queryClient.removeQueries("user");
        window.location.href = "/";
      },
      onError: (e) => {
        console.log(e);
        queryClient.removeQueries("user");

        window.location.href = "/";
      },
    }
  );

  return {
    user,
    isUserLoading,
    isUserError,
    isLoginSuccess,
    login,
    isLoginLoading,
    isLoginError,
    logout,
    isLogoutLoading,
    isLogoutError,
    refetch,
  };
};

export default useAuth;
