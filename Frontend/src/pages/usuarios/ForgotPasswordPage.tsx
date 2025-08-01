import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToast } from "@heroui/react";
import { Box, Typography, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import AgrosisLogotic from '../../assets/Agrosoft_Logo.png';
import LogoSena from '../../assets/logob.png';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}`;


const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/usuarios/password_reset/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
        const data = await response.json();

        if (response.ok) {
          addToast({
            title: "Éxito",
            description: "Correo de recuperación enviado. Revisa tu bandeja de entrada.",
            timeout: 3000,
            color: "success"
          });
          navigate('/login');
        } else {
          addToast({
            title: "Error",
            description: data.error || "Error al enviar el correo.",
            timeout: 3000,
            color: "danger",
          });
        }
      } catch {
        addToast({
          title: "Error de conexión",
          description: "Error al conectar con el servidor.",
          timeout: 3000,
          color: "danger"
        });
      }
    }
      
  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#fff', 
      transition: 'all 0.3s ease-in-out',
      '& fieldset': { borderColor: '#e2e8f0' },
      '&:hover fieldset': { borderColor: '#cbd5e1' },
      '&.Mui-focused fieldset': { borderColor: '#2ecc71' },
    },
    '& .MuiInputLabel-root': {
      color: '#a0aec0',
      '&.Mui-focused': { color: '#2ecc71' },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#27a35e',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
      <svg
        preserveAspectRatio="none"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
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

      <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1 }}>
        <img alt="AGROSIS Logotic Small" src={AgrosisLogotic}  style={{ width: '140px', height: 'auto' }} />
      </Box>

      <Box sx={{ position: 'absolute', bottom: 16, left: 22, zIndex: 1 }}>
    <img alt="AGROSIS Logotic Small" src={LogoSena} style={{ width: '130px', height: 'auto' }} />
      </Box>

      <Box
        sx={{
          width: { xs: '90%', sm: '70%', md: '50%' },
          maxWidth: '600px',
          backgroundColor: '#fff',
          borderRadius: '24px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden',
          p: { xs: 2, sm: 4 },
        }}
      >
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
<Typography
  gutterBottom
  sx={{ fontWeight: 'bold', color: '#1a202c', textAlign: 'center', mb: 1 }}
  variant="h4"
>
  Recuperar Contraseña
</Typography>

<Typography
  sx={{ color: '#718096', textAlign: 'center', mb: 3 }}
  variant="subtitle1"
>
  Ingresa tu correo para recibir un enlace de recuperación
</Typography>

<Box
  component="form"
  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
  onSubmit={handleSubmit}
>
  <TextField
    fullWidth
    label="Correo Electrónico"
    sx={textFieldStyles}
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <Button
    sx={{ backgroundColor: '#27a35e', '&:hover': { backgroundColor: '#218c4e' }, py: 1.5 }}
    type="submit"
    variant="contained"
  >
    Enviar Correo
  </Button>
</Box>
 <Box mt={2} textAlign="center" >
  <Link
    style={{ color: '#27a35e', textDecoration: 'none' }}
    to="/login"
  >
    Iniciar sesión
  </Link>
</Box>

        </motion.div>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;