// services/habitacionesService.js
import { apiClient } from "./apiClient";

// Obtener habitaciones por hotel
export const obtenerHabitacionesPorHotel = async (hotelId) => {
  try {
    const response = await apiClient.get(`/viewRooms/${hotelId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las habitaciones:", error);
    throw error;
  }
};

// Crear una habitación
export const registrarHabitacion = async (habitacionData) => {
  try {
    const response = await apiClient.post("/registerRoom", habitacionData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar la habitación:", error);
    throw error;
  }
};

// Actualizar una habitación
export const actualizarHabitacion = async (id, habitacionData) => {
  try {
    const response = await apiClient.put(`/updateRoom/${id}`, habitacionData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la habitación:", error);
    throw error;
  }
};

// Eliminar una habitación
export const eliminarHabitacion = async (id) => {
  try {
    const response = await apiClient.delete(`/deleteRoom/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la habitación:", error);
    throw error;
  }
};