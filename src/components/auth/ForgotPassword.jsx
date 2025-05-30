import React, { useState } from "react";
import { forgotPassword } from "../../service/authService";
import { toast, ToastContainer } from "react-toastify";
import {
  Container, Box, Left, Title,
  Label, Input, MotionButton, Right,
  RecoveryButton, BackLink } from "../../style/emotion/ForgotPasswordStyle";
import { AnimatePresence } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [recoveryLink, setRecoveryLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await forgotPassword(email);

    if (res.success) {
      toast.success("Enlace generado correctamente");
      const token = res.data.token;
      const frontendLink = `http://localhost:5173/reset-password/${token}`;
      setRecoveryLink(frontendLink);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Container>
      <Box>
        <Left>
          <Title>Recuperar contraseña</Title>
          <form onSubmit={handleSubmit}>
            <Label>Correo electrónico</Label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
            <MotionButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Enviar instrucciones
            </MotionButton>
          </form>
          <BackLink to="/Login">← Volver al login</BackLink>
        </Left>

        <AnimatePresence mode="wait">
          {!recoveryLink ? (
            <Right
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <Right
              key="recovery"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RecoveryButton
                href={recoveryLink}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Ir al formulario de nueva contraseña
              </RecoveryButton>
            </Right>
          )}
        </AnimatePresence>
      </Box>
      <ToastContainer />
    </Container>
  );
}