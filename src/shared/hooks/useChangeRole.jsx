import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById, updateUserRole } from "../../service/userService";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export function useChangeRole() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await getUserById(id);
      setUser(response.user);
    } catch (err) {
      toast.error("Error al obtener el usuario", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await updateUserRole(id, "HOTEL_ROLE");

    if (data?.msg?.includes("éxito")) {
      setShowConfirmation(true);
      toast.success("Rol actualizado a HOTEL_ROLE", {
        position: "top-center",
        icon: false,
        closeButton: false,
        hideProgressBar: false,
        style: {
          background: "#ffffff",
          color: "#333",
          fontWeight: "500",
          fontSize: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
          borderRadius: "8px",
          padding: "12px 16px"
        }
      });
      setTimeout(() => navigate("/users"), 2600);
    } else {
      throw new Error(data?.msg || "Error desconocido");
    }
  } catch (error) {
    const msg =
      error?.response?.data?.msg || error?.message || "Error desconocido al actualizar el rol";

    toast.error(`${msg}`, {
      position: "top-center"
    });
  }
};


  useEffect(() => {
    fetchUser();
  }, [id]);

  return {
    user,
    loading,
    handleSubmit,
    showConfirmation
  };
}
