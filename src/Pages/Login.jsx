import { useState } from "react";
import { useUserContext } from "../AuthProvider";
import Loading from "../Component/Helper/Loading";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoginLoading, isLoginError, isLoginSuccess } =
    useUserContext();
  if (isLoginLoading || isLoginSuccess) {
    return <Loading />;
  }
  // if (isLoginError) {
  //   return <ErrorPage />;
  // }

  const handleLogin = () => {
    login({ username, password });
  };

  return (
    <div className="grid h-[100vh] place-content-center ">
      <div className="flex flex-col items-center w-[300px] p-10 shadow-2xl rounded-sm gap-10">
        <h3>Login</h3>
        <input
          label="username"
          required
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="enter your username"
          className="input input-primary"
        />
        <input
          label="password"
          required
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your password"
          className="input input-primary"
        />
        <button className="btn btn-primary btn-outline" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
