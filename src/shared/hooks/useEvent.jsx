import { useState } from "react";
import { crearEvento } from "../../service/eventosService";

export const useRegistrarEvento = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [eventoRegistrado, setEventoRegistrado] = useState(null);

  const registrar = async (eventoData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validación de campos requeridos
      const requiredFields = ['hotelId', 'titulo', 'fecha'];
      const missingFields = requiredFields.filter(field => !eventoData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Faltan campos requeridos: ${missingFields.join(', ')}`);
      }

      // Asegurar que serviciosIncluidos es un array
      if (!Array.isArray(eventoData.serviciosIncluidos)) {
        eventoData.serviciosIncluidos = [];
      }

      // Formatear fechas correctamente
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
      throw err; // Re-lanzamos el error para manejo adicional
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