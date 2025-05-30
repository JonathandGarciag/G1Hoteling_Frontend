import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
  CircularProgress,
  Fade,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Groups, AttachMoney } from "@mui/icons-material";
import { useEventReservation } from "../../shared/hooks/useEventReservation";
import { useLocation } from "react-router-dom";
import { apiClient } from "../../service/apiClient"

const EventReservationForm = ({ eventoId: propEventoId }) => {
  const location = useLocation();
  const eventoId = propEventoId || location.state?.eventoId;

  const [evento, setEvento] = useState(null);
  const [formData, setFormData] = useState({
    cantidadPersonas: "",
    serviciosAdicionales: [],
    precioTotal: 0,
  });

  const {
    createReservation,
    loading,
    error,
    successMsg,
    clearMessages,
  } = useEventReservation();

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const { data } = await apiClient.get(`/evento/${eventoId}`);
        setEvento(data);
      } catch (err) {
        console.error("Error al cargar el evento:", err);
      }
    };

    if (eventoId) fetchEvento();
  }, [eventoId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    clearMessages();
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (servicio) => {
    clearMessages();
    setFormData((prev) => {
      const newServicios = prev.serviciosAdicionales.includes(servicio)
        ? prev.serviciosAdicionales.filter((s) => s !== servicio)
        : [...prev.serviciosAdicionales, servicio];

      return {
        ...prev,
        serviciosAdicionales: newServicios,
      };
    });
  };

  useEffect(() => {
    if (!evento) return;

    const base = evento.precio || 0;
    const personas = Number(formData.cantidadPersonas) || 0;
    const adicionales = formData.serviciosAdicionales.length;
    const costoAdicionalPorServicio = 10;

    const total = base * personas + adicionales * costoAdicionalPorServicio;

    setFormData((prev) => ({
      ...prev,
      precioTotal: total,
    }));
  }, [formData.cantidadPersonas, formData.serviciosAdicionales, evento]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createReservation({
      eventoId,
      cantidadPersonas: Number(formData.cantidadPersonas),
      serviciosAdicionales: formData.serviciosAdicionales,
      precioTotal: Number(formData.precioTotal),
    });

    setFormData({
      cantidadPersonas: "",
      serviciosAdicionales: [],
      precioTotal: 0,
    });
  };

  if (!eventoId) {
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Alert severity="error">No se ha seleccionado un evento para reservar.</Alert>
      </Box>
    );
  }

  if (!evento) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 520,
          mx: "auto",
          mt: 6,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          mb={3}
          sx={{ color: "#0d47a1" }}
        >
          Reservar Evento
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={3}
          onSubmit={handleSubmit}
        >
          <TextField
            name="cantidadPersonas"
            label="Cantidad de Personas"
            type="number"
            value={formData.cantidadPersonas}
            onChange={handleInputChange}
            required
            sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Groups />
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="body1" fontWeight="medium" color="textSecondary">
            Servicios Adicionales:
          </Typography>
          <FormGroup>
            {(evento.recursosAdicionales || []).map((servicio) => (
              <FormControlLabel
                key={servicio}
                control={
                  <Checkbox
                    checked={formData.serviciosAdicionales.includes(servicio)}
                    onChange={() => handleCheckboxChange(servicio)}
                    sx={{ color: "#1976d2" }}
                  />
                }
                label={servicio}
              />
            ))}
          </FormGroup>

          <TextField
            name="precioTotal"
            label="Precio Total"
            type="number"
            value={formData.precioTotal}
            disabled
            sx={{ backgroundColor: "#f0f0f0", borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              py: 1.5,
              borderRadius: 2,
              backgroundColor: "#1976d2",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1565c0",
                transform: "scale(1.05)",
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Reservar"}
          </Button>
        </Box>
      </Paper>
    </Fade>
  );
};

export default EventReservationForm;
