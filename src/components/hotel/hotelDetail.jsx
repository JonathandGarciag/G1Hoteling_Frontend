import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateHotel, deleteHotel, getHotels } from "../../service/userService";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

export default function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getHotels().then((data) => {
      const found = data.find((h) => h._id === id);
      if (!found) return toast.error("Hotel no encontrado");
      setHotel(found);
    });
  }, [id]);

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateHotel(id, hotel);
    toast.success("Hotel actualizado");
    navigate("/hotel/viewHotel");
  };

  const handleDelete = async () => {
    await deleteHotel(id);
    toast.success("Hotel eliminado");
    navigate("/hotel/viewHotel");
  };

  if (!hotel) return <p>Cargando...</p>;

  return (
    <div className="hotel-wrapper">
      <h2>Editar hotel</h2>
      <TextField name="name" label="Nombre" value={hotel.name} onChange={handleChange} fullWidth />
      <TextField name="address" label="Dirección" value={hotel.address} onChange={handleChange} fullWidth />
      <TextField name="qualification" label="Calificación" value={hotel.qualification} onChange={handleChange} fullWidth />
      <TextField name="amenities" label="Amenidades" value={hotel.amenities} onChange={handleChange} fullWidth />
      <TextField name="image" label="Imagen URL" value={hotel.image} onChange={handleChange} fullWidth />
      <div style={{ marginTop: "1rem" }}>
        <Button variant="contained" onClick={handleUpdate}>Actualizar</Button>
        <Button variant="outlined" color="error" onClick={handleDelete} style={{ marginLeft: "1rem" }}>
          Eliminar
        </Button>
        <Button variant="text" onClick={() => navigate("/hotel/viewHotel")} style={{ marginLeft: "1rem" }}>
          Volver
        </Button>
      </div>
    </div>
  );
}