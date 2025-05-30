import { useAuth } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { user, loadingUser } = useAuth();

  if (loadingUser) return <div className="centered">Cargando sesión...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="unauthorized center">
        No estás autorizado para ver esto
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
