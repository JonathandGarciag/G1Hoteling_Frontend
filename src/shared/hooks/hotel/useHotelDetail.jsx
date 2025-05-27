import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHotels, updateHotel, deleteHotel } from "../../../service/userService";
import { toast } from "react-toastify";

export const useHotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [showUpdateNotice, setShowUpdateNotice] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getHotels().then((data) => {
      const found = data.find((h) => h._id === id);
      if (!found) return toast.error("Hotel no encontrado");
      setHotel(found);
    });
  }, [id]);

  const handleChange = (e) => {
    setShowUpdateNotice(true);
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateHotel(id, hotel);
    toast.success("Hotel actualizado correctamente");
    setShowUpdateNotice(false);
  };

  const handleDelete = async () => {
    await deleteHotel(id);
    toast.success("Hotel eliminado correctamente");
    navigate("/hotel/viewHotel");
  };

  return {
    hotel,
    showUpdateNotice,
    confirmDelete,
    setConfirmDelete,
    handleChange,
    handleUpdate,
    handleDelete,
    navigate,
  };
};
