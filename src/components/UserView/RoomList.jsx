import { useParams, useNavigate } from 'react-router-dom';
import { useRooms } from '../../shared/hooks/useRooms';
import { useHotels } from '../../shared/hooks/useHotels';
import '../../style/userView/roomList.css';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PushPinIcon from '@mui/icons-material/PushPin';
import HotelIcon from '@mui/icons-material/Hotel';

export default function RoomList() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { rooms, loading: loadingRooms } = useRooms(hotelId);
  const { hotels, loading: loadingHotels } = useHotels();

  const selectedHotel = hotels.find(hotel => hotel._id === hotelId);

  if (loadingRooms || loadingHotels) {
    return <div className="loading-text">Cargando datos...</div>;
  }

  if (!selectedHotel) {
    return <div className="no-rooms-text">No se encontró el hotel.</div>;
  }

  return (
    <div className="room-layout">
      <div className="room-list-container show">
        {rooms.length === 0 && <p>No hay habitaciones disponibles.</p>}
        {rooms.map(room => (
          <div key={room._id} className="room-card">
            <h3 className="room-title">{room.roomType}</h3>
            <p className="room-info">
              <GroupIcon className="icon" /> Capacidad: {room.capacity} persona(s)
            </p>
            <p className="room-info">
              <AttachMoneyIcon className="icon" /> Precio: ${room.pricePerNight} / noche
            </p>
            <p className="room-info">
              <PushPinIcon className="icon" /> Estado: <span className="room-status">{room.status}</span>
            </p>
            <p className="room-amenities">
              <HotelIcon className="icon" /> Comodidades: {room.amenities.length > 0 ? room.amenities.join(', ') : 'Ninguna'}
            </p>
            <button
              className="btn-reserve"
              onClick={() => navigate(`/reservar/${hotelId}/${room._id}`)}
            >
              Reservar
            </button>
          </div>
        ))}
      </div>

      <div className="hotel-info">
        <h2 className="hotel-name">{selectedHotel.name}</h2>
        {selectedHotel.image && (
          <img
            src={selectedHotel.image}
            alt={`Imagen del hotel ${selectedHotel.name}`}
            className="hotel-image"
          />
        )}
        <p className="hotel-address">
          <LocationOnIcon className="icon" /> Dirección: {selectedHotel.address}
        </p>
        <p className="hotel-qualification">
          <StarIcon className="icon" /> Calificación: {selectedHotel.qualification} / 5
        </p>
        <p className="hotel-votes">
          <HowToVoteIcon className="icon" /> Número de votos: {selectedHotel.votes.length}
        </p>
        <p className="hotel-amenities">
          <RoomServiceIcon className="icon" /> Comodidades: {selectedHotel.amenities.length > 0 ? selectedHotel.amenities.join(', ') : 'Ninguna'}
        </p>
        <p className="hotel-status">
          {selectedHotel.status ? (
            <>
              <CheckCircleIcon className="icon" style={{ color: '#10b981' }} /> Hotel activo
            </>
          ) : (
            <>
              <CancelIcon className="icon" style={{ color: '#ef4444' }} /> Hotel inactivo
            </>
          )}
        </p>
      </div>
    </div>
  );
}
