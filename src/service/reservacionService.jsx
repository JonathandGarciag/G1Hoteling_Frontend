import { apiClient } from "./apiClient";

export const agregarReservacion = async(reservacionData) => {
    try {
        const response = await apiClient.post("registerReservation", reservacionData)
        return response.data
    } catch (error) {
        console.log('Error al agregar una Reservacion: ', error);
        throw error
    }
}

export const obtenerReservacion = async(reservacionData, id) => {
    try {
        const response = apiClient.get(`viewReservations/${id}`, reservacionData);
        return response.data
    } catch (error) {
        console.log('Error al Traer las Reservaciones: ', error);
        throw error
    }
}

export const buscarReservacion = async (reservacionData, id) => {
    try {
        const response = await apiClient.get(`viewReservationsByHotel/${id}`, reservacionData);
        return response.data
    } catch (error) {
        console.log('Error al Buscar la Reservacion: ', error);
        throw error
    }
}

export const actualizarReservacion = async (reservacionData, id) => {
    try {
        const response = apiClient.put(`updateReservation/${id}`, reservacionData);
        return response.data
    } catch (error) {
        console.log('Error al Actualizar la Reservacion: ', error)
        throw error
    }
}

export const eliminarReservacion = async (reservacionData, id) => {
    try {
        const response = apiClient.delete(`deleteReservation/${id}`, reservacionData);
        return response.data
    } catch (error) {
        console.log('Error al Actualizar la Reservacion: ', error)
        throw error
    }
}