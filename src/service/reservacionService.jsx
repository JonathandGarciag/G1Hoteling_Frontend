import { apiClient } from "./apiClient";

export const agregarReservacion = async (reservacionData) => {
  try {
    const response = await apiClient.post('/registerReservation', reservacionData);
    return response.data;
  } catch (error) {
    console.error("Error al agregar una Reservación:", error.response?.data?.msg || error.message);
    throw error;
  }
};

export const obtenerReservacion = async (id) => {
  try {
    const response = await apiClient.get(`viewReservations/${id}`);
    return response.data;
    console.log(response.data)
  } catch (error) {
    console.error("Error al traer las Reservaciones:", error);
    throw error;
  }
};

export const buscarReservacionesPorHotel = async (hotelId) => {
  try {
    const response = await apiClient.get(`reservation/viewReservationsByHotel/${hotelId}`);
    return response.data;
  } catch (error) {
    console.error("Error al buscar las reservaciones del hotel:", error.response?.data?.msg || error.message);
    throw error;
  }
};


export const actualizarReservacion = async (reservacionData, id) => {
  try {
    const response = apiClient.put(`updateReservation/${id}`, reservacionData);
    return response.data;
  } catch (error) {
    console.log("Error al Actualizar la Reservacion: ", error);
    throw error;
  }
};

export const eliminarReservacion = async (reservacionData, id) => {
  try {
    const response = apiClient.delete(
      `deleteReservation/${id}`,
      reservacionData
    );
    return response.data;
  } catch (error) {
    console.log("Error al Actualizar la Reservacion: ", error);
    throw error;
  }
};
