import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { motion } from "framer-motion";
import { addToast } from "@heroui/react";

import AgrosisLogotic from "../../assets/Agrosoft_Logo.png";
import LogoSena from "../../assets/logo2.png";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}`;

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    addToast({
      title: "Error",
      description: "Las contraseñas no coinciden.",
      timeout: 3000,
      color: "danger",
    });

    return;
    }
try {
  const response = await fetch(`${API_URL}/usuarios/password_reset_confirm/${token}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();

  if (response.ok) {
    addToast({
      title: "Éxito",
      description: "Contraseña restablecida con éxito.",
      timeout: 3000,
      color: "success",
    });
    navigate("/login");
  } else {
    addToast({
      title: "Error",
      description: data.error || "Token inválido o expirado.",
      timeout: 3000,
      color: "warning",
    });
  }
} catch  {
  addToast({
    title: "Error",
    description: "Error al conectar con el servidor.",
    timeout: 3000,
    color: "danger",
  });
}
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#fff', // Fondo blanco
      transition: 'all 0.3s ease-in-out',
      '& fieldset': { borderColor: '#e2e8f0' },
      '&:hover fieldset': { borderColor: '#cbd5e1' },
      '&.Mui-focused fieldset': { borderColor: '#2ecc71' },
      '& .MuiInputAdornment-root': {
        backgroundColor: 'inherit', // Fondo uniforme con el campo
        height: '100%',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#a0aec0',
      '&.Mui-focused': { color: '#2ecc71' },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#27a35e",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <svg
          preserveAspectRatio="none"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 L0,160 Q360,140 720,160 Q1080,180 1440,160 L1440,0 Z"
            fill="#fff"
            fillOpacity="1"
          />
        </svg>
      </Box>

      <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 1 }}>
        <img alt="AGROSIS Logotic Small" src={AgrosisLogotic}  style={{ width: "140px", height: "auto" }} />
      </Box>

      <Box sx={{ position: "absolute", bottom: 16, left: 16, zIndex: 1 }}>
        <img alt="Logo SENA" src={LogoSena}  style={{ width: "100px", height: "auto" }} />
      </Box>

      <Box
        sx={{
          width: { xs: "90%", sm: "70%", md: "50%" },
          maxWidth: "600px",
          backgroundColor: "#fff",
          borderRadius: "24px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
          p: { xs: 2, sm: 4 },
        }}
      >
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1a202c", textAlign: "center", mb: 1 }}
            variant="h4"
          >
            Restablecer Contraseña
          </Typography>
          <Typography
            sx={{ color: "#718096", textAlign: "center", mb: 3 }}
            variant="subtitle1"
          >
            Ingresa tu nueva contraseña
          </Typography>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}  onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nueva Contraseña"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={textFieldStyles}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              sx={{ backgroundColor: "#27a35e", "&:hover": { backgroundColor: "#218c4e" }, py: 1.5 }}
              type="submit"
              variant="contained"
            >
              Restablecer
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;