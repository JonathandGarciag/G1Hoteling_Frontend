import { useState } from "react";
import { assignHotelToUser } from "../../../service/userService";
import { toast } from "react-toastify";

export const useAssignHotel = () => {
  const [userIdentifier, setUserIdentifier] = useState("");
  const [hotelToken, setHotelToken] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePreAssign = () => {
    if (!userIdentifier || !hotelToken) {
      setErrorMessage("Ambos campos son obligatorios antes de asignar");
      return;
    }
    setErrorMessage("");
    setOpenConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      await assignHotelToUser({ userIdentifier, hotelToken });
      toast.success("Hotel asignado correctamente");
      setUserIdentifier("");
      setHotelToken("");
    } catch (error) {
      toast.error("Error al asignar hotel");
    } finally {
      setOpenConfirm(false);
    }
  };

  return {
    userIdentifier,
    setUserIdentifier,
    hotelToken,
    setHotelToken,
    openConfirm,
    setOpenConfirm,
    errorMessage,
    handlePreAssign,
    handleConfirm,
  };
};
