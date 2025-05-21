// components/ReservacionesList.jsx
import React, { useEffect, useState } from "react";
import { useReservaciones } from "../../shared/hooks/useReservations";

const ReservacionesList = ({ idHotel }) => {
  const { obtenerReservacion } = useReservaciones();
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarReservaciones = async () => {
      try {
        const data = await obtenerReservacion({}, idHotel);
        setReservaciones(data);
      } catch (err) {
        setError("No se pudieron cargar las reservaciones.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarReservaciones();
  }, [idHotel, obtenerReservacion]);

  if (loading) return <p>Cargando reservaciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Reservaciones</h2>
      {reservaciones.length === 0 ? (
        <p>No hay reservaciones registradas.</p>
      ) : (
        <ul className="space-y-3">
          {reservaciones.map((reserva) => (
            <li key={reserva._id} className="p-4 border rounded shadow">
              <p><strong>Cliente:</strong> {reserva.nombreCliente}</p>
              <p><strong>Fecha de Entrada:</strong> {reserva.fechaEntrada}</p>
              <p><strong>Fecha de Salida:</strong> {reserva.fechaSalida}</p>
              <p><strong>Habitación:</strong> {reserva.habitacion}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservacionesList;
