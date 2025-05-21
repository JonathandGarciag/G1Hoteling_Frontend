import { useCallback } from "react";
import {
  obtenerHabitacionesPorHotel,
  registrarHabitacion,
  actualizarHabitacion,
  eliminarHabitacion,
} from "../../service/habitacionService";

export const useHabitaciones = () => {
  const getHabitaciones = useCallback(async (hotelId) => {
    return await obtenerHabitacionesPorHotel(hotelId);
  }, []);

  const agregarHabitacion = useCallback(async (habitacionData) => {
    return await registrarHabitacion(habitacionData);
  }, []);

  const editarHabitacion = useCallback(async (id, habitacionData) => {
    return await actualizarHabitacion(id, habitacionData);
  }, []);

  const borrarHabitacion = useCallback(async (id) => {
    return await eliminarHabitacion(id);
  }, []);

  return {
    getHabitaciones,
    agregarHabitacion,
    editarHabitacion,
    borrarHabitacion,
  };
};