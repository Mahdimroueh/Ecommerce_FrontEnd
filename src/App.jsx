import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./AuthProvider";
import Routes from "./router";
import { useEffect } from "react";
import AuthMe from "./api/AuthMe";

export const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    AuthMe();
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} />{" "} */}
    </QueryClientProvider>
  );
};

export default App;
