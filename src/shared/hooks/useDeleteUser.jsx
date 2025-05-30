// hooks/useDeleteUser.js
import { useState } from "react";
import { deleteUserService } from "../../service/hotelService";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const deleteUser = async (password) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const result = await deleteUserService(password);
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
