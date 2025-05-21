import { apiClient } from "./apiClient";

export const crearEvento = async (eventoData) => {
  try {
    const response = await apiClient.post("/", eventoData);
    return response.data;
  } catch (error) {
    console.log("Error al crear el evento:", error);
    throw error;
  }
};

export const editarEvento = async (eventoData, id) => {
  try {
    const response = await apiClient.put(`/${id}`, eventoData);
    return response.data;
  } catch (error) {
    console.log("Error al editar el evento:", error);
    throw error;
  }
};

export const cancelarEvento = async (id) => {
  try {
    const response = await apiClient.patch(`/cancelar/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error al cancelar el evento:", error);
    throw error;
  }
};

export const obtenerEventosPorHotel = async (hotelId) => {
  try {
    const response = await apiClient.get(`/hotel/${hotelId}`);
    return response.data;
  } catch (error) {
    console.log("Error al obtener eventos por hotel:", error);
    throw error;
  }
};
