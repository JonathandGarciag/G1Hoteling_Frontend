// components/ClientesActuales.jsx
import React, { useEffect, useState } from "react";
import { apiClient } from "../../service/apiClient";

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Usuarios Alojados en el Hotel</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios alojados actualmente.</p>
      ) : (
        <ul className="space-y-3">
          {usuarios.map((usuario) => (
            <li key={usuario._id} className="p-4 border rounded shadow">
              <p><strong>Nombre:</strong> {usuario.nombre}</p>
              <p><strong>Correo:</strong> {usuario.email}</p>
              <p><strong>Habitación:</strong> {usuario.habitacion || 'N/A'}</p>
              <p><strong>Fecha de entrada:</strong> {usuario.fechaEntrada}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientesActuales;