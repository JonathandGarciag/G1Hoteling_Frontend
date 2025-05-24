import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { assignHotelToUser } from "../../service/userService";
import { toast } from "react-toastify";

export default function AssignHotelForm() {
  const [userToken, setUserToken] = useState("");
  const [hotelToken, setHotelToken] = useState("");

  const handleAssign = async () => {
    try {
      await assignHotelToUser({ userToken, hotelToken });
      toast.success("Hotel asignado correctamente");
      setUserToken("");
      setHotelToken("");
    } catch (error) {
      toast.error("Error al asignar hotel");
    }
  };

  return (
    <>
      <TextField label="Token del Usuario" value={userToken} onChange={(e) => setUserToken(e.target.value)} fullWidth />
      <TextField label="Token del Hotel" value={hotelToken} onChange={(e) => setHotelToken(e.target.value)} fullWidth />
      <Button variant="contained" onClick={handleAssign} sx={{ mt: 2 }}>Asignar</Button>
    </>
  );
}