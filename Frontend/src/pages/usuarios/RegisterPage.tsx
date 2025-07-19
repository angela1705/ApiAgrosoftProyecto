import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import AgrosisLogotic from '../../assets/def_AGROSIS_LOGOTIC.png';
import LogoSena from '../../assets/logob.png';
import Register from '../../components/usuarios/Register';
import { useAuth } from '../../context/AuthContext';

const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate replace={true} to="/"  />;
  }

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
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
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

      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1,
        }}
      >
        <img
          alt="AGROSIS Logotic Small"
          src={AgrosisLogotic}
          style={{
            width: '140px',
            height: 'auto',
          }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 22,
          zIndex: 1,
        }}
      >
        <img
          alt="Logo SENA" 
          src={LogoSena}
          style={{
            width:'130px',
            height: 'auto',
          }}
        />
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
            sx={{
              fontWeight: 'bold',
              color: '#1a202c',
              textAlign: 'center',
              mb: 1,
            }}
            variant="h4"
          >
            Registrar
          </Typography>
          <Typography
            sx={{
              color: '#718096',
              textAlign: 'center',
              mb: 3,
            }}
            variant="subtitle1"
          >
            Ingresa tus credenciales para registrarte
          </Typography>
          <Register />
        </motion.div>
      </Box>
    </Box>
  );
};

export default RegisterPage;