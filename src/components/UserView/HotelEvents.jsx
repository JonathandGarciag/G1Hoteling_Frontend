import {
  Card, CardContent, Typography, Grid, CircularProgress, Chip, Grow,
} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useHotelEvents } from "../../shared/hooks/useHotelEvents";

export const HotelEvents = ({ hotelId }) => {
  const { events, loading } = useHotelEvents(hotelId);

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  if (events.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 5, textAlign: 'center' }}>
        No hay eventos programados para este hotel.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {events.map((event, index) => (
        <Grow in timeout={500 + index * 200} key={event._id}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.03)" },
                background: "linear-gradient(145deg, #f0f0f0, #fafafa)",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  {event.titulo}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Desde: {new Date(event.fechaInicio).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hasta: {new Date(event.fechaFin).toLocaleDateString()}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <GroupIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Capacidad: {event.capacidad}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <AttachMoneyIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Precio: ${event.precio}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Organizador: {event.usuarioId?.name || "Usuario desconocido"}
                </Typography>

                <Chip
                  label={event.estado}
                  color={event.estado === "programado" ? "success" : event.estado === "cancelado" ? "error" : "warning"}
                  size="small"
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
};
