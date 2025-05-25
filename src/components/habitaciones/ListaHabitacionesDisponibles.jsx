import React from "react";
import { useHabitacionesDisponibles } from "../../shared/hooks/useHabitaciones";
import "../../style/ListaHabitacionesDisponibles.css";

const ListaHabitacionesDisponibles = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const hotelId = user?.hotelId;

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
            <li key={habitacion._id} className="list-item">
              <div>
                <span className="label">Tipo:</span> {habitacion.roomType}
              </div>
              <div>
                <span className="label">Capacidad:</span> {habitacion.capacity}
              </div>
              <div>
                <span className="label">Estado:</span> {habitacion.status}
              </div>
              <div>
                <span className="label">Servicios:</span>{" "}
                <span className="amenities">{habitacion.amenities?.join(", ")}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaHabitacionesDisponibles;
