import { useEffect, useState } from "react";
import { getHotels } from "../../service/userService";
import { toast } from "react-toastify";

export const useHotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const hotelsPerPage = 8;

  const fetchHotels = async () => {
    try {
      const data = await getHotels();
      setHotels(data);
    } catch (error) {
      toast.error("Error al cargar hoteles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    const result = hotels.filter(h =>
      h.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, hotels]);

  const totalPages = Math.ceil(filtered.length / hotelsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * hotelsPerPage,
    currentPage * hotelsPerPage
  );

  return {
    hotels: paginated,
    loading,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    totalFiltered: filtered.length,
  };
};
