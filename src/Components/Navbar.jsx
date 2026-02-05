import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-left"
        onClick={() => navigate("/")}
      >
        🎬 <span className="brand">MovieNest</span>
      </div>

      <div className="navbar-right">
        {user?.role === "user" && (
          <button
            className="nav-btn"
            onClick={() => navigate("/fav")}
          >
            ❤️ 
          </button>
        )}

        {!user && (
          <>
            <button
              className="nav-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="nav-btn outline"
              onClick={() => navigate("/register")}
            >
              Signup
            </button>
          </>
        )}

        {user && (
          <>
            {user.role === "admin" && (
              <span
                className="trash-icon"
                title="Trash"
                onClick={() => navigate("/trash")}
              >
                🗑️
              </span>
            )}

            <div className="profile">
              <span className="avatar">
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </span>

              <div className="profile-info">
                <span className="username">
                  {user?.username || "User"}
                </span>
                <span className="role">
                  {user?.role || ""}
                </span>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
