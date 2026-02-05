import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" />;

  return user.role === "admin"
    ? children
    : <Navigate to="/watchlist" />;
};

export default AdminRoute;
