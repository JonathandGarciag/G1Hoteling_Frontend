import { useEffect, useState } from 'react';
import { buscarReservacionesPorHotel } from '../../../service/reservacionService';

export const useReservacionesPorHotel = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const hotelId = JSON.parse(localStorage.getItem('user'))?.hotelId || JSON.parse(localStorage.getItem('user'))?.hotel?._id;

  useEffect(() => {
    const cargarReservaciones = async () => {
      try {
        if (!hotelId) {
          console.warn('⚠️ hotelId no encontrado en localStorage');
          return;
        }

        console.log('⏳ Buscando reservaciones para hotelId:', hotelId);
        const data = await buscarReservacionesPorHotel(hotelId);
        console.log('✅ Reservaciones recibidas del servicio:', data);
        setReservaciones(data.reservations || []);
      } catch (err) {
        console.error('❌ Error al obtener reservaciones:', err);
        setError(err.message || 'Error al obtener reservaciones');
      } finally {
        setCargando(false);
      }
    };

    cargarReservaciones();
  }, [hotelId]);

  return { reservaciones, cargando, error };
};
