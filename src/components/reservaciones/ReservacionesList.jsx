import React, { useState, useEffect } from "react";
import { useReservacionesPorHotel } from "../../shared/hooks/role_hotel/useReservations";

import '../../style/hotel/ReservacionesList.css';

const ReservacionesHotelList = () => {
  const [hotelId, setHotelId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user?.hotelId || user?.hotel?._id;
    setHotelId(id);
    console.log('🏨 hotelId obtenido desde localStorage:', id);
  }, []);

  const { reservaciones = [], cargando, error } = useReservacionesPorHotel(hotelId);

  if (cargando) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Cargando reservaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!reservaciones.length) {
    return (
      <div className="empty-state">
        <p>No hay reservaciones para este hotel.</p>
      </div>
    );
  }

  return (
    <div className="eventos-registrados-container">
      <h1 className="titulo">Lista de Reservaciones</h1>
      <div className="reservaciones-list">
        {reservaciones.map((res) => (
          <div key={res._id} className="reservacion-item">
            <h2>Cliente: {res.userId?.name || "Sin nombre"}</h2>
            <p><strong>ID Reservación:</strong> {res._id}</p>
            <p><strong>Habitación:</strong> {res.roomId?.roomType || "N/A"}</p>
            <p className="fecha">
              <strong>Desde:</strong> {new Date(res.startDate).toLocaleDateString()}<br />
              <strong>Hasta:</strong> {new Date(res.endDate).toLocaleDateString()}
            </p>
            <p><strong>Precio total:</strong> ${res.totalPrice?.toFixed(2) || "0.00"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservacionesHotelList;