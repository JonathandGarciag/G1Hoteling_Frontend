import { useEffect, useState } from "react";
import { getEventsByHotel } from "../../service/hotelService";

export const useHotelEvents = (hotelId) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const result = await getEventsByHotel(hotelId);
        setEvents(result);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) loadEvents();
  }, [hotelId]);

  return { events, loading };
};
