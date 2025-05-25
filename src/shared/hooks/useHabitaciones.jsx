import { useEffect, useState } from "react";
import { obtenerHabitacionesPorHotel, registrarHabitacion } from "../../service/habitacionService";

export const useRegistrarHabitacion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [habitacionRegistrada, setHabitacionRegistrada] = useState(null);

  const registrar = async (habitacionData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!habitacionData.hotelId) {
        throw new Error("El ID del hotel es requerido");
      }

      if (!habitacionData.availability?.length) {
        throw new Error("Debe ingresar al menos un rango de disponibilidad");
      }

      const datosFormateados = {
        hotelId: habitacionData.hotelId,
        roomType: habitacionData.roomType,
        capacity: parseInt(habitacionData.capacity || "1", 10),
        pricePerNight: parseFloat(habitacionData.pricePerNight || "0"),
        status: habitacionData.status,
        amenities: habitacionData.amenities,
        availability: habitacionData.availability.map(avail => ({
          startDate: new Date(avail.startDate).toISOString(),
          endDate: new Date(avail.endDate).toISOString()
        }))
      };

      console.log("Datos formateados para enviar:", datosFormateados);
      
      const response = await registrarHabitacion(datosFormateados);
      setHabitacionRegistrada(response);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Error al registrar la habitación";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registrar,
    isLoading,
    error,
    habitacionRegistrada,
    reset: () => {
      setError(null);
      setHabitacionRegistrada(null);
    }
  };
};

export const useHabitacionesDisponibles = (hotelId) => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hotelId) {
      setHabitaciones([]);
      setCargando(false);
      return;
    }

    const fetchHabitaciones = async () => {
      setCargando(true);
      setError(null);

      try {
        const todasHabitaciones = await obtenerHabitacionesPorHotel(hotelId);
        const disponibles = todasHabitaciones.filter(
          (h) => h.status?.toLowerCase() === "disponible"
        );
        setHabitaciones(disponibles);
      } catch (err) {
        setError(err.message || "Error al obtener habitaciones");
        setHabitaciones([]);
      } finally {
        setCargando(false);
      }
    };

    fetchHabitaciones();
  }, [hotelId]);

  return { habitaciones, cargando, error };
};