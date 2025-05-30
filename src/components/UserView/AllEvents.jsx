import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Grow,
  Box,
  Button,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import HotelIcon from "@mui/icons-material/Hotel";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAllEvents } from "../../shared/hooks/useAllEvents";
import { useNavigate } from "react-router-dom";

const statusColors = {
  programado: "primary",
  cancelado: "error",
  completado: "success",
};

export const AllEvents = () => {
  const { events, loading } = useAllEvents();
  const navigate = useNavigate();

  const handleReserveClick = (eventoId) => {
    navigate("/eventReservation", { state: { eventoId } });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (events.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        No hay eventos disponibles actualmente.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 5, padding: 3 }}>
      {events.map((event, index) => (
        <Grow in timeout={500 + index * 200} key={event._id}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 4,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              {event.image && (
                <CardMedia
                  component="img"
                  height="180"
                  image={event.image}
                  alt={event.titulo}
                />
              )}

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  {event.titulo}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <HotelIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Hotel: {event.hotelId.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Organizado por: {event.usuarioId.name}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Desde: {new Date(event.fechaInicio).toLocaleDateString()}
                </Typography>

                <Typography variant="body2">
                  <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Hasta: {new Date(event.fechaFin).toLocaleDateString()}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <PriceCheckIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Precio: ${event.precio}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Chip
                    label={event.estado}
                    color={statusColors[event.estado]}
                    size="small"
                  />
                  {event.estado === "programado" && (
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => handleReserveClick(event._id)}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        transition: "all 0.3s",
                        "&:hover": {
                          backgroundColor: "#e3f2fd",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      Reservar
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
};
