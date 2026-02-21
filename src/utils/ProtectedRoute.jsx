import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { globalVar } from "../globalContext/GlobalContext";

const ProtectedRoute = ({ children, allowedRoles }) => {

  const { user } = useContext(globalVar);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;