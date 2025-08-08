import { NavLink } from "react-router-dom";
import { AuthContext, type IAuthContext } from "../App";
import { useContext } from "react";

function NavBar() {
  const { isAuth, setAuthState } = useContext<IAuthContext>(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    setAuthState((prev) => ({
      ...prev,
      isAuth: false,
    }));
  };

  return (
    <div>
      <nav className="text-lg flex justify-center items-center text-white font-medium gap-20 p-8">
        <NavLink
          className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all duration-500"
          to="/"
        >
          HOME
        </NavLink>
        <NavLink
          className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all duration-500"
          to="/about"
        >
          ABOUT
        </NavLink>
        {isAuth ? (
          <>
            <NavLink
              className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all duration-500"
              to="/profile"
            >
              Profile
            </NavLink>
            <button
              className="w-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-black hover:brightness-110 py-2 px-2 mt-6 rounded-lg hover:opcity-80 cursor-pointer "
              onClick={logoutHandler}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all duration-500"
              to="/register"
            >
              REGISTER
            </NavLink>
            <NavLink
              className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all duration-500"
              to="/login"
            >
              LOGIN
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}
export default NavBar;
