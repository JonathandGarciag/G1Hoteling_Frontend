import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReservations } from '../../shared/hooks/useReservations';
import '../../style/userView/reservationForm.css';

export default function ReservationForm() {
  const { hotelId: hotelIdParam, roomId: roomIdParam } = useParams();
  const [form, setForm] = useState({
    hotelId: hotelIdParam || '',
    roomId: roomIdParam || '',
    startDate: '',
    endDate: '',
    totalPrice: ''
  });

  const {
    hotels,
    rooms,
    fetchRoomsByHotel,
    handleCreateReservation,
    loading
  } = useReservations();

  useEffect(() => {
    if (hotelIdParam) {
      fetchRoomsByHotel(hotelIdParam);
    }
  }, [hotelIdParam]);

  useEffect(() => {
    if (roomIdParam && rooms.length > 0) {
      setForm(prev => ({ ...prev, roomId: roomIdParam }));
    }
  }, [roomIdParam, rooms]);

  useEffect(() => {
    const selectedRoom = rooms.find(room => room._id === form.roomId);

    if (form.startDate && form.endDate && selectedRoom) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      const total = diffDays > 0 ? diffDays * selectedRoom.pricePerNight : 0;
      setForm(prev => ({ ...prev, totalPrice: total }));
    }
  }, [form.startDate, form.endDate, form.roomId, rooms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleHotelChange = async (e) => {
    const selectedHotelId = e.target.value;
    setForm(prev => ({ ...prev, hotelId: selectedHotelId, roomId: '', totalPrice: '' }));
    await fetchRoomsByHotel(selectedHotelId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleCreateReservation(form); // ✅ sin userId
      alert('Reservación creada con éxito');
    } catch (error) {
      alert(error.message);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h2>Crear Reservación</h2>

      <label>Hotel</label>
      <select name="hotelId" value={form.hotelId} onChange={handleHotelChange} required>
        <option value="">Seleccione un hotel</option>
        {hotels.map(hotel => (
          <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
        ))}
      </select>

      <label>Habitación</label>
      <select name="roomId" value={form.roomId} onChange={handleChange} required disabled={!rooms.length}>
        <option value="">Seleccione una habitación</option>
        {rooms.map(room => (
          <option key={room._id} value={room._id}>
            {room.roomType} - ${room.pricePerNight}
          </option>
        ))}
      </select>

      <label>Fecha de inicio</label>
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        min={today}
        onChange={handleChange}
        required
      />

      <label>Fecha de fin</label>
      <input
        type="date"
        name="endDate"
        value={form.endDate}
        min={form.startDate || today}
        onChange={handleChange}
        required
      />

      <label>Precio total</label>
      <input
        type="number"
        name="totalPrice"
        value={form.totalPrice}
        disabled
      />

      <button type="submit" disabled={loading || !form.roomId || !form.startDate || !form.endDate}>
        {loading ? 'Guardando...' : 'Crear Reservación'}
      </button>
    </form>
  );
}
