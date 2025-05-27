import { useState } from 'react';
import { generateBillService } from '../../service/facturaService';

export const useGenerateBill = () => {
  const [loading, setLoading] = useState(false);
  const [bill, setBill] = useState(null);
  const [error, setError] = useState(null);

  const generateBill = async ({ reservationId, userId, additionalServices = [] }) => {
    setLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const hotelId = user?.hotelId || user?.hotel?._id;
      
      if (!hotelId) {
        throw new Error('No se encontró el ID del hotel en el almacenamiento local');
      }

      const response = await generateBillService({ 
        reservationId, 
        userId,
        hotelId,
        additionalServices 
      });
      
      setBill(response.factura);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Ocurrió un error al generar la factura');
      console.error('Error generando factura:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateBill,
    loading,
    bill,
    error
  };
};