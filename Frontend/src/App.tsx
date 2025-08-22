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
import { jwtDecode } from "jwt-decode";
import ListQuestionSetPage from "./pages/QuestionSet/ListQuestionSetPage";
import AttemptQuizPage from "./pages/QuestionSet/AttemptQuizPage";
import ProfilePage from "./pages/ProfilePage";

export interface IAuthState {
  isAuth: boolean;
  role: "admin" | "professional" | "guest";
}

export interface IAuthContext extends IAuthState {
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
}

export interface JwtDecode {
  id: string;
  role: "admin" | "professional" | "guest";
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  role: "guest",
  setAuthState: () => {},
});

function App() {
  const [authState, setAuthState] = useState<IAuthState>({
    isAuth: false,
    role: "guest",
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
          const { role }: JwtDecode = jwtDecode(accessToken as string);
          setAuthState((prev) => ({
            ...prev,
            isAuth: true,
            role,
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
            setAuthState,
            role: authState?.role,
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            {/* unauth */}
            {authState?.role === "guest" && (
              <>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
              </>
            )}
            {/* auth */}
            {authState?.isAuth && (
              <>
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/questionset/list"
                  element={<ListQuestionSetPage />}
                />
                <Route
                  path="/questionset/:id/attempt"
                  element={<AttemptQuizPage />}
                />
              </>
            )}
            {/* admin routes */}
            {authState?.role === "admin" && (
              <>
                <Route
                  path="/admin/questionset/create"
                  element={<CreateQuestionSetPage />}
                />
              </>
            )}
            <Route
              path="*"
              element={<div className="text-white">404 Not Found</div>}
            />
          </Routes>
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
