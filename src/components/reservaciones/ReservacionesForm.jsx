import React, { useState, useEffect } from "react";

import { useAgregarReservacion } from "../../shared/hooks/useReservations";

import '../../style/ReservacionesForm.css'

const FormularioReservacion = ({ onReservacionAgregada }) => {
  const { agregar, loading, error } = useAgregarReservacion();

  const [formData, setFormData] = useState({
    nombreCliente: "",
    fechaEntrada: "",
    fechaSalida: "",
    habitacion: "",
    hotelId: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const nuevaReservacion = await agregar(formData);
      setMensaje("Reservación agregada con éxito.");
      setFormData({
        nombreCliente: "",
        fechaEntrada: "",
        fechaSalida: "",
        habitacion: "",
        hotelId: "",
      });

      if (onReservacionAgregada) {
        onReservacionAgregada(nuevaReservacion);
      }
    } catch {
      // El error lo maneja useEffect para mostrar mensaje
    }
  };

  useEffect(() => {
    if (error) {
      setMensaje("Error al agregar la reservación. Inténtalo de nuevo.");
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="reservaciones-container">
      <h2 className="reservaciones-title">Agregar Reservación</h2>

      <input
        type="text"
        name="nombreCliente"
        value={formData.nombreCliente}
        onChange={handleChange}
        placeholder="Nombre del Cliente"
        className="reservaciones-input"  // <-- Cambiado aquí
        required
      />

      <input
        type="date"
        name="fechaEntrada"
        value={formData.fechaEntrada}
        onChange={handleChange}
        className="reservaciones-input"  // <-- Cambiado aquí
        required
      />

      <input
        type="date"
        name="fechaSalida"
        value={formData.fechaSalida}
        onChange={handleChange}
        className="reservaciones-input"  // <-- Cambiado aquí
        required
      />

      <input
        type="text"
        name="habitacion"
        value={formData.habitacion}
        onChange={handleChange}
        placeholder="Número de Habitación"
        className="reservaciones-input"  // <-- Cambiado aquí
        required
      />

      <input
        type="text"
        name="hotelId"
        value={formData.hotelId}
        onChange={handleChange}
        placeholder="ID del Hotel"
        className="reservaciones-input"  // <-- Cambiado aquí
        required
      />

      <button
        type="submit"
        className="reservaciones-button" // <-- Cambiado aquí
        disabled={loading}
      >
        {loading ? "Guardando..." : "Agregar Reservación"}
      </button>

      {mensaje && (
        <p className={`reservaciones-message ${error ? "error" : ""}`}>
          {mensaje}
        </p>
      )}
    </form>
  );
};

export default FormularioReservacion;