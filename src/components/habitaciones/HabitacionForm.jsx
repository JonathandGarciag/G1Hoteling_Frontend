import React, { useState } from "react";


import '../../style/HabitacionForm.css'

const HabitacionForm = ({ hotelId }) => {

  const [habitacion, setHabitacion] = useState({
    nombre: "",
    descripcion: "",
    capacidad: "",
    precio: "",
    hotelId: hotelId || "",
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setHabitacion({
      ...habitacion,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    try {
      await agregarHabitacion(habitacion);
      setMensaje("Habitación registrada correctamente.");
      setHabitacion({
        nombre: "",
        descripcion: "",
        capacidad: "",
        precio: "",
        hotelId,
      });
    } catch (err) {
      setError("Error al registrar la habitación.");
    }
  };

  return (
    <div className="habitacion-form-container">
      <h2 className="habitacion-form-title">Registrar Habitación</h2>
      {mensaje && <p className="habitacion-form-message success">{mensaje}</p>}
      {error && <p className="habitacion-form-message error">{error}</p>}
      <form onSubmit={handleSubmit} className="habitacion-form">
        <div>
          <label htmlFor="nombre" className="evento-form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={habitacion.nombre}
            onChange={handleChange}
            required
            className="evento-form-input"
          />
        </div>

        <div>
          <label htmlFor="capacidad" className="evento-form-label">Capacidad</label>
          <input
            type="number"
            id="capacidad"
            name="capacidad"
            value={habitacion.capacidad}
            onChange={handleChange}
            required
            className="evento-form-input"
          />
        </div>

        <div>
          <label htmlFor="precio" className="evento-form-label">Precio por noche</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={habitacion.precio}
            onChange={handleChange}
            required
            className="evento-form-input"
          />
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <label htmlFor="descripcion" className="evento-form-label">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={habitacion.descripcion}
            onChange={handleChange}
            required
            className="evento-form-textarea"
          />
        </div>

        <button type="submit" className="habitacion-form-button">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default HabitacionForm;