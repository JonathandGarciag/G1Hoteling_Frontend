import { apiClient } from "./apiClient"

export const getHotels = async () => {
  try {
    const response = await apiClient.get("hotel/viewHotel");
    return { success: true, data: response.data.hotels };
  } catch (error) {
    const message = error.response?.data?.msg || "Error al obtener hoteles";
    return { success: false, message };
  }
};

export const getRoomsByHotel = async (hotelId) => {
  try {
    const response = await apiClient.get(`/room/viewRooms/${hotelId}`);
    return { success: true, data: response.data.rooms };
  } catch (error) {
    const message = error.response?.data?.msg || "Error al obtener habitaciones";
    return { success: false, message };
  }
};

export const createReservation = async (reservationData) => {
  try {
    const response = await apiClient.post('/reservation/registerReservation', reservationData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Error al crear la reservación');
  }
};

export const getUserReservations = async () => {
  try {
    const response = await apiClient.get('/reservation/viewReservations/me'); // "me" para que el backend use req.user
    return response.data.reservations;
  } catch (error) {
    console.error("Error al obtener reservaciones:", error);
    throw new Error("No se pudieron cargar las reservaciones");
  }
};

export const getEventsByHotel = async (hotelId) => {
  const { data } = await apiClient.get(`/eventos/hotel/${hotelId}`);
  return data.eventos;
};

export const getAllEvents = async () => {
  const { data } = await apiClient.get('/evento/allEvents');
  return data.eventos;
};

export const updateUserProfileService = async (id, data) => {
  try {
    const response = await apiClient.put(`/user/updProfile/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    throw error.response?.data || { msg: "Error desconocido" };
  }
};

export const getUserByIdService = async (id) => {
  try {
    const response = await apiClient.get(`/user/myUser/${id}`);
    return response.data.user;
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw error.response?.data || { msg: "Error desconocido" };
  }
};

export const registerEventReservation = async (reservationData) => {
  const response = await apiClient.post("/eventReservation/registerEventReservation", reservationData);
  return response.data;
};

export const deleteUserService = async (password) => {
  try {
    const response = await apiClient.delete("/user/deleteUser", {
      data: { password },
    });
    return { success: true, msg: response.data.msg };
  } catch (error) {
    const msg =
      error.response?.data?.msg || "Error al deshabilitar el usuario";
    throw new Error(msg); // Lanza el error para que lo capture el hook
  }
};
