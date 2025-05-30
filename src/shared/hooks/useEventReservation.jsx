// src/shared/hooks/useEventReservation.js
import { useState } from "react";
import { registerEventReservation } from "../../service/hotelService";

export const useEventReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const createReservation = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await registerEventReservation(data);
      if (res.success) {
        setSuccessMsg("¡Reservación creada exitosamente!");
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMsg(null);
  };

  return {
    createReservation,
    loading,
    error,
    successMsg,
    clearMessages,
  };
};
