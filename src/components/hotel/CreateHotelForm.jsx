import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
  IconButton,
  Tooltip
} from "@mui/material";
import { motion } from "framer-motion";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useCreateHotel } from "../../shared/hooks/hotel/useCreateHotel";

export default function CreateHotelForm({ onBack }) {
  const { form, hotelToken, handleChange, handleSubmit } = useCreateHotel();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 700,
          mx: "auto",
          my: 4,
          px: 4,
          py: 5,
          borderRadius: 4,
          backgroundColor: "#f9fafc",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Crear Hotel
        </Typography>

        {hotelToken && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Box>
              <strong>Token generado:</strong> {hotelToken}
            </Box>
            <Tooltip title="Copiar">
              <IconButton
                onClick={() => navigator.clipboard.writeText(hotelToken)}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Alert>
        )}

        <TextField
          label="Nombre"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Dirección"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Amenidades (separadas por coma)"
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="URL de la imagen"
          name="image"
          value={form.image}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Box display="flex" justifyContent="flex-start" gap={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Crear
          </Button>
          <Button variant="outlined" onClick={onBack}>
            ← Volver
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
}
