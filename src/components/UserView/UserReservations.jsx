import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Chip,
  Grow,
} from "@mui/material";
import HotelIcon from '@mui/icons-material/Hotel';
import EventIcon from '@mui/icons-material/Event';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { useUserReservations } from "../../shared/hooks/useUserReservations";

const statusColors = {
  confirmada: "success",
  cancelada: "error",
  finalizada: "warning"
};

export const UserReservations = () => {
  const { reservations, loading } = useUserReservations();

  if (loading) {
    return <CircularProgress sx={{ mt: 5 }} />;
  }

  if (!reservations.length) {
    return (
      <Typography
        variant="h6"
        align="center"
        sx={{ mt: 5, color: "text.secondary" }}
      >
        No has hecho ninguna reservación.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 5, padding: 3 }}>
      {reservations.map((res, index) => (
        <Grow in timeout={500 + index * 200} key={res._id}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <HotelIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Hotel: {res.hotelId.name || res.hotelId}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Desde: {new Date(res.startDate).toLocaleDateString()}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Hasta: {new Date(res.endDate).toLocaleDateString()}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <PriceCheckIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Precio total: ${res.totalPrice}
                </Typography>

                <Chip
                  label={res.status}
                  color={statusColors[res.status]}
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
