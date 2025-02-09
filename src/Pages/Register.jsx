import { useState } from "react";
import useRegister from "../api/useRegister";
import Loading from "../Component/Helper/Loading";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { register, isLoading } = useRegister();
  console.log(register);

  if (isLoading) {
    <Loading />;
  }
  return (
    <div className="grid h-[100vh] place-content-center ">
      <div className="flex flex-col items-center w-[300px] p-10 shadow-2xl rounded-sm gap-10">
        <h3>Register</h3>
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
        <button
          className="btn-primary btn btn-outline"
          onClick={() => register({ username, password })}
        >
          register
        </button>
      </div>
    </div>
  );
};

export default Register;
