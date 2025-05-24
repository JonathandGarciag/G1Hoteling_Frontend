import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import CreateHotelForm from "../hotel/CreateHotelForm";
import AssignHotelForm from "./AssignHotelForm";

export default function HotelManage() {
  const [mode, setMode] = useState("create");

  return (
    <div className="hotel-wrapper">
      <h2>{mode === "create" ? "Crear Hotel" : "Asignar Hotel a Usuario"}</h2>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, newMode) => newMode && setMode(newMode)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="create">Crear Hotel</ToggleButton>
        <ToggleButton value="assign">Asignar Hotel</ToggleButton>
      </ToggleButtonGroup>

      {mode === "create" ? <CreateHotelForm /> : <AssignHotelForm />}
    </div>
  );
}