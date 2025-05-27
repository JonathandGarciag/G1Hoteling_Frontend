import {
  TextField,
  Button,
  IconButton,
  Tooltip,
  Typography,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useHotelDetail } from "../../shared/hooks/hotel/useHotelDetail";
import { toast } from "react-toastify";

export default function HotelDetail() {
  const {
    hotel,
    showUpdateNotice,
    confirmDelete,
    setConfirmDelete,
    handleChange,
    handleUpdate,
    handleDelete,
    navigate,
  } = useHotelDetail();

  if (!hotel) return <p>Cargando...</p>;

  return (
    <Paper elevation={3} style={{ padding: "2rem", maxWidth: "800px", margin: "auto", marginTop: "2rem" }}>
      <Typography variant="h5" gutterBottom>Editar hotel</Typography>

      {hotel.accessToken && (
        <div style={{ marginBottom: "1.5rem" }}>
          <Typography variant="subtitle1"><strong>JWT del hotel</strong></Typography>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <TextField value={hotel.accessToken} InputProps={{ readOnly: true }} fullWidth />
            <Tooltip title="Copiar JWT">
              <IconButton onClick={() => {
                navigator.clipboard.writeText(hotel.accessToken);
                toast.success("JWT copiado");
              }}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}

      {hotel.ownerEmail && (
        <div style={{ marginBottom: "1.5rem" }}>
          <Typography variant="subtitle1"><strong>Dueño del hotel</strong></Typography>
          <TextField value={hotel.ownerEmail} InputProps={{ readOnly: true }} fullWidth />
        </div>
      )}

      {showUpdateNotice && (
        <Typography variant="body2" color="warning.main" sx={{ mb: 2 }}>
          Tienes cambios sin guardar.
        </Typography>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField name="name" label="Nombre" value={hotel.name} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="address" label="Dirección" value={hotel.address} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="amenities" label="Amenidades" value={hotel.amenities} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="image" label="Imagen URL" value={hotel.image} onChange={handleChange} fullWidth />
        </Grid>
      </Grid>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Button variant="contained" onClick={handleUpdate}>Actualizar</Button>
        <Button variant="outlined" color="error" onClick={() => setConfirmDelete(true)}>Eliminar</Button>
        <Button variant="text" onClick={() => navigate("/hotel/viewHotel")}>← Volver</Button>
      </div>

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>¿Estás seguro de eliminar este hotel?</DialogTitle>
        <DialogContent>
          <Typography>Esta acción no se puede deshacer.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
