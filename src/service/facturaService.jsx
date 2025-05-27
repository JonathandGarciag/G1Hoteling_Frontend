import { apiClient } from "./apiClient";

export const generateBillService = async ({
  reservationId,
  userId,
  hotelId,
  additionalServices,
}) => {
  try {
    const response = await apiClient.post("factura/generate", {
      reservationId,
      additionalServices,
    });
    return response.data;
  } catch (error) {
    console.error("Error al generar la factura:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};
