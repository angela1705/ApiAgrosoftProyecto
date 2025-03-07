import React, { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password); 
    } catch (err) {
      setError('Error de autenticación. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        width: '100%',
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#f9fafb',
              transition: 'all 0.3s ease-in-out',
              '& fieldset': { borderColor: '#e2e8f0' },
              '&:hover fieldset': { borderColor: '#cbd5e1' },
              '&.Mui-focused fieldset': { borderColor: '#2ecc71' },
              '&.Mui-focused': {
                backgroundColor: '#fff',
                boxShadow: '0 0 0 4px rgba(46, 204, 113, 0.1)',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#a0aec0',
              '&.Mui-focused': { color: '#2ecc71' },
            },
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <TextField
          type="password"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#f9fafb',
              transition: 'all 0.3s ease-in-out',
              '& fieldset': { borderColor: '#e2e8f0' },
              '&:hover fieldset': { borderColor: '#cbd5e1' },
              '&.Mui-focused fieldset': { borderColor: '#2ecc71' },
              '&.Mui-focused': {
                backgroundColor: '#fff',
                boxShadow: '0 0 0 4px rgba(46, 204, 113, 0.1)',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#a0aec0',
              '&.Mui-focused': { color: '#2ecc71' },
            },
          }}
        />
      </motion.div>
      {error && (
        <Typography
          variant="body2"
          sx={{
            color: '#f56565',
            textAlign: 'center',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </Typography>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          fullWidth
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
        >
          {loading ? 'Cargando...' : 'Ingresar'}
        </Button>
      </motion.div>
    </Box>
  );
};

export default Login;