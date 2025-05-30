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

export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.msg || "Error al solicitar recuperación";
    return { success: false, message };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await apiClient.post(`/auth/reset-password/${token}`, { newPassword });
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.msg || "Error al cambiar la contraseña";
    return { success: false, message };
  }
};
