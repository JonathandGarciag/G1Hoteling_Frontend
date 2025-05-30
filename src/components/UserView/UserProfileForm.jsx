import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  Fade,
  Paper,
  Button,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Lock,
  Person,
  SaveAlt,
  Delete,
} from "@mui/icons-material";

import { useUserById } from "../../shared/hooks/useUserById";
import { useUpdateProfile } from "../../shared/hooks/useUpdateProfile";
import { useDeleteUser } from "../../shared/hooks/useDeleteUser";

const UserProfile = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUserId = localStorage.getItem("userId");
      setUserId(updatedUserId);
    };
    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const { user, loading, error } = useUserById(userId);
  const {
    updateProfile,
    loading: updateLoading,
    error: updateError,
    successMsg,
  } = useUpdateProfile();

  const {
    deleteUser,
    loading: deleteLoading,
    error: deleteError,
    successMessage: deleteSuccess,
  } = useDeleteUser();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
        newPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password) return;
    await updateProfile(userId, formData);
    setFormData((prev) => ({ ...prev, password: "", newPassword: "" }));
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.");
    if (confirmDelete && deletePassword) {
      const success = await deleteUser(deletePassword);
      if (success) {
        localStorage.removeItem("userId");
        window.location.href = "/Login";
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={5} textAlign="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Fade in>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 480,
          mx: "auto",
          mt: 8,
          p: 5,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h5"
          mb={3}
          textAlign="center"
          fontWeight="bold"
          color="primary"
        >
          Editar Perfil
        </Typography>

        {updateError && <Alert severity="error">{updateError}</Alert>}
        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        {deleteError && <Alert severity="error">{deleteError}</Alert>}
        {deleteSuccess && <Alert severity="success">{deleteSuccess}</Alert>}

        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={3}
          onSubmit={handleSubmit}
        >
          <TextField
            name="name"
            label="Nombre"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="username"
            label="Usuario"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="email"
            label="Correo electrónico"
            value={formData.email}
            fullWidth
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="password"
            label="Contraseña actual"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="newPassword"
            label="Nueva contraseña (opcional)"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SaveAlt />}
              disabled={updateLoading}
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                py: 1.5,
              }}
            >
              {updateLoading ? "Actualizando..." : "Guardar Cambios"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={handleDeleteConfirm}
              endIcon={<Delete />}
              disabled={deleteLoading}
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                py: 1.5,
              }}
            >
              {deleteLoading ? "Procesando..." : "Eliminar Perfil"}
            </Button>
          </Box>

          {showDeleteConfirm && (
            <Box mt={2}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es permanente.
              </Alert>
              <TextField
                type="password"
                label="Confirmar Contraseña"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteUser}
                fullWidth
                sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
              >
                Confirmar Eliminación
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Fade>
  );
};

export default UserProfile;
