import React, { useState } from "react";
import { useRegistrarEvento } from "../../shared/hooks/role_hotel/useEvent";
import "../../style/hotel/EventForm.css";

const EventForm = ({ hotelId: propHotelId }) => {
  const { registrar, isLoading, error, reset } = useRegistrarEvento();
  const user = JSON.parse(localStorage.getItem("user"));
  const hotelId = propHotelId || user?.hotelId || user?.hotel?._id;

  const initialFormData = {
    hotelId: hotelId || "",
    titulo: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    capacidad: "",
    recursosAdicionales: [],
    newRecurso: "",
    precio: "",
    image: ""
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    if (e.target.name === "newRecurso" && formData.newRecurso.trim()) {
      addRecurso();
    }
  };

  const addRecurso = () => {
    if (formData.newRecurso.trim()) {
      setFormData((prev) => ({
        ...prev,
        recursosAdicionales: [...prev.recursosAdicionales, prev.newRecurso.trim()],
        newRecurso: ""
      }));
    }
  };

  const removeRecurso = (index) => {
    setFormData((prev) => ({
      ...prev,
      recursosAdicionales: prev.recursosAdicionales.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titulo || !formData.descripcion || !formData.fechaInicio || !formData.fechaFin) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    try {
      const payload = {
        hotelId: formData.hotelId,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fechaInicio: new Date(formData.fechaInicio).toISOString(),
        fechaFin: new Date(formData.fechaFin).toISOString(),
        capacidad: Number(formData.capacidad),
        recursosAdicionales: formData.recursosAdicionales,
        precio: Number(formData.precio),
        image: formData.image
      };

      await registrar(payload);
      alert("Evento registrado exitosamente!");
      setFormData(initialFormData);
    } catch (err) {
      console.error("Error al registrar el evento:", err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="event-form-container">
      <h2>Registrar Evento</h2>
      {error && (
        <div className="error-message">
          {error}
          <button onClick={reset} className="close-error">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label>Título del Evento:</label>
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Fecha de Inicio:</label>
          <input type="datetime-local" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Fecha de Fin:</label>
          <input type="datetime-local" name="fechaFin" value={formData.fechaFin} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Capacidad:</label>
          <input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} required min={1} />
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} required min={0} />
        </div>

        <div className="form-group">
          <label>Recursos Adicionales:</label>
          <input
            type="text"
            name="newRecurso"
            value={formData.newRecurso}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej: Proyector, WiFi"
          />
          <ul className="servicios-lista">
            {formData.recursosAdicionales.map((item, index) => (
              <li key={index}>
                {item} <button type="button" onClick={() => removeRecurso(index)}>×</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <label>URL de la Imagen:</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/imagen.jpg"
            required
          />
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrar Evento"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;