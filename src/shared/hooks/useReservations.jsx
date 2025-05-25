import { useEffect, useState } from 'react';
import { buscarReservacionesPorHotel } from '../../service/reservacionService';

export const useReservacionesPorHotel = (hotelId) => {
  const [reservaciones, setReservaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarReservaciones = async () => {
      try {
        setCargando(true);
        const data = await buscarReservacionesPorHotel(hotelId);
        setReservaciones(data.reservations || []);
      } catch (err) {
        setError(err.message || 'Error al obtener reservaciones');
      } finally {
        setCargando(false);
      }
    };

    if (hotelId) {
      cargarReservaciones();
    } else {
      console.warn("hotelId no proporcionado");
    }
  }, [hotelId]);

  return { reservaciones, cargando, error };
};