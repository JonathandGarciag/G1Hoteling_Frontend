import { useState } from "react";
import { createHotel } from "../../../service/userService";
import { toast } from "react-toastify";

export const useCreateHotel = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    amenities: "",
    image: ""
  });

  const [hotelToken, setHotelToken] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, address, amenities, image } = form;
    if (!name || !address || !amenities || !image) {
      toast.warn("Todos los campos son obligatorios");
      return;
    }

    try {
      const toSend = { ...form, amenities: amenities.split(",") };
      const response = await createHotel(toSend);
      if (response?.hotel?.token) {
        setHotelToken(response.hotel.token);
        toast.success("Hotel creado correctamente");
        setForm({ name: "", address: "", amenities: "", image: "" });
      } else {
        toast.error("No se recibió el token del hotel");
      }
    } catch (error) {
      toast.error("Error al crear hotel");
    }
  };

  return {
    form,
    hotelToken,
    handleChange,
    handleSubmit
  };
};
