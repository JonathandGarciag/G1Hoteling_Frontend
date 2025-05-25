import { useEffect, useState } from "react";
import { obtenerHabitacionesPorHotel } from "../../service/habitacionService";

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

        // Filtra solo las habitaciones cuyo status sea "disponible" (case-insensitive)
        const disponibles = todasHabitaciones.filter(
          (h) => h.status && h.status.toLowerCase() === "disponible"
        );

        setHabitaciones(disponibles);
      } catch (err) {
        setError(err);
        setHabitaciones([]);
      } finally {
        setCargando(false);
      }
    };

    fetchHabitaciones();

  }, [hotelId]);

  return { habitaciones, cargando, error };
};