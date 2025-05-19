import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../service/authService";
import toast from "react-hot-toast";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async ({ name, username, email, password }) => {
    setLoading(true);
    try {
      const response = await registerUser({ name, username, email, password });

      if (!response.success) {
        toast.error(response.message || "Error al registrarse");
        return;
      }

      toast.success("¡Usuario registrado correctamente!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error("Error inesperado al registrarse");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};
