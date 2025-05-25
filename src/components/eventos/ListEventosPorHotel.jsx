import React from "react";
import { useEventosPorHotel } from "../../shared/hooks/useEvent";
import "../../style/ListEventosPorHotel.css";

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
              <h3>{evento.titulo}</h3>
              <p className="descripcion">{evento.descripcion}</p>
              
              <div className="evento-meta">
                <span>
                  <strong>Fecha:</strong> {new Date(evento.fecha).toLocaleDateString()}
                </span>
                <span className={`estado ${evento.estado}`}>
                  {evento.estado}
                </span>
              </div>
              
              {evento.serviciosIncluidos?.length > 0 && (
                <div className="servicios">
                  <strong>Servicios incluidos:</strong>
                  <ul>
                    {evento.serviciosIncluidos.map((servicio, index) => (
                      <li key={index}>{servicio}</li>
                    ))}
                  </ul>
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
