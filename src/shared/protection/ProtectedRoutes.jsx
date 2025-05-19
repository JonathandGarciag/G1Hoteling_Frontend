import { useAuth } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <h1>Acceso denegado</h1>;

  return children;
};

export default ProtectedRoute;
