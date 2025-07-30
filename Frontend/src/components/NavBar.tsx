import { NavLink } from "react-router-dom";

function NavBar() {
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
      </nav>
    </div>
  );
}
export default NavBar;
