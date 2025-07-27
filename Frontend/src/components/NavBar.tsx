import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <NavLink to="/"> Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/register">Register Page</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </div>
  );
}
export default NavBar;
