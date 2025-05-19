import { useEffect, useState } from "react";
import { getAllUsers, cambiarRolUsuario } from "../../service/userService";
import { toast } from "react-toastify";

export const useUserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      const clientUsers = data.filter((user) => user.role === "CLIENT_ROLE");
      setUsers(clientUsers);
    } catch (error) {
      toast.error("Error al cargar usuarios");
    }
  };

  const handleRolChange = async (id, role) => {
    const newRole = role === "CLIENT_ROLE" ? "HOTEL_ROLE" : "CLIENT_ROLE";
    try {
      await cambiarRolUsuario(id, newRole);
      toast.success("Rol actualizado");
      fetchUsers();
    } catch (error) {
      toast.error("Error al cambiar rol");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, handleRolChange };
};
