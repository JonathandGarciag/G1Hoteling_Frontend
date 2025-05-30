import { useState } from "react";
import { updateUserProfileService } from "../../service/hotelService";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const updateProfile = async (id, profileData) => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await updateUserProfileService(id, profileData);
      setSuccessMsg(response.msg || "Perfil actualizado exitosamente");
      return response.user;
    } catch (err) {
      const message =
        err?.response?.data?.msg ||
        err?.msg ||
        err?.message ||
        "Error al actualizar el perfil";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    loading,
    error,
    successMsg,
  };
};
