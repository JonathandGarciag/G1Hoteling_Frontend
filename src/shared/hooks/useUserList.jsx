import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "../../service/userService";
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users };
};
