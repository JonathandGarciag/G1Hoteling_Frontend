import { useEffect, useState } from 'react';
import { obtenerReservacion, agregarReservacion  } from '../../service/reservacionService';

export const useAgregarReservacion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const agregar = async (reservacionData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await agregarReservacion(reservacionData);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { agregar, loading, error, data };
};

export const useReservacionesUsuario = (userId) => {
  const [reservaciones, setReservaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarReservaciones = async () => {
      try {
        setCargando(true);
        const data = await obtenerReservacion(userId);
        setReservaciones(data.reservations || []);
      } catch (err) {
        setError(err.message || 'Error al obtener reservaciones');
      } finally {
        setCargando(false);
      }
    };

    if (userId) {
      cargarReservaciones();
    }
  }, [userId]);

  return { reservaciones, cargando, error };
};

