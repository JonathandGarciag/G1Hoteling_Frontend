import { useState } from "react";
import CreateHotelForm from "../hotel/CreateHotelForm";
import AssignHotelForm from "./AssignHotelForm";
import { Box, Typography, CardMedia, CardContent } from "@mui/material";
import { motion } from "framer-motion";

export default function HotelManage() {
  const [mode, setMode] = useState(null);

  const options = [
    {
      key: "create",
      title: "Crear Hotel",
      description: "Registra un nuevo hotel en el sistema",
      image: "https://content.skyscnr.com/available/1246975432/1246975432_WxH.jpg"
    },
    {
      key: "assign",
      title: "Asignar Hotel",
      description: "Asocia un hotel a un usuario existente",
      image: "https://prezigram-assets.prezicdn.net/ad90975ce14479c4facbd36d29101b64b69376ada59388c3eacadeaa246e5cda4d7d84ac296050e488ba753bb63b8d305711475a6171a39536687c153ed9a8ac"
    }
  ];

  return (
    <Box
      className="hotel-wrapper"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      {!mode && (
        <>
          <Typography variant="h4" gutterBottom>
            ¿Qué deseas hacer?
          </Typography>
          <Box
            display="flex"
            gap={5}
            flexWrap="wrap"
            justifyContent="center"
            mt={4}
          >
            {options.map(option => (
              <motion.div
                key={option.key}
                whileHover={{ y: -8, scale: 1.03, boxShadow: "0px 10px 25px rgba(0,0,0,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ width: 320, height: 360, borderRadius: 8, overflow: "hidden", cursor: "pointer", background: "#fff" }}
                onClick={() => setMode(option.key)}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={option.image}
                  alt={option.title}
                />
                <CardContent sx={{ textAlign: "center", px: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    {option.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "black" }}
                  >
                    {option.description}
                  </Typography>
                </CardContent>
              </motion.div>
            ))}
          </Box>
        </>
      )}

      {mode === "create" && (
          <>
            <CreateHotelForm onBack={() => setMode(null)} />
          </>
        )}
      {mode === "assign" && (
        <>
          <AssignHotelForm onBack={() => setMode(null)} />
        </>
      )}
    </Box>
  );
}
