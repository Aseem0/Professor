import axios from "axios";
import { useState } from "react";

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

  return (
    <>
      <h1>Register Form</h1>
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-sm rounded-xl shadow-md overflow-hidden p-8">
          <h1 className="text-xl font-semibold font-sans flex justify-center items-center">
            Create an account
          </h1>
          <h2 className="text-gray-500 mt-1">
            Please enter your details to create account
          </h2>
          <form>
            <div>
              <label className="flex flex-col">
                <span className="py-1 mt-8 mb-1">Name</span>
                <input
                  type="text"
                  name="name"
                  className="text-sm border border-gray-400 rounded-lg px-2 py-2"
                  placeholder="Enter your name"
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col">
                <span className="py-1 mt-8 mb-1">Name</span>
                <input
                  type="text"
                  name="name"
                  className="text-sm border border-gray-400 rounded-lg px-2 py-2"
                  placeholder="Enter your name"
                />
              </label>
            </div>
          </form>
          {/* <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Card Title
          </h2>
          <p className="text-gray-600 mb-4">
            This is a description inside the card. You can add more details
            here.
          </p>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-80">
            Action
          </button> */}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
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
      </form>
    </>
  );
}
export default RegistrationForm;
