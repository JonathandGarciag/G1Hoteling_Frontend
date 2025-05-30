import React from "react";
import { useEventosPorHotel } from "../../shared/hooks/role_hotel/useEvent";
import "../../style/hotel/ListEventosPorHotel.css";

const ListEventosPorHotel = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const hotelId = user?.hotelId || user?.hotel?._id;

  const { eventos, cargando, error } = useEventosPorHotel(hotelId);

  if (cargando) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Cargando eventos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>Error al cargar eventos</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="eventos-container">
      <h2 className="header">Eventos Registrados</h2>
      
      {eventos.length === 0 ? (
        <div className="empty-state">
          <p>No se encontraron eventos registrados</p>
        </div>
      ) : (
        <div className="eventos-grid">
          {eventos.map((evento) => (
            <div key={evento._id} className="evento-card">
              <div className="evento-contenido-texto">
                <h3>{evento.titulo}</h3>
                <p className="descripcion">{evento.descripcion}</p>

                <div className="evento-meta">
                  <p><strong>Fecha inicio:</strong> {new Date(evento.fechaInicio).toLocaleDateString()}</p>
                  <p><strong>Fecha fin:</strong> {new Date(evento.fechaFin).toLocaleDateString()}</p>
                  <p><strong>Capacidad:</strong> {evento.capacidad}</p>
                  <p className="recursos-adicionales">
                    <strong>Recursos adicionales:</strong> {evento.recursosAdicionales?.join(', ')}
                  </p>
                  <p><strong>Estado:</strong> <span className={`estado ${evento.estado}`}>{evento.estado}</span></p>
                  <p><strong>Precio:</strong> ${evento.precio.toFixed(2)}</p>
                </div>
              </div>

              {evento.image && (
                <div className="evento-imagenes">
                  <img
                    src={evento.image}
                    alt={`Imagen del evento ${evento.titulo}`}
                    className="evento-imagen"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/fallback.png"; // opcional imagen fallback
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListEventosPorHotel;
