import { useEffect, useState } from "react";
import { getUserByIdService } from "../../service/hotelService";

export const useUserById = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const data = await getUserByIdService(id);
        setUser(data);
      } catch (err) {
        setError(err.msg || "Error al obtener usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
};
