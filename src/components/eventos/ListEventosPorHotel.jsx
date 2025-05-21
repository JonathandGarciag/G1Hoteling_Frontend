// components/eventos/ListEventosPorHotel.jsx
import React, { useEffect, useState } from "react";
import { useEventos } from "../../shared/hooks/useEvent";
import { useParams } from "react-router-dom";

const ListEventosPorHotel = () => {
  const { hotelId } = useParams();
  const { obtenerEventosPorHotel } = useEventos();
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const data = await obtenerEventosPorHotel(hotelId);
        setEventos(data);
      } catch (err) {
        setError("Error al cargar los eventos.");
      }
    };

    if (hotelId) {
      cargarEventos();
    }
  }, [hotelId, obtenerEventosPorHotel]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Eventos del Hotel</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {eventos.length === 0 ? (
        <p>No hay eventos registrados.</p>
      ) : (
        <ul className="space-y-4">
          {eventos.map((evento) => (
            <li
              key={evento._id}
              className="border p-4 rounded shadow bg-white"
            >
              <h3 className="text-xl font-semibold">{evento.nombre}</h3>
              <p><strong>Descripción:</strong> {evento.descripcion}</p>
              <p><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleString()}</p>
              <p><strong>Lugar:</strong> {evento.lugar}</p>
              {evento.cancelado && (
                <p className="text-red-600 font-semibold">Evento Cancelado</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListEventosPorHotel;
