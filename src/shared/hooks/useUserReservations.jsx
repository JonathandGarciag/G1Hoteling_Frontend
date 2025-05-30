import { useEffect, useState } from 'react';
import { getUserReservations } from '../../service/hotelService';

export const useUserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const data = await getUserReservations();
      setReservations(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return { reservations, loading };
};
