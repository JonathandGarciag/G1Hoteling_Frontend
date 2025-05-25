import { useState, useEffect } from "react";
import { crearEvento, obtenerEventosPorHotel  } from "../../service/eventosService";

export const useRegistrarEvento = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [eventoRegistrado, setEventoRegistrado] = useState(null);

  const registrar = async (eventoData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const requiredFields = ['hotelId', 'titulo', 'fecha'];
      const missingFields = requiredFields.filter(field => !eventoData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Faltan campos requeridos: ${missingFields.join(', ')}`);
      }

      if (!Array.isArray(eventoData.serviciosIncluidos)) {
        eventoData.serviciosIncluidos = [];
      }

      const datosFormateados = {
        ...eventoData,
        fecha: new Date(eventoData.fecha).toISOString(),
        horarios: eventoData.horarios?.map(horario => ({
          fecha: new Date(horario.fecha).toISOString(),
          horaInicio: horario.horaInicio,
          horaFin: horario.horaFin
        })) || []
      };

      console.log('Datos formateados:', datosFormateados);
      
      const response = await crearEvento(datosFormateados);
      setEventoRegistrado(response);
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Error al registrar el evento';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registrar,
    isLoading,
    error,
    eventoRegistrado,
    reset: () => {
      setError(null);
      setEventoRegistrado(null);
    }
  };
};

export const useEventosPorHotel = (hotelId) => {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchEventos = async () => {
      try {
        if (!hotelId) {
          throw new Error("ID de hotel no proporcionado");
        }

        setCargando(true);
        setError(null);

        const data = await obtenerEventosPorHotel(hotelId);
        
        if (isMounted) {
          setEventos(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error obteniendo eventos:", err);
          setError(err);
          setEventos([]);
        }
      } finally {
        if (isMounted) {
          setCargando(false);
        }
      }
    };

    fetchEventos();

    return () => {
      isMounted = false;
    };
  }, [hotelId]);

  return { eventos, cargando, error };
};