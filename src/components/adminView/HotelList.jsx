import React from "react";
import { useHotelList } from "../../shared/hooks/hotel/useHotelList";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import "../../style/HotelList.css";

export default function HotelList() {
  const {
    hotels,
    loading,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    totalFiltered
  } = useHotelList();

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const totalStars = 5;

    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full">★</span>
        ))}
        {hasHalf && <span className="star half">★</span>}
        {[...Array(totalStars - fullStars - (hasHalf ? 1 : 0))].map((_, i) => (
          <span key={`empty-${i}`} className="star empty">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="hotel-wrapper">
      <h2 className="hotel-section-title">Hot hotel deals right now</h2>

      <input
        type="text"
        placeholder="Buscar hotel..."
        value={search}
        onChange={handleSearchChange}
        className="hotel-search"
      />

      <p className="pagination-summary">
        Mostrando {hotels.length} de {totalFiltered} hoteles
      </p>

      {loading ? (
        <p className="loading">Cargando hoteles...</p>
      ) : (
        <div className="hotel-cards">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="hotel-card"
              onClick={() => navigate(`/hotel/${hotel._id}`)}
              style={{
                cursor: "pointer",
                borderLeft: hotel.assigned ? "4px solid #2e7d32" : "4px solid transparent"
              }}
            >
              <img
                className="hotel-image"
                src={hotel.image || `https://via.placeholder.com/400x200.png?text=${encodeURIComponent(hotel.name)}`}
                alt={`Imagen de ${hotel.name}`}
              />
              <div className="hotel-content">
                <h3 className="hotel-name">{hotel.name}</h3>
                {hotel.assigned && (
                  <Chip label="Asignado" color="success" size="small" sx={{ mt: 0.5 }} />
                )}
                <p className="hotel-address">{hotel.address}</p>
                <div className="hotel-category">{renderStars(hotel.qualification)}</div>
                <p className="hotel-amenities">
                  {hotel.amenities?.length > 0 ? hotel.amenities.join(", ") : "Sin amenidades"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="hotel-pagination">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Anterior
        </button>
        <span className="pagination-info">Página {currentPage} de {totalPages}</span>
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
