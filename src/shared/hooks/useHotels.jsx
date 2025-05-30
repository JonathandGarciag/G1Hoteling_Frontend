import { useState, useEffect } from "react";
import { getHotels } from "../../service/hotelService";
import toast from "react-hot-toast";

export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await getHotels();
      if (!response.success) {
        toast.error(response.message || "Error al obtener hoteles");
        return;
      }
      setHotels(response.data);
    } catch (error) {
      toast.error("Error inesperado al obtener hoteles");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return { hotels, loading, refetch: fetchHotels };
};
