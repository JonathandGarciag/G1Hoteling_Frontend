import { useCallback } from "react";
import { apiClient } from "../../service/apiClient";

export const useEventos = () => {
  // Crear un evento
  const crearEvento = useCallback(async (eventoData) => {
    try {
      const response = await apiClient.post("/", eventoData);
      return response.data;
    } catch (error) {
      console.error("Error al crear el evento:", error);
      throw error;
    }
  }, []);

  // Editar un evento por ID
  const editarEvento = useCallback(async (eventoData, id) => {
    try {
      const response = await apiClient.put(`/${id}`, eventoData);
      return response.data;
    } catch (error) {
      console.error("Error al editar el evento:", error);
      throw error;
    }
  }, []);

  // Cancelar un evento por ID
  const cancelarEvento = useCallback(async (id) => {
    try {
      const response = await apiClient.patch(`/cancelar/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al cancelar el evento:", error);
      throw error;
    }
  }, []);

  // Obtener todos los eventos de un hotel
  const obtenerEventosPorHotel = useCallback(async (hotelId) => {
    try {
      const response = await apiClient.get(`/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener eventos por hotel:", error);
      throw error;
    }
  }, []);

  return {
    crearEvento,
    editarEvento,
    cancelarEvento,
    obtenerEventosPorHotel,
  };
};
