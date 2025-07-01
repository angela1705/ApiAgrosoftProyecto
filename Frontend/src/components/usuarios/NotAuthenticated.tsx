import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotAuthenticated: React.FC = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
      p={3}
      textAlign="center"
    >
      <Typography gutterBottom color="textSecondary"variant="h5"  >
        No tienes acceso a esta página. Por favor, inicia sesión.
      </Typography>
      <Button
        color="primary"
        component={Link}
        sx={{ mt: 2 }}
        to="/login"
        variant="contained"
      >
        Iniciar sesión
      </Button>
      <Button
        color="primary"
        component={Link}
        sx={{ mt: 2 }}
        to="/register"
        variant="contained"
      >
        Registar usuario
      </Button>
    </Box>
  );
};

export default NotAuthenticated;