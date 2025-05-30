import React, { useState, useEffect } from "react";

import { useGenerateBill } from "../../shared/hooks/role_hotel/useGenerateBill";

import { buscarReservacionesPorHotel } from "../../service/reservacionService";

import "../../style/hotel/GenerateFactura.css";

const GenerarFacturaForm = () => {
  const [reservationId, setReservationId] = useState("");
  const [reservations, setReservations] = useState([]);
  const [services, setServices] = useState([
    { serviceName: "Desayuno buffet", price: 20 },
    { serviceName: "Spa", price: 35 },
  ]);
  const [newService, setNewService] = useState({ name: "", price: 0 });

  const { generateBill, loading, error, bill } = useGenerateBill();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const hotelId = user?.hotelId || user?.hotel?._id;
        if (!hotelId) throw new Error("No se encontró el ID del hotel");
        const data = await buscarReservacionesPorHotel(hotelId);
        setReservations(data.reservations);
      } catch (err) {
        console.error("Error al cargar reservaciones:", err.message);
      }
    };

    fetchReservations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedReservation = reservations.find(
        (r) => r._id === reservationId
      );
      const userId = selectedReservation?.userId?._id;

      if (!userId) {
        throw new Error(
          "No se encontró el ID del usuario para la reservación seleccionada"
        );
      }

      await generateBill({
        reservationId,
        additionalServices: services,
      });
    } catch (err) {
      console.error("Error en el formulario:", err);
    }
  };

  const addService = () => {
    if (newService.name.trim() && newService.price > 0) {
      setServices([
        ...services,
        {
          serviceName: newService.name.trim(),
          price: Number(newService.price),
        },
      ]);
      setNewService({ name: "", price: 0 });
    }
  };

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  return (
    <div className="factura-form-container">
      <h2>Generar Factura</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="factura-form">
        <div className="form-group">
          <label>Seleccionar Reservación:</label>
          <select
            value={reservationId}
            onChange={(e) => setReservationId(e.target.value)}
            required
          >
            <option value="">Seleccione una reservación</option>
            {reservations.map((res) => (
              <option key={res._id} value={res._id}>
                {res._id} - {res.userId?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Servicios Adicionales:</label>
          <div className="services-input">
            <input
              type="text"
              placeholder="Nombre del servicio"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Precio"
              min="0"
              step="0.01"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
            />
            <button type="button" onClick={addService} className="add-button">
              +
            </button>
          </div>

          <ul className="services-list">
            {services.map((service, index) => (
              <li key={index}>
                {service.serviceName} - Q{service.price}
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="remove-button"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Generando..." : "Generar Factura"}
        </button>

        {bill && (
  <div className="success-message">
    <p>¡Factura generada exitosamente!</p>
    <p><strong>ID:</strong> {bill._id}</p>
    <p><strong>Total:</strong> Q{bill.totalAmount || bill.total}</p>
    <a
      href={`http://localhost:3000/uploads/facturas/factura-${bill._id}.pdf`}
      target="_blank"
      rel="noopener noreferrer"
      className="view-pdf-link"
    >
      📄 Ver PDF de la factura
    </a>
  </div>
)}

      </form>
    </div>
  );
};

export default GenerarFacturaForm;
