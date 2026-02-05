import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Not logged in → go to Login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in → allow access
  return children;
};

export default ProtectedRoute;
