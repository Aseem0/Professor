import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AboutUsPage from "./pages/AboutUsPage";
import Login from "./components/Login";
import bg from "./images/bgg.jpg";

function App() {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
