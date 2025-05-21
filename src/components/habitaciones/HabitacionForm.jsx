// components/HabitacionForm.jsx
import React, { useState } from "react";
import { useHabitaciones } from "../../shared/hooks/useHabitaciones";

const HabitacionForm = ({ hotelId }) => {
  const { agregarHabitacion } = useHabitaciones();

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
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Registrar Habitación</h2>
      {mensaje && <p className="text-green-600">{mensaje}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          value={habitacion.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="descripcion"
          value={habitacion.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="capacidad"
          value={habitacion.capacidad}
          onChange={handleChange}
          placeholder="Capacidad"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="precio"
          value={habitacion.precio}
          onChange={handleChange}
          placeholder="Precio por noche"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default HabitacionForm;