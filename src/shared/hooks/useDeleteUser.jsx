// hooks/useDeleteUser.js
import { useState } from "react";
import { deleteUserService } from "../../service/hotelService";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Recibe userId como argumento
  const deleteUser = async (userId, password) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const result = await deleteUserService(userId, password);
      setSuccessMessage(result.msg);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUser,
    loading,
    error,
    successMessage,
  };
};
