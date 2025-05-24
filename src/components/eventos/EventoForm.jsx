import React, { useState } from "react";

import { useEventos } from "../../shared/hooks/useEvent";

import '../../style/EventoForm.css'

const EventoForm = ({ hotelId }) => {
  const { crearEvento } = useEventos();

  const [eventoData, setEventoData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    lugar: "",
    hotelId: hotelId || "",
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
    <div className="evento-form-container">
      <h2 className="evento-form-title">Crear Evento</h2>
      {mensaje && <p className="evento-form-message success">{mensaje}</p>}
      {error && <p className="evento-form-message error">{error}</p>}
      <form onSubmit={handleSubmit} className="evento-form">
        <div>
          <label className="evento-form-label">Nombre del Evento</label>
          <input
            type="text"
            name="nombre"
            value={eventoData.nombre}
            onChange={handleChange}
            required
            className="evento-form-input"
          />
        </div>
        <div>
          <label className="evento-form-label">Descripción</label>
          <textarea
            name="descripcion"
            value={eventoData.descripcion}
            onChange={handleChange}
            required
            className="evento-form-textarea"
            rows="4"
          />
        </div>
        <div>
          <label className="evento-form-label">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={eventoData.fecha}
            onChange={handleChange}
            required
            className="evento-form-input"
          />
        </div>
        <div>
          <label className="evento-form-label">Lugar</label>
          <input
            type="text"
            name="lugar"
            value={eventoData.lugar}
            onChange={handleChange}
            required
            className="evento-form-input"
          />
        </div>

        <button type="submit" className="evento-form-button">
          Crear Evento
        </button>
      </form>
    </div>
  );
};

export default EventoForm;