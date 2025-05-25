import React, { useState } from "react";
import { useRegistrarEvento } from "../../shared/hooks/useEvent";
import "../../style/EventForm.css";

const EventForm = ({ hotelId: propHotelId }) => {
  const { registrar, isLoading, error, reset } = useRegistrarEvento();

  const user = JSON.parse(localStorage.getItem("user"));
  const hotelId = propHotelId || user?.hotelId || user?.hotel?._id;

  const initialFormData = {
    hotelId: hotelId || "",
    titulo: "",
    descripcion: "",
    fecha: "",
    serviciosIncluidos: [],
    services: [],
    newService: "",
    newSchedule: {
      date: "",
      startTime: "",
      endTime: "",
    },
    schedule: [],
    estado: "programado",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      newSchedule: { ...prev.newSchedule, [name]: value },
    }));
  };

  const addService = () => {
    if (formData.newService.trim()) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, prev.newService.trim()],
        newService: "",
      }));
    }
  };

  const removeService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const addSchedule = () => {
    const { date, startTime, endTime } = formData.newSchedule;
    if (date && startTime && endTime) {
      const fechaCompleta = new Date(`${date}T${startTime}`);
      setFormData((prev) => ({
        ...prev,
        fecha: fechaCompleta.toISOString(),
        newSchedule: { date: "", startTime: "", endTime: "" },
        schedule: [...prev.schedule, { date, startTime, endTime }],
      }));
    }
  };

  const removeSchedule = (index) => {
    setFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.schedule.length) {
      alert("Por favor, agrega al menos un horario al evento.");
      return;
    }

    try {
      const payload = {
        hotelId: formData.hotelId,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fecha: formData.fecha,
        serviciosIncluidos: formData.services,
        estado: formData.estado,
        horarios: formData.schedule.map((item) => ({
          fecha: item.date,
          horaInicio: item.startTime,
          horaFin: item.endTime,
        })),
      };

      if (!Array.isArray(payload.serviciosIncluidos)) {
        payload.serviciosIncluidos = [];
      }

      await registrar(payload);
      setFormData(initialFormData);
      alert("Evento registrado exitosamente!");
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
          <button onClick={reset} className="close-error">
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label>Título del Evento:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="descripcion"
            required
          />
        </div>

        <div className="form-group">
          <label>Estado:</label>
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="programado">Programado</option>
            <option value="cancelado">Cancelado</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        <div className="form-group">
          <label>Servicios:</label>
          <div className="servicios-input">
            <input
              type="text"
              value={formData.newService}
              onChange={(e) =>
                setFormData({ ...formData, newService: e.target.value })
              }
              placeholder="Ej: Catering, Sonido"
            />
            <button type="button" onClick={addService}>
              +
            </button>
          </div>
          <ul className="servicios-lista">
            {formData.services.map((s, i) => (
              <li key={i}>
                {s}{" "}
                <button type="button" onClick={() => removeService(i)}>
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <label>Fecha y Horario:</label>
          <div className="servicios-input">
            <input
              type="date"
              name="date"
              value={formData.newSchedule.date}
              onChange={handleScheduleChange}
            />
            <input
              type="time"
              name="startTime"
              value={formData.newSchedule.startTime}
              onChange={handleScheduleChange}
            />
            <input
              type="time"
              name="endTime"
              value={formData.newSchedule.endTime}
              onChange={handleScheduleChange}
            />
            <button type="button" onClick={addSchedule}>
              +
            </button>
          </div>
          <ul className="servicios-lista">
            {formData.schedule.map((item, index) => (
              <li key={index}>
                {item.date} de {item.startTime} a {item.endTime}
                <button type="button" onClick={() => removeSchedule(index)}>
                  ×
                </button>
              </li>
            ))}
          </ul>
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
