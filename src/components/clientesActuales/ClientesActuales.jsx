import React, { useEffect, useState } from "react";

import { apiClient } from "../../service/apiClient";

import "../../style/hotel/ClientesActuales.css";

const ClientesActuales = ({ hotelId }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      setCargando(true);
      try {
        const response = await apiClient.get(`viewUsersByHotel/${hotelId}`);
        setUsuarios(response.data);
      } catch (err) {
        setError("Error al cargar los usuarios alojados.");
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    if (hotelId) {
      obtenerUsuarios();
    }
  }, [hotelId]);

  if (cargando) return <p>Cargando usuarios alojados...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="clientes-container">
      <h2 className="clientes-title">Usuarios Alojados en el Hotel</h2>
      {usuarios.length === 0 ? (
        <p className="clientes-message">
          No hay usuarios alojados actualmente.
        </p>
      ) : (
        <ul className="clientes-list">
          {usuarios.map((usuario) => (
            <li key={usuario._id} className="cliente-item">
              <p>
                <strong>Nombre:</strong> {usuario.nombre}
              </p>
              <p>
                <strong>Correo:</strong> {usuario.email}
              </p>
              <p>
                <strong>Habitación:</strong> {usuario.habitacion || "N/A"}
              </p>
              <p>
                <strong>Fecha de entrada:</strong> {usuario.fechaEntrada}
              </p>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="clientes-error">{error}</p>}
    </div>
  );
};

export default ClientesActuales;
