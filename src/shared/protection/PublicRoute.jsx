import { useAuth } from "../hooks/auth/useAuthContext";
import { useEffect } from "react";

const PublicRoute = ({ children }) => {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      logout();
    }
  }, []);

  return children;
};

export default PublicRoute;
