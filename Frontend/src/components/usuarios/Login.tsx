import React, { useState, FormEvent } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [numeroDeDocumento, setNumeroDeDocumento] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(Number(numeroDeDocumento), password);
    } catch  {
      setError('Error de autenticación. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#fff',
      transition: 'all 0.3s ease-in-out',
      '& fieldset': { borderColor: '#e2e8f0' },
      '&:hover fieldset': { borderColor: '#cbd5e1' },
      '&.Mui-focused fieldset': { borderColor: '#2ecc71' },
      '& .MuiInputAdornment-root': {
        backgroundColor: 'inherit',
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
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}
      onSubmit={handleSubmit}
    >
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TextField
          fullWidth
          label="Número de documento"
          sx={textFieldStyles}
          type="number"
          value={numeroDeDocumento}
          variant="outlined"
          onChange={(e) => setNumeroDeDocumento(e.target.value)}
        />
      </motion.div>
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
<TextField
  fullWidth
  label="Contraseña"
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
  sx={textFieldStyles}
  type={showPassword ? 'text' : 'password'}
  value={password}
  variant="outlined"
  onChange={(e) => setPassword(e.target.value)}
/>
      </motion.div>
      {error && (
        <Typography
          sx={{ color: '#f56565', textAlign: 'center', fontSize: '0.875rem' }}
          variant="body2"
        >
          {error}
        </Typography>
      )}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          fullWidth
          disabled={loading}
          sx={{
            backgroundColor: '#2ecc71',
            color: '#fff',
            borderRadius: '12px',
            py: 1.5,
            fontWeight: 'bold',
            fontSize: '1rem',
            textTransform: 'none',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#27ae60',
              boxShadow: '0 6px 20px rgba(27, 143, 75, 0.4)',
              transform: 'scale(1.02)',
            },
            '&:disabled': {
              backgroundColor: '#cbd5e1',
              color: '#a0aec0',
            },
          }}
          type="submit"
          variant="contained"
        >
          {loading ? 'Cargando...' : 'Ingresar'}
        </Button>
      </motion.div>
    </Box>
  );
};

export default Login;
