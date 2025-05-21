import { useCallback } from "react";
import { apiClient } from "../../service/apiClient";

export const useReservaciones = () => {
  
  const agregarReservacion = useCallback(async (reservacionData) => {
    try {
      const response = await apiClient.post("registerReservation", reservacionData);
      return response.data;
    } catch (error) {
      console.error("Error al agregar una Reservación:", error);
      throw error;
    }
  }, []);

  const obtenerReservacion = useCallback(async (reservacionData, id) => {
    try {
      const response = await apiClient.get(`viewReservations/${id}`, { data: reservacionData });
      return response.data;
    } catch (error) {
      console.error("Error al traer las Reservaciones:", error);
      throw error;
    }
  }, []);

  const buscarReservacion = useCallback(async (reservacionData, id) => {
    try {
      const response = await apiClient.get(`viewReservationsByHotel/${id}`, { data: reservacionData });
      return response.data;
    } catch (error) {
      console.error("Error al buscar la Reservación:", error);
      throw error;
    }
  }, []);

  const actualizarReservacion = useCallback(async (reservacionData, id) => {
    try {
      const response = await apiClient.put(`updateReservation/${id}`, reservacionData);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la Reservación:", error);
      throw error;
    }
  }, []);

  const eliminarReservacion = useCallback(async (reservacionData, id) => {
    try {
      const response = await apiClient.delete(`deleteReservation/${id}`, { data: reservacionData });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar la Reservación:", error);
      throw error;
    }
  }, []);

  return {
    agregarReservacion,
    obtenerReservacion,
    buscarReservacion,
    actualizarReservacion,
    eliminarReservacion
  };
};