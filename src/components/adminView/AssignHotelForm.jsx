import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Alert
} from "@mui/material";
import { motion } from "framer-motion";
import { useAssignHotel } from "../../shared/hooks/hotel/useAssignHotel";

export default function AssignHotelForm({ onBack }) {
  const {
    userIdentifier,
    setUserIdentifier,
    hotelToken,
    setHotelToken,
    openConfirm,
    setOpenConfirm,
    errorMessage,
    handlePreAssign,
    handleConfirm,
  } = useAssignHotel();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Paper elevation={3} sx={{ maxWidth: 700, mx: "auto", my: 4, px: 4, py: 5, borderRadius: 3, backgroundColor: "#f9fafc" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1e293b" }}>
          Asignar Hotel a Usuario
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "#475569" }}>
          Ingresa el identificador del usuario (email o ID) y el token del hotel que deseas asignar.
        </Typography>

        {errorMessage && <Alert severity="warning" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        <TextField
          label="Correo electrónico o ID del usuario"
          value={userIdentifier}
          onChange={(e) => setUserIdentifier(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Token del Hotel"
          value={hotelToken}
          onChange={(e) => setHotelToken(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={handlePreAssign}>Asignar</Button>
          <Button variant="outlined" onClick={onBack}>← Volver</Button>
        </Box>

        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
          <DialogTitle>¿Confirmar asignación?</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Seguro que deseas asignar este hotel al usuario <strong>{userIdentifier}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
            <Button onClick={handleConfirm} variant="contained" color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </motion.div>
  );
}
