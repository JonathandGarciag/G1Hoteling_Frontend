import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../service/authService";
import { toast, ToastContainer } from "react-toastify";
import {
  Container,
  Box,
  Image,
  Content,
  Title,
  Form,
  Label,
  Input,
  Button,
  BackLink
} from "../../style/emotion/ResetPasswordStyles";

export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(token, newPassword);
    if (res.success) {
      toast.success("Contraseña actualizada con éxito");
      setTimeout(() => navigate("/Login"), 2000);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Container>
      <Box
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image />
        <Content>
          <Title>Establecer nueva contraseña</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Nueva contraseña</Label>
            <Input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="********"
            />
            <Button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Actualizar
            </Button>
          </Form>
          <BackLink to="/forgot-password">← Volver</BackLink>
        </Content>
      </Box>
      <ToastContainer />
    </Container>
  );
}