import { useState, useEffect } from 'react';
import { getHotels, getRoomsByHotel, createReservation } from '../../service/hotelService';
import toast from 'react-hot-toast';

export const useReservations = () => {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obtener hoteles al montar el componente
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotels();
        if (!response.success) {
          toast.error(response.message || "Error al obtener hoteles");
          return;
        }
        setHotels(response.data); // ✅ extrae el array
      } catch (error) {
        toast.error("Error al obtener hoteles");
        console.error(error);
      }
    };
    fetchHotels();
  }, []);

  // Obtener habitaciones por hotel
  const fetchRoomsByHotel = async (hotelId) => {
    try {
      const response = await getRoomsByHotel(hotelId);
      if (!response.success) {
        toast.error(response.message || "Error al obtener habitaciones");
        return;
      }
      setRooms(response.data); // ✅ extrae el array
    } catch (error) {
      toast.error("Error al obtener habitaciones");
      console.error(error);
    }
  };

  // Limpiar habitaciones
  const clearRooms = () => {
    setRooms([]);
  };

  // Crear reservación
  const handleCreateReservation = async (reservationData) => {
    setLoading(true);
    try {
      const result = await createReservation(reservationData);
      if (!result.success) {
        toast.error(result.message || "Error al crear la reservación");
        return null;
      }
      toast.success("Reservación creada exitosamente");
      return result.data;
    } catch (error) {
      toast.error("Error inesperado al crear la reservación");
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    hotels,
    rooms,
    fetchRoomsByHotel,
    handleCreateReservation,
    loading,
    clearRooms,
  };
};
