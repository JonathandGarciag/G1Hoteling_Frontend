import {apiClient} from "./apiClient"; 

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.msg || "Error al iniciar sesión";
    return { success: false, message };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.msg || "Error al registrar usuario";
    return { success: false, message };
  }
};
