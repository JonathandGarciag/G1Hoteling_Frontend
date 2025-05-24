import React from "react";

import { useReservacionesUsuario } from "../../shared/hooks/useReservations.jsx";

import '../../style/ReservacionesList.css';

const ReservacionesList = ({ userId }) => {
  const { reservaciones, cargando, error } = useReservacionesUsuario(userId);

  return (
    <div className="reservaciones-container">
      <h2 className="reservaciones-title">Lista de Reservaciones</h2>
      {cargando ? (
        <p className="reservaciones-message">Cargando reservaciones...</p>
      ) : error ? (
        <p className="reservaciones-message">{error}</p>
      ) : reservaciones.length === 0 ? (
        <p className="reservaciones-message">No hay reservaciones registradas.</p>
      ) : (
        <ul className="reservaciones-list">
          {reservaciones.map((reserva) => (
            <li key={reserva._id} className="reservacion-item">
              <p><strong>Cliente:</strong> {reserva.userId}</p>
              <p><strong>Fecha de Entrada:</strong> {new Date(reserva.startDate).toLocaleDateString()}</p>
              <p><strong>Fecha de Salida:</strong> {new Date(reserva.endDate).toLocaleDateString()}</p>
              <p><strong>Habitación:</strong> {reserva.roomId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservacionesList;