import React from "react";

import { useReservacionesPorHotel } from "../../shared/hooks/useReservations";
import { useUserDetails } from "../../shared/hooks/useUserDetails";

import '../../style/ReservacionesList.css'

const ReservacionesHotelList = () => {
  const { hotelId } = useUserDetails();
  const { reservaciones, cargando, error } = useReservacionesPorHotel(hotelId);

  return (
    <div className="eventos-registrados-container">
      <h1 className="titulo">Reservaciones del Hotel</h1>

      {cargando ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando reservaciones...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{typeof error === "string" ? error : error?.message || "Error desconocido"}</p>
        </div>
      ) : reservaciones.length === 0 ? (
        <div className="empty-state">
          <p>No hay reservaciones para este hotel.</p>
        </div>
      ) : (
        <div className="reservaciones-list">
          {reservaciones.map((reserva) => (
            <div key={reserva._id} className="reservacion-item">
              <h2>{reserva.userId?.name ?? "Cliente Desconocido"}</h2>
              <p className="fecha"><strong>Fecha de Entrada:</strong> {new Date(reserva.startDate).toLocaleDateString()}</p>
              <p className="fecha"><strong>Fecha de Salida:</strong> {new Date(reserva.endDate).toLocaleDateString()}</p>
              <div className="servicios-incluidos">
                <p><strong>Tipo de habitación:</strong> {reserva.roomId?.roomType ?? "Desconocido"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservacionesHotelList;