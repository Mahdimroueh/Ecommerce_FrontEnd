import { createContext, useContext } from "react";
import useAuth from "./api/Auth";
import Loading from "./Component/Helper/Loading";
import ErrorPage from "./Component/Helper/GlobalError";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const {
    user,
    isUserLoading,
    isUserError,
    login,
    isLoginLoading,
    isLoginError,
    logout,
    isLogoutLoading,
    isLogoutError,
    isLoginSuccess,
    refetch,
  } = useAuth();

  if (isUserLoading) {
    return <Loading />;
  }
  if (isUserError) {
    return <ErrorPage />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        isUserError,
        login,
        isLoginLoading,
        isLoginError,
        logout,
        isLogoutLoading,
        isLogoutError,
        isLoginSuccess,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
