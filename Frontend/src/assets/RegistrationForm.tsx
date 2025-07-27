import { Container, Paper } from "@mui/material";
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
