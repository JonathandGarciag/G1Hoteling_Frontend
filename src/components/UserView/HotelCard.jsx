import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import '../../style/userView/card.css';

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotels/${hotel._id}/rooms`);
  };

  return (
    <div className="card-horizontal" onClick={handleClick}>
      <img
        src={hotel.image || 'https://via.placeholder.com/150'}
        alt={hotel.name}
        className="card-image-horizontal"
      />
      <div className="card-content-horizontal">
        <h2 className="card-title">{hotel.name}</h2>
        
        <p className="card-address">
          <LocationOnIcon className="icon" /> {hotel.address}
        </p>

        <p className="card-rating">
          <StarIcon className="icon" style={{ color: '#fbbf24' }} />
          {hotel.qualification.toFixed(1)} / 5
        </p>

        <p className="card-amenities">
          <LocalHotelIcon className="icon" /> {hotel.amenities.join(', ')}
        </p>
      </div>
    </div>
  );
}
