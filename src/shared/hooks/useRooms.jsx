import { useEffect, useState } from 'react';
import { getRoomsByHotel } from '../../service/hotelService.jsx';

export const useRooms = (hotelId) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hotelId) {
      setRooms([]);
      setLoading(false);
      return;
    }

    const fetchRooms = async () => {
      try {
        const response = await getRoomsByHotel(hotelId);
        console.log('Rooms data from API:', response);
        if (response.success) {
          setRooms(response.data);  // <- Aquí usamos response.data que es el array
        } else {
          setRooms([]);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  return { rooms, loading };
};
