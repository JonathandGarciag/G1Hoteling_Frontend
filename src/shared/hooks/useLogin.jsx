import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/authService";
import { useAuth } from "./useAuthContext";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginUser({ email, password });

      if (!response.success) {
        toast.error(response.message || "Error al iniciar sesión");
        return;
      }

      const userDetails = response.data.userDetails;

      if (!userDetails?.token) {
        toast.error("No se recibió token");
        return;
      }

      const hotelId = userDetails.hotel?._id || null;
      const updatedUserDetails = { ...userDetails, hotelId };

      localStorage.setItem("user", JSON.stringify(updatedUserDetails));
      localStorage.setItem("token", userDetails.token);
      setUser(updatedUserDetails);

      toast.success("¡Sesión iniciada!");
      navigate("/");
    } catch (error) {
      toast.error("Error inesperado al iniciar sesión");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};