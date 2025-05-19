import {apiClient} from "./apiClient"; 

export const getAllUsers = async () => {
  const response = await apiClient.get("user/viewUser");
  return response.data.users;
};

export const cambiarRolUsuario = async (userId, nuevoRol) => {
  const response = await apiClient.put(`/user/${userId}/role`, { newRole: nuevoRol });
  return response.data;
};
