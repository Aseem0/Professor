import { useContext } from "react";
import AuthHomePage from "../components/HomePage.tsx/AuthHomePage";

import { AuthContext } from "../App";
import { UnAuthHomepage } from "../components/HomePage.tsx/UnAuthHomePage";

function HomePage() {
  const { isAuth } = useContext(AuthContext);
  return (
    <div className="text-white">
      {isAuth ? <AuthHomePage /> : <UnAuthHomepage />}
    </div>
  );
}
export default HomePage;
