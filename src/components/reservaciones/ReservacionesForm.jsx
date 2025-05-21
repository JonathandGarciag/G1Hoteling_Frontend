// components/FormularioReservacion.jsx
import React, { useState } from "react";
import { useReservaciones } from "../../shared/hooks/useReservations";

const FormularioReservacion = ({ onReservacionAgregada }) => {
  const { agregarReservacion } = useReservaciones();

  const [formData, setFormData] = useState({
    nombreCliente: "",
    fechaEntrada: "",
    fechaSalida: "",
    habitacion: "",
    hotelId: "", // Si necesitas enviar el hotel relacionado
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    setError("");

    try {
      const nuevaReservacion = await agregarReservacion(formData);
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
    } catch (err) {
      setError("Error al agregar la reservación. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Agregar Reservación</h2>

      <input
        type="text"
        name="nombreCliente"
        value={formData.nombreCliente}
        onChange={handleChange}
        placeholder="Nombre del Cliente"
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="date"
        name="fechaEntrada"
        value={formData.fechaEntrada}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="date"
        name="fechaSalida"
        value={formData.fechaSalida}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="habitacion"
        value={formData.habitacion}
        onChange={handleChange}
        placeholder="Número de Habitación"
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="hotelId"
        value={formData.hotelId}
        onChange={handleChange}
        placeholder="ID del Hotel"
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Agregar Reservación"}
      </button>

      {mensaje && <p className="text-green-600">{mensaje}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default FormularioReservacion;
