import { useState } from "react";
import "../../style/EventForm.css";

export default function EventForm({ onSubmit, initialData = {}, hotelId }) {
  const [titulo, setTitulo] = useState(initialData.titulo || "");
  const [descripcion, setDescripcion] = useState(initialData.descripcion || "");
  const [fecha, setFecha] = useState(initialData.fecha ? initialData.fecha.slice(0, 10) : "");
  const [servicios, setServicios] = useState(initialData.serviciosIncluidos || []);
  const [nuevoServicio, setNuevoServicio] = useState("");
  const [estado, setEstado] = useState(initialData.estado || "programado");

  const handleAgregarServicio = () => {
    if (nuevoServicio.trim()) {
      setServicios([...servicios, nuevoServicio.trim()]);
      setNuevoServicio("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fecha || !titulo) return alert("Título y fecha son obligatorios.");

    const data = {
      hotelId,
      titulo,
      descripcion,
      fecha: new Date(fecha),
      serviciosIncluidos: servicios,
      estado,
    };

    onSubmit(data);
  };

  return (
    <div className="event-form-container">
      <h2>{initialData._id ? "Editar Evento" : "Crear Evento"}</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="titulo">Título *</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha *</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Servicios Incluidos</label>
          <div className="servicios-input">
            <input
              type="text"
              placeholder="Agregar servicio"
              value={nuevoServicio}
              onChange={(e) => setNuevoServicio(e.target.value)}
            />
            <button type="button" onClick={handleAgregarServicio}>Agregar</button>
          </div>
          <ul className="servicios-lista">
            {servicios.map((servicio, idx) => (
              <li key={idx}>{servicio}</li>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="programado">Programado</option>
            <option value="cancelado">Cancelado</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          {initialData._id ? "Actualizar Evento" : "Crear Evento"}
        </button>
      </form>
    </div>
  );
}