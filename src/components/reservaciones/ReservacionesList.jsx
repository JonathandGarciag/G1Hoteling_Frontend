import React from "react";
import { useReservacionesPorHotel } from "../../shared/hooks/useReservations";
import { useUserDetails } from "../../shared/hooks/useUserDetails";
import "../../style/ReservacionesList.css";

const ReservacionesHotelList = () => {
  const { hotelId } = useUserDetails();

  const { reservaciones, cargando, error } = useReservacionesPorHotel(hotelId);

  return (
    <div className="reservaciones-container">
      <h2 className="reservaciones-title">Reservaciones del Hotel</h2>
      {cargando ? (
        <p className="reservaciones-message">Cargando reservaciones...</p>
      ) : error ? (
        <p className="reservaciones-message">
          {typeof error === "string"
            ? error
            : error?.message || "Error desconocido"}
        </p>
      ) : reservaciones.length === 0 ? (
        <p className="reservaciones-message">
          No hay reservaciones para este hotel.
        </p>
      ) : (
        <ul className="reservaciones-list">
  {reservaciones.map((reserva) => (
    <li key={reserva._id} className="reservacion-item">
      <p><strong>Cliente:</strong> {reserva.userId?.name ?? "Desconocido"}</p>
      <p><strong>Fecha de Entrada:</strong> {new Date(reserva.startDate).toLocaleDateString()}</p>
      <p><strong>Fecha de Salida:</strong> {new Date(reserva.endDate).toLocaleDateString()}</p>
      <p><strong>Tipo de habitación:</strong> {reserva.roomId?.roomType ?? "Desconocido"}</p>
    </li>
  ))}
</ul>
      )}
    </div>
  );
};

export default ReservacionesHotelList;
