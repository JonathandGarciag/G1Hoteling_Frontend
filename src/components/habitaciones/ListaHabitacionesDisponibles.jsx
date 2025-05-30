import React from "react";
import { useHabitacionesDisponibles } from "../../shared/hooks/role_hotel/useHabitaciones";
import "../../style/hotel/ListaHabitacionesDisponibles.css";

const ListaHabitacionesDisponibles = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const hotelId = user?.hotelId || user?.hotel?._id;

  const { habitaciones, cargando, error } = useHabitacionesDisponibles(hotelId);

  if (cargando) return <p className="no-data">Cargando habitaciones...</p>;
  if (error) return <p className="no-data">Error al cargar habitaciones: {error.message}</p>;

  return (
    <div className="container">
      <h2 className="title">Habitaciones Disponibles</h2>
      {habitaciones.length === 0 ? (
        <p className="no-data">No hay habitaciones disponibles</p>
      ) : (
        <ul className="list">
          {habitaciones.map((habitacion) => (
            <li key={habitacion._id} className="list-item-horizontal">
              <div className="info-column">
                <div><span className="label">Tipo:</span> {habitacion.roomType}</div>
                <div><span className="label">Capacidad:</span> {habitacion.capacity}</div>
                <div><span className="label">Estado:</span> {habitacion.status}</div>
                <div><span className="label">Precio:</span> Q {habitacion.pricePerNight}</div>
                <div>
                  <span className="label">Servicios:</span>
                  <span className="amenities">{habitacion.amenities?.join(", ")}</span>
                </div>
              </div>
              {habitacion.image && (
                <div className="image-column">
                  <img
                    src={habitacion.image}
                    alt={`Imagen de la habitación tipo ${habitacion.roomType}`}
                    className="room-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/fallback-room.png"; // imagen fallback opcional
                    }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaHabitacionesDisponibles;