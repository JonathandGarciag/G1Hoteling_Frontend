import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { createHotel } from "../../service/userService";
import { toast } from "react-toastify";

export default function CreateHotelForm() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    qualification: "",
    amenities: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const toSend = { ...form, amenities: form.amenities.split(",") };
      await createHotel(toSend);
      toast.success("Hotel creado correctamente");
      setForm({ name: "", address: "", qualification: "", amenities: "", image: "" });
    } catch (error) {
      toast.error("Error al crear hotel");
    }
  };

  return (
    <>
      <TextField label="Nombre" name="name" value={form.name} onChange={handleChange} fullWidth />
      <TextField label="Dirección" name="address" value={form.address} onChange={handleChange} fullWidth />
      <TextField label="Calificación" name="qualification" value={form.qualification} onChange={handleChange} fullWidth />
      <TextField label="Amenidades (separadas por coma)" name="amenities" value={form.amenities} onChange={handleChange} fullWidth />
      <TextField label="Imagen URL" name="image" value={form.image} onChange={handleChange} fullWidth />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Crear</Button>
    </>
  );
}