// components/EventoForm.jsx
import React, { useState } from "react";
import { useEventos } from "../../shared/hooks/useEvent";

const EventoForm = ({ hotelId }) => {
  const { crearEvento } = useEventos();

  const [eventoData, setEventoData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    lugar: "",
    hotelId: hotelId || "", // Se espera que hotelId venga como prop
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEventoData({
      ...eventoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    try {
      await crearEvento(eventoData);
      setMensaje("Evento creado exitosamente.");
      setEventoData({
        nombre: "",
        descripcion: "",
        fecha: "",
        lugar: "",
        hotelId,
      });
    } catch (err) {
      setError("Hubo un error al crear el evento.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Crear Evento</h2>
      {mensaje && <p className="text-green-600 mb-2">{mensaje}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre del Evento</label>
          <input
            type="text"
            name="nombre"
            value={eventoData.nombre}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Descripción</label>
          <textarea
            name="descripcion"
            value={eventoData.descripcion}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={eventoData.fecha}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Lugar</label>
          <input
            type="text"
            name="lugar"
            value={eventoData.lugar}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Evento
        </button>
      </form>
    </div>
  );
};

export default EventoForm;