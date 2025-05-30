import { useState } from 'react';
import { generateBillService } from '../../../service/facturaService';

export const useGenerateBill = () => {
  const [loading, setLoading] = useState(false);
  const [bill, setBill] = useState(null);
  const [error, setError] = useState(null);

  const generateBill = async ({ reservationId, additionalServices = [] }) => {
  setLoading(true);
  setError(null);

  try {
    const response = await generateBillService({ 
      reservationId,
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