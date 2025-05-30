import React, { useState } from 'react';
import { useRegistrarHabitacion } from '../../shared/hooks/role_hotel/useHabitaciones';
import '../../style/hotel/HabitacionForm.css';

const FormularioHabitacion = ({ hotelId: propHotelId }) => {
  const { registrar, isLoading, error, reset } = useRegistrarHabitacion();
  const [successMessage, setSuccessMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const hotelId = propHotelId || user?.hotelId || user?.hotel?._id;

  const initialFormData = {
    hotelId: hotelId || '',
    roomType: 'simple',
    capacity: 1,
    pricePerNight: 0,
    status: 'disponible',
    amenities: [],
    availability: [],
    image: '',
    newAmenity: '',
    newAvailability: {
      startDate: '',
      endDate: ''
    }
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      newAvailability: { ...prev.newAvailability, [name]: value }
    }));
  };

  const addAmenity = () => {
    if (formData.newAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, prev.newAmenity.trim()],
        newAmenity: ''
      }));
    }
  };

  const removeAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const addAvailability = () => {
    if (formData.newAvailability.startDate && formData.newAvailability.endDate) {
      setFormData(prev => ({
        ...prev,
        availability: [...prev.availability, prev.newAvailability],
        newAvailability: { startDate: '', endDate: '' }
      }));
    }
  };

  const removeAvailability = (index) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrar(formData);
      setSuccessMessage('Habitación registrada con éxito');
      setTimeout(() => setSuccessMessage(''), 3000);
      setFormData(initialFormData);
    } catch (err) {
      console.error('Error al registrar la habitación:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Nueva Habitación</h2>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
          <button onClick={reset} className="close-error">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* ... El resto del formulario permanece igual ... */}
        {/* No se modificó ninguna lógica de entradas */}
        
        <div className="form-group">
          <label>Tipo de Habitación:</label>
          <select name="roomType" value={formData.roomType} onChange={handleChange}>
            <option value="simple">Simple</option>
            <option value="doble">Doble</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        <div className="form-group">
          <label>Capacidad:</label>
          <input
            type="number"
            name="capacity"
            min="1"
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Precio por Noche:</label>
          <input
            type="number"
            name="pricePerNight"
            min="0"
            step="0.01"
            value={formData.pricePerNight}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Estado:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="disponible">Disponible</option>
            <option value="reservada">Reservada</option>
            <option value="en mantenimiento">En Mantenimiento</option>
          </select>
        </div>

        <div className="form-group">
          <label>URL de la Imagen:</label>
          <input
            type="text"
            name="image"
            placeholder="https://..."
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Servicios:</label>
          <div className="input-group">
            <input
              type="text"
              value={formData.newAmenity}
              onChange={(e) => setFormData({ ...formData, newAmenity: e.target.value })}
              placeholder="Agregar servicio (ej: WiFi, TV)"
            />
            <button type="button" onClick={addAmenity} className="add-button">+</button>
          </div>
          <div className="tags-container">
            {formData.amenities.map((amenity, index) => (
              <span key={index} className="tag">
                {amenity}
                <button type="button" onClick={() => removeAmenity(index)} className="remove-tag">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Disponibilidad:</label>
          <div className="availability-input">
            <input
              type="date"
              name="startDate"
              value={formData.newAvailability.startDate}
              onChange={handleAvailabilityChange}
            />
            <input
              type="date"
              name="endDate"
              value={formData.newAvailability.endDate}
              onChange={handleAvailabilityChange}
            />
            <button type="button" onClick={addAvailability} className="add-button">+</button>
          </div>
          <div className="availability-list">
            {formData.availability.map((avail, index) => (
              <div key={index} className="availability-item">
                {new Date(avail.startDate).toLocaleDateString()} - {new Date(avail.endDate).toLocaleDateString()}
                <button type="button" onClick={() => removeAvailability(index)} className="remove-tag">×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'Registrando...' : 'Registrar Habitación'}
          </button>
          <button type="button" onClick={() => setFormData(initialFormData)} className="cancel-button" disabled={isLoading}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioHabitacion;