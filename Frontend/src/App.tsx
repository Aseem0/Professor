import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AboutUsPage from "./pages/AboutUsPage";
import bg from "./images/bgg.jpg";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import CreateQuestionSetPage from "./pages/QuestionSet/CreateQuestionSetPage";

export interface IAuthContext {
  isAuth: boolean;
  setAuthState: React.Dispatch<
    React.SetStateAction<{
      isAuth: boolean;
    }>
  >;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  setAuthState: () => {},
});

function App() {
  const [authState, setAuthState] = useState({
    isAuth: false,
  });

  console.log("auth => ", authState);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    async function fetchData() {
      axios
        .get("http://localhost:3000/api/verify/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setAuthState((prev) => ({
            ...prev,
            isAuth: true,
          }));
        })
        .catch((error) => {
          localStorage.clear();
        });
    }

    fetchData();
  }, []);

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <AuthContext.Provider
          value={{
            isAuth: authState.isAuth,
            setAuthState: setAuthState,
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
            <Route
              path="/admin/questionset/create"
              element={<CreateQuestionSetPage />}
            />
          </Routes>
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
