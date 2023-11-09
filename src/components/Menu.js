import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, signout, userInfo } from "../utils/auth";

const isActive = (thisPath, givenPath) => {
  if (thisPath === givenPath) {
    return { color: "#ff9900" };
  } else {
    return { color: "grey" };
  }
};

const Menu = (props) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-dark bg-dark">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={isActive(pathname, "/")}>
            Home
          </Link>
        </li>
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/login"
                style={isActive(pathname, "/login")}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/register"
                style={isActive(pathname, "/register")}
              >
                Register
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && 
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/cart`}
                style={isActive(pathname, `/cart`)}
              >
              Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/${userInfo().role}/dashboard`}
                style={isActive(pathname, `/${userInfo().role}/dashboard`)}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ color: "grey", cursor: "pointer" }}
                onClick={() => {
                  signout(() => {
                    navigate("/register", { replace: true });
                  });
                }}
              >
                Logout
              </span>
            </li>
          </>
        }
      </ul>
    </nav>
  );
};

export default Menu;
