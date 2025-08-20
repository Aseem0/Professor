import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, type IAuthContext } from "../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { isAuth, setAuthState } = useContext<IAuthContext>(AuthContext);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const findData = {
      email,
      password,
    };

    axios
      .post("http://localhost:3000/userRoutes/login", findData)
      .then((response) => {
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("error => ", error);
        const errors = error?.response?.data?.message || "An error occurred";
        alert(errors);
      });
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-92px)]">
        <div className="max-w-sm rounded-xl shadow-md overflow-hidden p-10 mb-5 border border-white text-white fill-white drop-shadow-xl/50">
          <h1 className="text-3xl font-semibold font-sans flex justify-center items-center">
            Welcome back
          </h1>
          <h2 className="text-stone-200 mt-1 mb-4">
            Enter your details to acess your account
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="flex flex-col">
                <span className="text-sm py-1 mt-2">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full text-sm border border-gray-400 rounded-lg px-2 py-2"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="flex flex-col">
                <span className="text-sm py-1 mt-2">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="w-full text-sm border border-gray-400 rounded-lg px-2 py-2"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <button
              type="submit"
              className="w-full 
               font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-black hover:brightness-110 py-2 px-2 mt-6 rounded-lg hover:opcity-80 cursor-pointer "
            >
              Login
            </button>
          </form>
          <div className="flex justify-center items-center mt-4">
            <p>
              Dont have an account?{" "}
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
