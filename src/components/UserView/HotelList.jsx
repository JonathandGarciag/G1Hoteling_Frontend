import { useState } from "react";
import { useHotels } from "../../shared/hooks/useHotels";
import HotelCard from "./HotelCard";
import '../../style/userView/card.css';

// Íconos MUI
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function HotelList() {
  const { hotels, loading } = useHotels();

  const [visibleCount, setVisibleCount] = useState(4);
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const handleToggle = () => {
    if (expanded) {
      setVisibleCount(4);
      setExpanded(false);
    } else {
      setVisibleCount(filteredHotels.length);
      setExpanded(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(4);
    setExpanded(false);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
    setVisibleCount(4);
    setExpanded(false);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesName = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating
      ? Math.floor(hotel.qualification) === parseInt(selectedRating)
      : true;
    return matchesName && matchesRating;
  });

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="hotel-list-container">
      <div className="filter-bar mt-8">
        <div className="search-wrapper">
          <SearchIcon className="icon" />
          <input
            type="text"
            placeholder="Buscar por nombre de hotel"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <div className="select-wrapper">
          <StarIcon className="icon" />
          <select
            value={selectedRating}
            onChange={handleRatingChange}
            className="rating-select"
          >
            <option value="">Todas las estrellas</option>
            <option value="5">⭐ 5 estrellas</option>
            <option value="4">⭐ 4 estrellas</option>
            <option value="3">⭐ 3 estrellas</option>
            <option value="2">⭐ 2 estrellas</option>
            <option value="1">⭐ 1 estrella</option>
          </select>
        </div>
      </div>

      {filteredHotels.slice(0, visibleCount).map((hotel) => (
        <HotelCard key={hotel._id} hotel={hotel} />
      ))}

      {filteredHotels.length > 4 && (
        <button onClick={handleToggle} className="toggle-button">
          {expanded ? (
            <>
              <ExpandLessIcon className="icon" /> Ver menos
            </>
          ) : (
            <>
              <ExpandMoreIcon className="icon" /> Ver más
            </>
          )}
        </button>
      )}

      {filteredHotels.length === 0 && (
        <p className="text-gray-600 mt-4 text-center">No se encontraron hoteles.</p>
      )}
    </div>
  );
}
