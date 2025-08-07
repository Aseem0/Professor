import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const findData = {
      name,
      email,
      password,
    };

    axios
      .post("http://localhost:3000/userRoutes/create", findData)
      .then((response) => {
        alert("User Registered Succesfully");
      })
      .catch((error) => {
        const errors = error?.response?.data?.message || "An error occured";
        alert(errors);
      });
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-92px)]">
        <div className="max-w-sm rounded-xl shadow-md overflow-hidden p-10 mb-5 border border-white text-white">
          <h1 className="text-3xl font-semibold font-sans flex justify-center items-center">
            Create an account
          </h1>
          <h2 className="text-stone-200 mt-1 mb-4">
            Please enter your details to create account
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="flex flex-col">
                <span className="text-sm py-1 mt-2">Name</span>
                <input
                  type="text"
                  name="name"
                  className="text-sm border border-gray-400 rounded-lg px-2 py-2"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleNameChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="email" className="flex flex-col">
                <span className="text-sm py-1 mt-2">Email</span>
                <input
                  type="email"
                  name="email"
                  className="text-sm border border-gray-400 rounded-lg px-2 py-2"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password" className="flex flex-col">
                <span className="text-sm py-1 mt-2">Password</span>
                <input
                  type="password"
                  name="password"
                  className="text-sm border border-gray-400 rounded-lg px-2 py-2"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full 
               font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-black hover:brightness-110 py-2 px-2 mt-6 rounded-lg hover:opcity-80 cursor-pointer "
            >
              Register
            </button>
          </form>
          <div className="flex justify-center items-center mt-4">
            <p>
              Already have an account?{" "}
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:opacity-80 cursor-pointer duration-250"
        >
          Register
        </button>
      </form> */}
    </>
  );
}
export default RegistrationForm;
